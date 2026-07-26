import {
  FieldValue,
  Timestamp,
  type DocumentData,
} from 'firebase-admin/firestore';
import { createHash } from 'node:crypto';

import { getAllPackages } from '@/data/packages';
import { POINTS_RULES, type PointsActionType } from '@/lib/points-rules';
import { isValidReferralCode, normalizeReferralCode } from '@/lib/referrals';

import { adminDb } from './firebase-admin';

type ProfileSeed = {
  uid: string;
  email: string | null;
  displayName: string;
  photoURL: string | null;
};

type ClaimInput = {
  actionType: PointsActionType;
  city?: string;
  evidence?: {
    readSeconds?: number;
    scrollPercent?: number;
    wordDownloaded?: boolean;
  };
};

type MutationResult =
  | { ok: true; points: number; unlockedPackages: string[] }
  | { ok: false; reason: string };

type ReferralResult =
  | { ok: true; inviterPoints: number }
  | { ok: false; reason: string };

const REFERRAL_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
export const NEW_ACCOUNT_REFERRAL_WINDOW_MS = 24 * 60 * 60 * 1000;

const CLAIMABLE_POINTS: Partial<Record<PointsActionType, number>> = {
  browse_free_guide: POINTS_RULES.BROWSE_FREE_GUIDE,
  save_free_guide: POINTS_RULES.SAVE_FREE_GUIDE,
};

function utcDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export function createReferralCode(uid: string): string {
  const digest = createHash('sha256')
    .update(`cchinaroute-referral:${uid}`)
    .digest();

  return Array.from(digest.subarray(0, 12), (byte) => REFERRAL_ALPHABET[byte & 31]).join('');
}

function profileView(uid: string, data: DocumentData) {
  const toMillis = (value: unknown) =>
    value instanceof Timestamp ? value.toMillis() : value ?? null;
  return {
    uid,
    email: data.email ?? null,
    displayName: data.displayName || 'Traveler',
    photoURL: data.photoURL ?? null,
    points: Number(data.points ?? 0),
    unlockedPackages: Array.isArray(data.unlockedPackages) ? data.unlockedPackages : [],
    actionsUsed: data.actionsUsed && typeof data.actionsUsed === 'object' ? data.actionsUsed : {},
    referralCode: data.referralCode ?? null,
    referredBy: data.referredBy ?? null,
    successfulInvites: Number(data.successfulInvites ?? 0),
    lastDailyLoginDate: data.lastDailyLoginDate,
    createdAt: toMillis(data.createdAt),
    updatedAt: toMillis(data.updatedAt),
  };
}

export async function syncPointsProfile(seed: ProfileSeed) {
  const db = adminDb();
  const userRef = db.collection('users').doc(seed.uid);
  const today = utcDate();

  await db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(userRef);
    const snapshotData = snapshot.data() || {};
    const storedReferralCode = normalizeReferralCode(snapshotData.referralCode);
    const referralCode = isValidReferralCode(storedReferralCode)
      ? storedReferralCode
      : createReferralCode(seed.uid);
    const referralRef = db.collection('referralCodes').doc(referralCode);
    const referralSnapshot = await transaction.get(referralRef);
    const now = FieldValue.serverTimestamp();

    if (referralSnapshot.exists && referralSnapshot.data()?.ownerUid !== seed.uid) {
      throw new Error('Referral code collision detected.');
    }
    if (!referralSnapshot.exists) {
      transaction.set(referralRef, {
        code: referralCode,
        ownerUid: seed.uid,
        createdAt: now,
      });
    }

    if (!snapshot.exists) {
      transaction.set(userRef, {
        uid: seed.uid,
        email: seed.email,
        displayName: seed.displayName,
        photoURL: seed.photoURL,
        points: POINTS_RULES.SIGNUP_BONUS + POINTS_RULES.DAILY_LOGIN,
        unlockedPackages: [],
        actionsUsed: { signup_bonus: true },
        referralCode,
        successfulInvites: 0,
        lastDailyLoginDate: today,
        createdAt: now,
        updatedAt: now,
      });
      transaction.set(userRef.collection('ledger').doc('signup_bonus'), {
        actionType: 'signup_bonus',
        pointsChange: POINTS_RULES.SIGNUP_BONUS,
        userId: seed.uid,
        createdAt: now,
        status: 'confirmed',
        note: `Welcome, ${seed.displayName}!`,
      });
      transaction.set(userRef.collection('ledger').doc(`daily_login_${today}`), {
        actionType: 'daily_login',
        pointsChange: POINTS_RULES.DAILY_LOGIN,
        userId: seed.uid,
        createdAt: now,
        status: 'confirmed',
        note: `Daily login bonus - ${today}`,
      });
      return;
    }

    const data = snapshotData;
    const actionsUsed = data.actionsUsed || {};
    const updates: Record<string, unknown> = {
      updatedAt: now,
      referralCode,
    };
    let points = Number(data.points ?? 0);

    if (!actionsUsed.signup_bonus) {
      const hasProgress = points > 0 || (data.unlockedPackages || []).length > 0;
      updates.actionsUsed = { ...actionsUsed, signup_bonus: true };
      if (!hasProgress) {
        points += POINTS_RULES.SIGNUP_BONUS;
        transaction.set(userRef.collection('ledger').doc('signup_bonus'), {
          actionType: 'signup_bonus',
          pointsChange: POINTS_RULES.SIGNUP_BONUS,
          userId: seed.uid,
          createdAt: now,
          status: 'confirmed',
          note: `Welcome, ${seed.displayName}!`,
        });
      }
    }

    if (data.lastDailyLoginDate !== today) {
      points += POINTS_RULES.DAILY_LOGIN;
      updates.lastDailyLoginDate = today;
      transaction.set(userRef.collection('ledger').doc(`daily_login_${today}`), {
        actionType: 'daily_login',
        pointsChange: POINTS_RULES.DAILY_LOGIN,
        userId: seed.uid,
        createdAt: now,
        status: 'confirmed',
        note: `Daily login bonus - ${today}`,
      });
    }

    updates.points = points;
    transaction.update(userRef, updates);
  });

  const current = await userRef.get();
  return profileView(seed.uid, current.data() || {});
}

export async function redeemReferral(
  inviteeUid: string,
  rawCode: string,
  accountCreatedAtMs: number
): Promise<ReferralResult> {
  const referralCode = normalizeReferralCode(rawCode);
  if (!isValidReferralCode(referralCode)) {
    return { ok: false, reason: 'Enter a valid 12-character invite code.' };
  }

  const accountAge = Date.now() - accountCreatedAtMs;
  if (
    !Number.isFinite(accountCreatedAtMs) ||
    accountAge < 0 ||
    accountAge > NEW_ACCOUNT_REFERRAL_WINDOW_MS
  ) {
    return { ok: false, reason: 'Invite codes are only available to newly created accounts.' };
  }

  const db = adminDb();
  const codeRef = db.collection('referralCodes').doc(referralCode);
  const inviteeRef = db.collection('users').doc(inviteeUid);

  return db.runTransaction(async (transaction) => {
    const codeSnapshot = await transaction.get(codeRef);
    if (!codeSnapshot.exists) return { ok: false, reason: 'Invite code not found.' };

    const inviterUid = String(codeSnapshot.data()?.ownerUid || '');
    if (!inviterUid) return { ok: false, reason: 'Invite code is unavailable.' };
    if (inviterUid === inviteeUid) {
      return { ok: false, reason: 'You cannot use your own invite code.' };
    }

    const inviterRef = db.collection('users').doc(inviterUid);
    const [inviteeSnapshot, inviterSnapshot] = await Promise.all([
      transaction.get(inviteeRef),
      transaction.get(inviterRef),
    ]);
    if (!inviteeSnapshot.exists) return { ok: false, reason: 'Your points profile is not ready yet.' };
    if (!inviterSnapshot.exists) return { ok: false, reason: 'Inviter account not found.' };

    const inviteeData = inviteeSnapshot.data() || {};
    if (inviteeData.referredBy || inviteeData.referralCodeUsed) {
      return { ok: false, reason: 'This account has already used an invite code.' };
    }

    const inviterData = inviterSnapshot.data() || {};
    const inviterActions = inviterData.actionsUsed || {};
    const actionKey = `invite_signup:${inviteeUid}`;
    if (inviterActions[actionKey]) {
      return { ok: false, reason: 'This invitation has already been rewarded.' };
    }

    const inviterPoints = Number(inviterData.points ?? 0) + POINTS_RULES.INVITE_SIGNUP;
    const now = FieldValue.serverTimestamp();

    transaction.update(inviteeRef, {
      referredBy: inviterUid,
      referralCodeUsed: referralCode,
      referralRedeemedAt: now,
      updatedAt: now,
    });
    transaction.update(inviterRef, {
      points: inviterPoints,
      successfulInvites: Number(inviterData.successfulInvites ?? 0) + 1,
      actionsUsed: { ...inviterActions, [actionKey]: true },
      updatedAt: now,
    });
    transaction.set(inviterRef.collection('ledger').doc(`invite_signup_${inviteeUid}`), {
      actionType: 'invite_signup',
      pointsChange: POINTS_RULES.INVITE_SIGNUP,
      userId: inviterUid,
      relatedUserId: inviteeUid,
      createdAt: now,
      status: 'confirmed',
      note: 'A friend joined with your invite code.',
    });

    return { ok: true, inviterPoints };
  });
}

export async function claimPoints(uid: string, input: ClaimInput): Promise<MutationResult> {
  const points = CLAIMABLE_POINTS[input.actionType];
  if (!points) return { ok: false, reason: 'This action is not available for direct claims.' };

  const city = input.city?.trim();
  if (!city || !getAllPackages().some((pkg) => pkg.slug === city)) {
    return { ok: false, reason: 'A valid guide is required.' };
  }

  if (
    input.actionType === 'browse_free_guide' &&
    ((input.evidence?.readSeconds ?? 0) < 180 || (input.evidence?.scrollPercent ?? 0) < 60)
  ) {
    return { ok: false, reason: 'Read for at least 3 minutes and scroll through 60% before claiming.' };
  }
  if (input.actionType === 'save_free_guide' && input.evidence?.wordDownloaded !== true) {
    return { ok: false, reason: 'Download the Word version before claiming.' };
  }

  const db = adminDb();
  const userRef = db.collection('users').doc(uid);
  const actionKey = `${input.actionType}:${city}`;
  return db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(userRef);
    if (!snapshot.exists) return { ok: false, reason: 'User profile is not ready yet.' };
    const data = snapshot.data() || {};
    const actionsUsed = data.actionsUsed || {};
    if (actionsUsed[actionKey]) return { ok: false, reason: 'You have already claimed this reward.' };

    const nextPoints = Number(data.points ?? 0) + points;
    transaction.update(userRef, {
      points: nextPoints,
      actionsUsed: { ...actionsUsed, [actionKey]: true },
      updatedAt: FieldValue.serverTimestamp(),
    });
    transaction.set(userRef.collection('ledger').doc(actionKey.replace(':', '_')), {
      actionType: input.actionType,
      pointsChange: points,
      city,
      userId: uid,
      createdAt: FieldValue.serverTimestamp(),
      status: 'confirmed',
      note: input.actionType === 'browse_free_guide' ? `Read ${city} Free Guide` : `Saved ${city} Free Guide`,
    });
    return {
      ok: true,
      points: nextPoints,
      unlockedPackages: Array.isArray(data.unlockedPackages) ? data.unlockedPackages : [],
    };
  });
}

export async function unlockPackage(uid: string, packageId: string): Promise<MutationResult> {
  const pkg = getAllPackages().find((item) => item.id === packageId);
  if (!pkg) return { ok: false, reason: 'Guide not found.' };

  const db = adminDb();
  const userRef = db.collection('users').doc(uid);
  return db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(userRef);
    if (!snapshot.exists) return { ok: false, reason: 'User profile is not ready yet.' };
    const data = snapshot.data() || {};
    const unlockedPackages = Array.isArray(data.unlockedPackages) ? data.unlockedPackages : [];
    if (unlockedPackages.includes(pkg.id)) return { ok: false, reason: 'This package is already unlocked.' };

    const currentPoints = Number(data.points ?? 0);
    const cost = pkg.pointsCost;
    if (currentPoints < cost) {
      return { ok: false, reason: `Not enough points (you have ${currentPoints}, need ${cost}).` };
    }

    const nextPoints = currentPoints - cost;
    const nextUnlocked = [...unlockedPackages, pkg.id];
    transaction.update(userRef, {
      points: nextPoints,
      unlockedPackages: nextUnlocked,
      updatedAt: FieldValue.serverTimestamp(),
    });
    transaction.set(userRef.collection('ledger').doc(`unlock_${pkg.id}`), {
      actionType: 'redeem_full_guide',
      pointsChange: -cost,
      productId: pkg.id,
      userId: uid,
      createdAt: FieldValue.serverTimestamp(),
      status: 'confirmed',
      note: `Unlocked ${pkg.name}`,
    });
    return { ok: true, points: nextPoints, unlockedPackages: nextUnlocked };
  });
}

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  increment,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  runTransaction,
} from 'firebase/firestore';
import { FIRESTORE_DATABASE_ID, auth, db } from './firebase';
import { POINTS_RULES, PointsActionType, PointsLedgerEntry } from './points-rules';

export interface FirestoreUser {
  uid: string;
  email: string | null;
  displayName: string;
  photoURL: string | null;
  points: number;
  unlockedPackages: string[];
  actionsUsed: Record<string, true>;
  lastDailyLoginDate?: string;
  createdAt: any;
  updatedAt: any;
}

type FirestoreValue =
  | { nullValue: null }
  | { stringValue: string }
  | { integerValue: string }
  | { doubleValue: number }
  | { booleanValue: boolean }
  | { arrayValue: { values?: FirestoreValue[] } }
  | { mapValue: { fields?: Record<string, FirestoreValue> } };

type RestDocument = {
  name: string;
  fields?: Record<string, FirestoreValue>;
  createTime?: string;
  updateTime?: string;
};

const SDK_TIMEOUT_MS = 30000;
const REST_ROOT = `https://firestore.googleapis.com/v1/projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/databases/${encodeURIComponent(FIRESTORE_DATABASE_ID)}/documents`;
const SDK_TIMEOUT = Symbol('sdk-timeout');

export async function getUserDoc(uid: string): Promise<FirestoreUser | null> {
  return sdkThenRest(
    async () => {
      const ref = doc(db, 'users', uid);
      const snap = await getDoc(ref);
      return snap.exists() ? (snap.data() as FirestoreUser) : null;
    },
    () => getUserDocRest(uid),
    'getUserDoc'
  );
}

export async function createUserDoc(
  uid: string,
  data: { email: string | null; displayName: string; photoURL?: string | null }
): Promise<FirestoreUser> {
  return sdkThenRest(
    async () => {
      const ref = doc(db, 'users', uid);
      const existing = await getDoc(ref);
      if (existing.exists()) return existing.data() as FirestoreUser;

      const userData = makeNewUser(uid, data);
      await setDoc(ref, {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      await addLedgerEntry(uid, {
        actionType: 'signup_bonus',
        pointsChange: POINTS_RULES.SIGNUP_BONUS,
        note: `Welcome, ${data.displayName}!`,
      });
      return userData;
    },
    () => createUserDocRest(uid, data),
    'createUserDoc'
  );
}

export async function updateUserDoc(uid: string, updates: Partial<FirestoreUser>): Promise<void> {
  return sdkThenRest(
    async () => {
      const ref = doc(db, 'users', uid);
      await updateDoc(ref, { ...updates, updatedAt: serverTimestamp() });
    },
    async () => {
      const existing = await getUserDocRest(uid);
      if (!existing) throw new Error('User profile is not ready yet');
      await patchUserDocRest(uid, { ...existing, ...updates, updatedAt: Date.now() });
    },
    'updateUserDoc'
  );
}

export async function refreshUserPoints(uid: string): Promise<number> {
  const doc = await getUserDoc(uid);
  return doc?.points ?? 0;
}

export async function addPointsToUser(uid: string, delta: number): Promise<void> {
  return sdkThenRest(
    async () => {
      const ref = doc(db, 'users', uid);
      await updateDoc(ref, {
        points: increment(delta),
        updatedAt: serverTimestamp(),
      });
    },
    async () => {
      const user = await getUserDocRest(uid);
      if (!user) throw new Error('User profile is not ready yet');
      await patchUserDocRest(uid, {
        ...user,
        points: (user.points ?? 0) + delta,
        updatedAt: Date.now(),
      });
    },
    'addPointsToUser'
  );
}

export async function unlockPackageForUser(
  uid: string,
  packageId: string,
  cost: number
): Promise<{ ok: true } | { ok: false; reason: string }> {
  return sdkThenRest(
    async () => {
      const ref = doc(db, 'users', uid);
      const ledgerRef = doc(collection(db, 'users', uid, 'ledger'));

      return runTransaction(db, async (transaction) => {
        const snap = await transaction.get(ref);
        if (!snap.exists()) return { ok: false, reason: 'User profile is not ready yet' };

        const data = snap.data() as FirestoreUser;
        if (data.unlockedPackages?.includes(packageId)) {
          return { ok: false, reason: 'This package is already unlocked' };
        }
        if ((data.points ?? 0) < cost) {
          return { ok: false, reason: `Not enough points (you have ${data.points ?? 0}, need ${cost})` };
        }

        transaction.update(ref, {
          points: (data.points ?? 0) - cost,
          unlockedPackages: [...(data.unlockedPackages || []), packageId],
          updatedAt: serverTimestamp(),
        });
        transaction.set(ledgerRef, {
          actionType: 'redeem_full_guide',
          pointsChange: -cost,
          productId: packageId,
          userId: uid,
          createdAt: serverTimestamp(),
          status: 'confirmed',
          note: `Unlocked ${packageId}`,
        });

        return { ok: true };
      });
    },
    () => unlockPackageForUserRest(uid, packageId, cost),
    'unlockPackageForUser'
  );
}

export async function recordActionUsed(uid: string, key: string): Promise<void> {
  const user = await getUserDoc(uid);
  if (!user) return;
  await updateUserDoc(uid, {
    actionsUsed: { ...(user.actionsUsed || {}), [key]: true as const },
  });
}

export async function claimPointsForAction(
  uid: string,
  entry: {
    actionType: PointsActionType;
    pointsChange: number;
    city?: string;
    productId?: string;
    note?: string;
    actionKey?: string;
    dailyLoginDate?: string;
  }
): Promise<{ ok: true } | { ok: false; reason: string }> {
  return sdkThenRest(
    async () => {
      const userRef = doc(db, 'users', uid);
      const ledgerRef = doc(collection(db, 'users', uid, 'ledger'));

      return runTransaction(db, async (transaction) => {
        const snap = await transaction.get(userRef);
        if (!snap.exists()) return { ok: false, reason: 'User profile is not ready yet' };

        const data = snap.data() as FirestoreUser;
        const actionsUsed = data.actionsUsed || {};

        if (entry.actionKey && actionsUsed[entry.actionKey]) {
          return { ok: false, reason: 'You have already claimed this reward.' };
        }
        if (entry.dailyLoginDate && data.lastDailyLoginDate === entry.dailyLoginDate) {
          return { ok: false, reason: 'Daily login bonus already claimed today.' };
        }

        const updates: Partial<FirestoreUser> & { points: number; updatedAt: any } = {
          points: (data.points ?? 0) + entry.pointsChange,
          updatedAt: serverTimestamp(),
        };

        if (entry.actionKey) {
          updates.actionsUsed = { ...actionsUsed, [entry.actionKey]: true };
        }
        if (entry.dailyLoginDate) {
          updates.lastDailyLoginDate = entry.dailyLoginDate;
        }

        transaction.update(userRef, updates);
        transaction.set(ledgerRef, compact({
          actionType: entry.actionType,
          pointsChange: entry.pointsChange,
          city: entry.city,
          productId: entry.productId,
          userId: uid,
          createdAt: serverTimestamp(),
          status: 'confirmed',
          note: entry.note,
        }));

        return { ok: true };
      });
    },
    () => claimPointsForActionRest(uid, entry),
    'claimPointsForAction'
  );
}

export async function ensureWelcomeBonusForUser(
  uid: string,
  displayName: string
): Promise<{ ok: true; granted: boolean } | { ok: false; reason: string }> {
  return sdkThenRest(
    async () => {
      const userRef = doc(db, 'users', uid);
      const ledgerRef = doc(collection(db, 'users', uid, 'ledger'));

      return runTransaction(db, async (transaction) => {
        const snap = await transaction.get(userRef);
        if (!snap.exists()) return { ok: false, reason: 'User profile is not ready yet' };

        const data = snap.data() as FirestoreUser;
        const actionsUsed = data.actionsUsed || {};
        const alreadyMarked = actionsUsed.signup_bonus;
        const hasProgress = (data.points ?? 0) > 0 || (data.unlockedPackages || []).length > 0;

        if (alreadyMarked || hasProgress) {
          if (!alreadyMarked) {
            transaction.update(userRef, {
              actionsUsed: { ...actionsUsed, signup_bonus: true },
              updatedAt: serverTimestamp(),
            });
          }
          return { ok: true, granted: false };
        }

        transaction.update(userRef, {
          points: POINTS_RULES.SIGNUP_BONUS,
          actionsUsed: { ...actionsUsed, signup_bonus: true },
          updatedAt: serverTimestamp(),
        });
        transaction.set(ledgerRef, {
          actionType: 'signup_bonus',
          pointsChange: POINTS_RULES.SIGNUP_BONUS,
          userId: uid,
          createdAt: serverTimestamp(),
          status: 'confirmed',
          note: `Welcome, ${displayName}!`,
        });

        return { ok: true, granted: true };
      });
    },
    () => ensureWelcomeBonusForUserRest(uid, displayName),
    'ensureWelcomeBonusForUser'
  );
}

export async function addLedgerEntry(
  uid: string,
  entry: { actionType: PointsActionType; pointsChange: number; city?: string; productId?: string; note?: string }
): Promise<void> {
  return sdkThenRest(
    async () => {
      const ref = collection(db, 'users', uid, 'ledger');
      await addDoc(ref, compact({
        actionType: entry.actionType,
        pointsChange: entry.pointsChange,
        city: entry.city,
        productId: entry.productId,
        note: entry.note,
        userId: uid,
        createdAt: serverTimestamp(),
        status: 'confirmed',
      }));
    },
    () => addLedgerEntryRest(uid, entry),
    'addLedgerEntry'
  );
}

export async function getLedger(uid: string, max = 50): Promise<PointsLedgerEntry[]> {
  return sdkThenRest(
    async () => {
      const ref = collection(db, 'users', uid, 'ledger');
      const q = query(ref, orderBy('createdAt', 'desc'), limit(max));
      const snap = await getDocs(q);
      return snap.docs.map((d) => {
        const data = d.data() as any;
        return {
          id: d.id,
          ...data,
          createdAt: data.createdAt?.toMillis?.() ?? Date.now(),
        } as PointsLedgerEntry;
      });
    },
    () => getLedgerRest(uid, max),
    'getLedger'
  );
}

async function sdkThenRest<T>(sdkFn: () => Promise<T>, restFn: () => Promise<T>, label: string): Promise<T> {
  try {
    const result = await withTimeout(sdkFn(), SDK_TIMEOUT_MS);
    if (result !== SDK_TIMEOUT) return result;
    console.warn(`[Firestore] SDK ${label} timed out; falling back to REST.`);
  } catch (err) {
    console.warn(`[Firestore] SDK ${label} failed; falling back to REST.`, err);
  }
  return restFn();
}

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | typeof SDK_TIMEOUT> {
  return Promise.race([
    promise,
    new Promise<typeof SDK_TIMEOUT>((resolve) => setTimeout(() => resolve(SDK_TIMEOUT), ms)),
  ]);
}

function makeNewUser(
  uid: string,
  data: { email: string | null; displayName: string; photoURL?: string | null }
): FirestoreUser {
  const now = Date.now();
  return {
    uid,
    email: data.email,
    displayName: data.displayName,
    photoURL: data.photoURL ?? null,
    points: POINTS_RULES.SIGNUP_BONUS,
    unlockedPackages: [],
    actionsUsed: { signup_bonus: true },
    createdAt: now,
    updatedAt: now,
  };
}

async function getUserDocRest(uid: string): Promise<FirestoreUser | null> {
  const doc = await restFetch<RestDocument>(`users/${encodeURIComponent(uid)}`, { method: 'GET' }, true);
  return doc ? restDocToUser(doc) : null;
}

async function createUserDocRest(
  uid: string,
  data: { email: string | null; displayName: string; photoURL?: string | null }
): Promise<FirestoreUser> {
  const existing = await getUserDocRest(uid);
  if (existing) return existing;

  const userData = makeNewUser(uid, data);
  await patchUserDocRest(uid, userData);
  await addLedgerEntryRest(uid, {
    actionType: 'signup_bonus',
    pointsChange: POINTS_RULES.SIGNUP_BONUS,
    note: `Welcome, ${data.displayName}!`,
  });
  return userData;
}

async function patchUserDocRest(uid: string, user: FirestoreUser): Promise<void> {
  await restFetch(`users/${encodeURIComponent(uid)}`, {
    method: 'PATCH',
    body: JSON.stringify({ fields: toFirestoreFields(user) }),
  });
}

async function claimPointsForActionRest(
  uid: string,
  entry: {
    actionType: PointsActionType;
    pointsChange: number;
    city?: string;
    productId?: string;
    note?: string;
    actionKey?: string;
    dailyLoginDate?: string;
  }
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const user = await getUserDocRest(uid);
  if (!user) return { ok: false, reason: 'User profile is not ready yet' };

  const actionsUsed = user.actionsUsed || {};
  if (entry.actionKey && actionsUsed[entry.actionKey]) {
    return { ok: false, reason: 'You have already claimed this reward.' };
  }
  if (entry.dailyLoginDate && user.lastDailyLoginDate === entry.dailyLoginDate) {
    return { ok: false, reason: 'Daily login bonus already claimed today.' };
  }

  const nextUser: FirestoreUser = {
    ...user,
    points: (user.points ?? 0) + entry.pointsChange,
    actionsUsed: entry.actionKey ? { ...actionsUsed, [entry.actionKey]: true } : actionsUsed,
    lastDailyLoginDate: entry.dailyLoginDate ?? user.lastDailyLoginDate,
    updatedAt: Date.now(),
  };
  await patchUserDocRest(uid, nextUser);
  await addLedgerEntryRest(uid, {
    actionType: entry.actionType,
    pointsChange: entry.pointsChange,
    city: entry.city,
    productId: entry.productId,
    note: entry.note,
  });
  return { ok: true };
}

async function unlockPackageForUserRest(
  uid: string,
  packageId: string,
  cost: number
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const user = await getUserDocRest(uid);
  if (!user) return { ok: false, reason: 'User profile is not ready yet' };
  if (user.unlockedPackages?.includes(packageId)) {
    return { ok: false, reason: 'This package is already unlocked' };
  }
  if ((user.points ?? 0) < cost) {
    return { ok: false, reason: `Not enough points (you have ${user.points ?? 0}, need ${cost})` };
  }

  await patchUserDocRest(uid, {
    ...user,
    points: (user.points ?? 0) - cost,
    unlockedPackages: [...(user.unlockedPackages || []), packageId],
    updatedAt: Date.now(),
  });
  await addLedgerEntryRest(uid, {
    actionType: 'redeem_full_guide',
    pointsChange: -cost,
    productId: packageId,
    note: `Unlocked ${packageId}`,
  });
  return { ok: true };
}

async function ensureWelcomeBonusForUserRest(
  uid: string,
  displayName: string
): Promise<{ ok: true; granted: boolean } | { ok: false; reason: string }> {
  const user = await getUserDocRest(uid);
  if (!user) return { ok: false, reason: 'User profile is not ready yet' };

  const actionsUsed = user.actionsUsed || {};
  const alreadyMarked = actionsUsed.signup_bonus;
  const hasProgress = (user.points ?? 0) > 0 || (user.unlockedPackages || []).length > 0;

  if (alreadyMarked || hasProgress) {
    if (!alreadyMarked) {
      await patchUserDocRest(uid, {
        ...user,
        actionsUsed: { ...actionsUsed, signup_bonus: true },
        updatedAt: Date.now(),
      });
    }
    return { ok: true, granted: false };
  }

  await patchUserDocRest(uid, {
    ...user,
    points: POINTS_RULES.SIGNUP_BONUS,
    actionsUsed: { ...actionsUsed, signup_bonus: true },
    updatedAt: Date.now(),
  });
  await addLedgerEntryRest(uid, {
    actionType: 'signup_bonus',
    pointsChange: POINTS_RULES.SIGNUP_BONUS,
    note: `Welcome, ${displayName}!`,
  });
  return { ok: true, granted: true };
}

async function addLedgerEntryRest(
  uid: string,
  entry: { actionType: PointsActionType; pointsChange: number; city?: string; productId?: string; note?: string }
): Promise<void> {
  await restFetch(`users/${encodeURIComponent(uid)}/ledger`, {
    method: 'POST',
    body: JSON.stringify({
      fields: toFirestoreFields(compact({
        actionType: entry.actionType,
        pointsChange: entry.pointsChange,
        city: entry.city,
        productId: entry.productId,
        note: entry.note,
        userId: uid,
        createdAt: Date.now(),
        status: 'confirmed',
      })),
    }),
  });
}

async function getLedgerRest(uid: string, max = 50): Promise<PointsLedgerEntry[]> {
  const qs = new URLSearchParams({
    pageSize: String(max),
    orderBy: 'createdAt desc',
  });
  const res = await restFetch<{ documents?: RestDocument[] }>(
    `users/${encodeURIComponent(uid)}/ledger?${qs.toString()}`,
    { method: 'GET' },
    true
  );
  return (res?.documents || []).map((doc) => ({
    id: doc.name.split('/').pop() || doc.name,
    ...(fromFirestoreFields(doc.fields || {}) as Omit<PointsLedgerEntry, 'id'>),
  })) as PointsLedgerEntry[];
}

async function restFetch<T>(
  path: string,
  init: RequestInit,
  allow404 = false
): Promise<T | null> {
  const token = await auth.currentUser?.getIdToken();
  if (!token) throw new Error('Firebase auth token is not available.');

  const response = await fetch(`${REST_ROOT}/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });

  if (allow404 && response.status === 404) return null;
  if (!response.ok) {
    const text = await response.text();
    if (response.status === 403 && text.includes('Cloud Firestore API has not been used')) {
      throw new Error(
        'Cloud Firestore API is disabled for project cchinaroute. Enable it in Google Cloud Console, then create or open the Firestore database in Firebase Console.'
      );
    }
    if (response.status === 403 && text.includes('PERMISSION_DENIED')) {
      throw new Error(
        'Firestore rules denied access. In Firebase Console > Firestore > Rules, allow signed-in users to read and write their own users/{uid} document and ledger subcollection.'
      );
    }
    throw new Error(`Firestore REST ${response.status}: ${text.slice(0, 240)}`);
  }
  return (await response.json()) as T;
}

function restDocToUser(doc: RestDocument): FirestoreUser {
  const data = fromFirestoreFields(doc.fields || {}) as Partial<FirestoreUser>;
  return {
    uid: data.uid || '',
    email: data.email ?? null,
    displayName: data.displayName || 'Traveler',
    photoURL: data.photoURL ?? null,
    points: data.points ?? 0,
    unlockedPackages: data.unlockedPackages ?? [],
    actionsUsed: data.actionsUsed ?? {},
    lastDailyLoginDate: data.lastDailyLoginDate,
    createdAt: data.createdAt ?? doc.createTime ?? null,
    updatedAt: data.updatedAt ?? doc.updateTime ?? null,
  };
}

function toFirestoreFields(value: object): Record<string, FirestoreValue> {
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .filter(([, fieldValue]) => fieldValue !== undefined)
      .map(([key, fieldValue]) => [key, toFirestoreValue(fieldValue)])
  );
}

function toFirestoreValue(value: unknown): FirestoreValue {
  if (value === null) return { nullValue: null };
  if (typeof value === 'string') return { stringValue: value };
  if (typeof value === 'number') {
    return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
  }
  if (typeof value === 'boolean') return { booleanValue: value };
  if (Array.isArray(value)) {
    return { arrayValue: { values: value.map(toFirestoreValue) } };
  }
  if (typeof value === 'object') {
    return { mapValue: { fields: toFirestoreFields(value as Record<string, unknown>) } };
  }
  return { nullValue: null };
}

function fromFirestoreFields(fields: Record<string, FirestoreValue>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, fromFirestoreValue(value)])
  );
}

function fromFirestoreValue(value: FirestoreValue): any {
  if ('nullValue' in value) return null;
  if ('stringValue' in value) return value.stringValue;
  if ('integerValue' in value) return Number(value.integerValue);
  if ('doubleValue' in value) return value.doubleValue;
  if ('booleanValue' in value) return value.booleanValue;
  if ('arrayValue' in value) return (value.arrayValue.values || []).map(fromFirestoreValue);
  if ('mapValue' in value) return fromFirestoreFields(value.mapValue.fields || {});
  return null;
}

function compact<T extends Record<string, unknown>>(value: T): T {
  return Object.fromEntries(
    Object.entries(value).filter(([, fieldValue]) => fieldValue !== undefined)
  ) as T;
}

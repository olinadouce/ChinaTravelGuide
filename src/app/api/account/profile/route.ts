import { FieldValue } from 'firebase-admin/firestore';
import { NextRequest, NextResponse } from 'next/server';

import { deleteForumImage, uploadForumImage } from '@/lib/server/forum-image-storage';
import { ForumInputError } from '@/lib/server/forum-service';
import { adminAuth, adminDb, verifyRequestUser } from '@/lib/server/firebase-admin';
import { pointsProfileView, syncPointsProfile } from '@/lib/server/points-service';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function cleanDisplayName(value: unknown) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 40);
}

export async function POST(request: NextRequest) {
  let newAvatarPathname: string | null = null;
  let profileSaved = false;
  try {
    const identity = await verifyRequestUser(request.headers.get('authorization'));
    if (!identity) {
      return NextResponse.json({ error: 'Valid sign-in is required.' }, { status: 401 });
    }

    const form = await request.formData();
    const displayName = cleanDisplayName(form.get('displayName'));
    if (displayName.length < 2) {
      return NextResponse.json(
        { error: 'Display name must contain at least 2 characters.' },
        { status: 400 }
      );
    }

    // A newly-created Firebase account can reach this endpoint before the
    // background account sync finishes. Seed the points profile first so the
    // nickname/avatar update never races a missing user document.
    await syncPointsProfile({
      uid: identity.uid,
      email: identity.email ?? null,
      displayName,
      photoURL: identity.picture ?? null,
    });

    const db = adminDb();
    const userRef = db.collection('users').doc(identity.uid);
    const previousSnapshot = await userRef.get();
    const previousData = previousSnapshot.data() || {};

    const avatar = form.get('avatar');
    const uploaded = avatar instanceof File && avatar.size > 0
      ? await uploadForumImage(identity.uid, avatar)
      : null;
    if (uploaded) newAvatarPathname = uploaded.pathname;

    const photoURL = uploaded?.proxyUrl
      || (typeof previousData.photoURL === 'string' ? previousData.photoURL : null)
      || identity.picture
      || null;
    await userRef.update({
      displayName,
      photoURL,
      ...(uploaded ? { avatarPathname: uploaded.pathname } : {}),
      updatedAt: FieldValue.serverTimestamp(),
    });
    profileSaved = true;

    // Firebase Auth keeps the nickname available in future ID tokens. Forum
    // posts still read Firestore as the authoritative profile source.
    await adminAuth().updateUser(identity.uid, { displayName }).catch((error) => {
      console.error('[Profile] Firebase Auth display-name update failed:', error);
    });

    const currentSnapshot = await userRef.get();
    return NextResponse.json(
      { profile: pointsProfileView(identity.uid, currentSnapshot.data() || {}) },
      {
        headers: {
          'Cache-Control': 'private, no-store',
          'X-Content-Type-Options': 'nosniff',
          Vary: 'Authorization',
        },
      }
    );
  } catch (error) {
    if (newAvatarPathname && !profileSaved) {
      await deleteForumImage(newAvatarPathname).catch((cleanupError) => {
        console.error('[Profile] Failed to clean up uploaded avatar:', cleanupError);
      });
    }
    if (error instanceof ForumInputError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error('[Profile] Profile update failed:', error);
    return NextResponse.json({ error: 'Your profile could not be updated.' }, { status: 503 });
  }
}

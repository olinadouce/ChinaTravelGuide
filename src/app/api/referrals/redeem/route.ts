import { NextRequest, NextResponse } from 'next/server';

import { adminAuth, verifyRequestUser } from '@/lib/server/firebase-admin';
import { redeemReferral, syncPointsProfile } from '@/lib/server/points-service';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const identity = await verifyRequestUser(request.headers.get('authorization'));
    if (!identity) {
      return NextResponse.json({ error: 'Valid sign-in is required.' }, { status: 401 });
    }

    const body = (await request.json().catch(() => null)) as { referralCode?: string } | null;
    if (!body?.referralCode) {
      return NextResponse.json({ error: 'Invite code is required.' }, { status: 400 });
    }

    const authUser = await adminAuth().getUser(identity.uid);
    const accountCreatedAtMs = Date.parse(authUser.metadata.creationTime);

    await syncPointsProfile({
      uid: identity.uid,
      email: identity.email ?? null,
      displayName: identity.name || identity.email?.split('@')[0] || 'Traveler',
      photoURL: identity.picture ?? null,
    });

    const result = await redeemReferral(identity.uid, body.referralCode, accountCreatedAtMs);
    if (!result.ok) {
      return NextResponse.json({ error: result.reason }, { status: 409 });
    }

    return NextResponse.json(result, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('[Points] Referral redemption failed:', error);
    return NextResponse.json(
      { error: 'Invite code redemption is temporarily unavailable.' },
      { status: 503 }
    );
  }
}

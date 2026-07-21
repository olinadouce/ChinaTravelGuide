import { NextRequest, NextResponse } from 'next/server';

import { verifyRequestUser } from '@/lib/server/firebase-admin';
import { syncPointsProfile } from '@/lib/server/points-service';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const identity = await verifyRequestUser(request.headers.get('authorization'));
    if (!identity) return NextResponse.json({ error: 'Valid sign-in is required.' }, { status: 401 });

    const profile = await syncPointsProfile({
      uid: identity.uid,
      email: identity.email ?? null,
      displayName: identity.name || identity.email?.split('@')[0] || 'Traveler',
      photoURL: identity.picture ?? null,
    });
    return NextResponse.json({ profile }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('[Points] Profile sync failed:', error);
    return NextResponse.json({ error: 'Points service is not configured or temporarily unavailable.' }, { status: 503 });
  }
}

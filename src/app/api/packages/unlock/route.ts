import { NextRequest, NextResponse } from 'next/server';

import { verifyRequestUser } from '@/lib/server/firebase-admin';
import { unlockPackage } from '@/lib/server/points-service';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const identity = await verifyRequestUser(request.headers.get('authorization'));
    if (!identity) return NextResponse.json({ error: 'Valid sign-in is required.' }, { status: 401 });
    const body = (await request.json()) as { packageId?: string };
    if (!body.packageId) return NextResponse.json({ error: 'Package ID is required.' }, { status: 400 });

    const result = await unlockPackage(identity.uid, body.packageId);
    if (!result.ok) return NextResponse.json({ error: result.reason }, { status: 409 });
    return NextResponse.json(result, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('[Points] Unlock failed:', error);
    return NextResponse.json({ error: 'Guide unlock is temporarily unavailable.' }, { status: 503 });
  }
}

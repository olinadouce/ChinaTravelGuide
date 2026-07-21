import { NextRequest, NextResponse } from 'next/server';

import type { PointsActionType } from '@/lib/points-rules';
import { verifyRequestUser } from '@/lib/server/firebase-admin';
import { claimPoints } from '@/lib/server/points-service';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const identity = await verifyRequestUser(request.headers.get('authorization'));
    if (!identity) return NextResponse.json({ error: 'Valid sign-in is required.' }, { status: 401 });
    const body = (await request.json()) as {
      actionType?: PointsActionType;
      city?: string;
      evidence?: { readSeconds?: number; scrollPercent?: number; wordDownloaded?: boolean };
    };
    if (!body.actionType) return NextResponse.json({ error: 'Action type is required.' }, { status: 400 });

    const result = await claimPoints(identity.uid, {
      actionType: body.actionType,
      city: body.city,
      evidence: body.evidence,
    });
    if (!result.ok) return NextResponse.json({ error: result.reason }, { status: 409 });
    return NextResponse.json(result, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('[Points] Claim failed:', error);
    return NextResponse.json({ error: 'Points claim is temporarily unavailable.' }, { status: 503 });
  }
}

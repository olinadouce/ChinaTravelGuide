import { NextRequest, NextResponse } from 'next/server';

import { verifyRequestUser } from '@/lib/server/firebase-admin';
import { listMyForumActivity } from '@/lib/server/forum-service';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const identity = await verifyRequestUser(request.headers.get('authorization'));
    if (!identity) return NextResponse.json({ error: 'Valid sign-in is required.' }, { status: 401 });
    const activity = await listMyForumActivity(identity.uid);
    return NextResponse.json(activity, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('[Forum] Failed to load member activity:', error);
    return NextResponse.json({ error: 'Your forum activity is temporarily unavailable.' }, { status: 503 });
  }
}

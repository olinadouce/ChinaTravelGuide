import { NextRequest, NextResponse } from 'next/server';

import { verifyRequestUser } from '@/lib/server/firebase-admin';
import { markForumNotificationsRead } from '@/lib/server/forum-service';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const identity = await verifyRequestUser(request.headers.get('authorization'));
    if (!identity) return NextResponse.json({ error: 'Valid sign-in is required.' }, { status: 401 });
    const marked = await markForumNotificationsRead(identity.uid);
    return NextResponse.json({ ok: true, marked }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('[Forum] Failed to mark notifications read:', error);
    return NextResponse.json({ error: 'Notifications could not be updated.' }, { status: 503 });
  }
}

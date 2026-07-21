import { NextRequest, NextResponse } from 'next/server';

import { verifyRequestUser } from '@/lib/server/firebase-admin';
import { ForumInputError, getForumLikeState, toggleForumLike } from '@/lib/server/forum-service';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const identity = await verifyRequestUser(request.headers.get('authorization'));
  if (!identity) return NextResponse.json({ error: 'Valid sign-in is required.' }, { status: 401 });
  const liked = await getForumLikeState(identity.uid, params.slug);
  return NextResponse.json({ liked }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const identity = await verifyRequestUser(request.headers.get('authorization'));
    if (!identity) return NextResponse.json({ error: 'Valid sign-in is required.' }, { status: 401 });
    const result = await toggleForumLike(identity, params.slug);
    return NextResponse.json(result, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    if (error instanceof ForumInputError) return NextResponse.json({ error: error.message }, { status: error.status });
    console.error('[Forum] Failed to toggle like:', error);
    return NextResponse.json({ error: 'Like could not be updated.' }, { status: 503 });
  }
}

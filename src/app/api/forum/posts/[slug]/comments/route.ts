import { NextRequest, NextResponse } from 'next/server';

import { verifyRequestUser } from '@/lib/server/firebase-admin';
import { createForumComment, ForumInputError } from '@/lib/server/forum-service';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const identity = await verifyRequestUser(request.headers.get('authorization'));
    if (!identity) return NextResponse.json({ error: 'Valid sign-in is required.' }, { status: 401 });
    const body = await request.json();
    const comment = await createForumComment(identity, slug, body);
    return NextResponse.json({ comment }, { status: 201, headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    if (error instanceof ForumInputError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error('[Forum] Failed to create comment:', error);
    return NextResponse.json({ error: 'Your comment could not be published.' }, { status: 503 });
  }
}

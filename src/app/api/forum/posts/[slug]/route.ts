import { NextRequest, NextResponse } from 'next/server';

import { verifyRequestUser } from '@/lib/server/firebase-admin';
import { deleteForumPost, ForumInputError, getForumThread } from '@/lib/server/forum-service';
import { deleteForumImage } from '@/lib/server/forum-image-storage';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const thread = await getForumThread(slug);
    if (!thread) return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
    return NextResponse.json(thread, { headers: { 'Cache-Control': 'public, max-age=10, stale-while-revalidate=30' } });
  } catch (error) {
    console.error('[Forum] Failed to load thread:', error);
    return NextResponse.json({ error: 'This discussion is temporarily unavailable.' }, { status: 503 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const identity = await verifyRequestUser(request.headers.get('authorization'));
    if (!identity) return NextResponse.json({ error: 'Valid sign-in is required.' }, { status: 401 });
    const result = await deleteForumPost(identity.uid, slug);
    if (result.featuredImage) {
      const encodedPath = result.featuredImage.replace('/api/forum/images/', '');
      const pathname = encodedPath.split('/').map(decodeURIComponent).join('/');
      await deleteForumImage(pathname).catch((error) => console.error('[Forum] Failed to delete post image:', error));
    }
    return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    if (error instanceof ForumInputError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error('[Forum] Failed to delete post:', error);
    return NextResponse.json({ error: 'The post could not be deleted.' }, { status: 503 });
  }
}

import { NextRequest, NextResponse } from 'next/server';

import { verifyRequestUser } from '@/lib/server/firebase-admin';
import { createForumPost, ForumInputError, listForumPosts } from '@/lib/server/forum-service';
import { deleteForumImage, uploadForumImage } from '@/lib/server/forum-image-storage';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const posts = await listForumPosts();
    return NextResponse.json({ posts }, { headers: { 'Cache-Control': 'public, max-age=15, stale-while-revalidate=60' } });
  } catch (error) {
    console.error('[Forum] Failed to list posts:', error);
    return NextResponse.json({ error: 'Forum posts are temporarily unavailable.' }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  let uploadedPathname: string | null = null;
  try {
    const identity = await verifyRequestUser(request.headers.get('authorization'));
    if (!identity) return NextResponse.json({ error: 'Valid sign-in is required.' }, { status: 401 });
    const contentType = request.headers.get('content-type') || '';
    let body: Record<string, unknown>;
    if (contentType.includes('multipart/form-data')) {
      const form = await request.formData();
      const tagsValue = form.get('tags');
      body = {
        title: form.get('title'),
        content: form.get('content'),
        tags: typeof tagsValue === 'string' ? JSON.parse(tagsValue) : [],
      };
      const image = form.get('image');
      if (image instanceof File && image.size > 0) {
        const uploaded = await uploadForumImage(identity.uid, image);
        uploadedPathname = uploaded.pathname;
        body.featuredImage = uploaded.proxyUrl;
      }
    } else {
      body = await request.json();
    }
    const post = await createForumPost(identity, body);
    return NextResponse.json({ post }, { status: 201, headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    if (uploadedPathname) {
      await deleteForumImage(uploadedPathname).catch((cleanupError) =>
        console.error('[Forum] Failed to clean up orphan image:', cleanupError)
      );
    }
    if (error instanceof ForumInputError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error('[Forum] Failed to create post:', error);
    return NextResponse.json({ error: 'Your post could not be published.' }, { status: 503 });
  }
}

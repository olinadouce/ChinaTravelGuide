import { NextRequest, NextResponse } from 'next/server';

import { verifyRequestUser } from '@/lib/server/firebase-admin';
import { createForumImageUploadUrl } from '@/lib/server/forum-image-storage';
import { ForumInputError } from '@/lib/server/forum-service';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const identity = await verifyRequestUser(request.headers.get('authorization'));
    if (!identity) {
      return NextResponse.json({ error: 'Valid sign-in is required.' }, { status: 401 });
    }
    const body = await request.json();
    const upload = await createForumImageUploadUrl(identity.uid, {
      contentType: typeof body.contentType === 'string' ? body.contentType : '',
      size: Number(body.size),
    });
    return NextResponse.json(upload, {
      headers: { 'Cache-Control': 'private, no-store', Vary: 'Authorization' },
    });
  } catch (error) {
    if (error instanceof ForumInputError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error('[Forum] Failed to create an image upload URL:', error);
    return NextResponse.json({ error: 'Image upload is temporarily unavailable.' }, { status: 503 });
  }
}

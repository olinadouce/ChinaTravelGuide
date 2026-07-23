import { NextResponse } from 'next/server';

import { readForumImage } from '@/lib/server/forum-image-storage';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  try {
    const { path } = await params;
    const pathname = path.join('/');
    const result = await readForumImage(pathname);
    if (!result || result.statusCode !== 200) {
      return NextResponse.json({ error: 'Image not found.' }, { status: 404 });
    }
    return new NextResponse(result.stream, {
      headers: {
        'Content-Type': result.blob.contentType,
        'Content-Length': String(result.blob.size),
        'Cache-Control': 'public, max-age=31536000, immutable',
        ETag: result.blob.etag,
        'X-Content-Type-Options': 'nosniff',
        'Content-Security-Policy': "default-src 'none'; sandbox",
      },
    });
  } catch (error) {
    console.error('[Forum] Failed to read image:', error);
    return NextResponse.json({ error: 'Image is temporarily unavailable.' }, { status: 503 });
  }
}

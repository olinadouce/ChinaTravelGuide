import { NextResponse } from 'next/server';

import { readForumImage } from '@/lib/server/forum-image-storage';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  try {
    const { path } = await params;
    // Normalise the path: Next.js may pass already-decoded segments, but
    // re-joining with a single forward slash avoids accidental double slashes
    // if an upstream URL had encoded slashes.
    const pathname = path
      .map((segment) => segment.replace(/^\/+|\/+$/g, ''))
      .filter(Boolean)
      .join('/');
    const result = await readForumImage(pathname);
    if (!result || result.statusCode !== 200) {
      return NextResponse.json({ error: 'Image not found.' }, { status: 404 });
    }
    return new NextResponse(result.stream, {
      headers: {
        'Content-Type': result.blob.contentType,
        'Content-Length': String(result.blob.size),
        // Private + 1 day is the right balance: the URL contains an unguessable
        // user/UUID pair, so the CDN should not share it across visitors, but
        // returning visitors still avoid re-fetching the same blob. Crucially,
        // we drop `immutable` so transient errors can be refreshed.
        'Cache-Control': 'private, max-age=86400, must-revalidate',
        ETag: result.blob.etag,
        'X-Content-Type-Options': 'nosniff',
        Vary: 'Authorization',
      },
    });
  } catch (error) {
    console.error('[Forum] Failed to read image:', error);
    return NextResponse.json({ error: 'Image is temporarily unavailable.' }, { status: 503 });
  }
}

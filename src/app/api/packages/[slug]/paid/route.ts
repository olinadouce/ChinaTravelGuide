import { get } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

import { getPackageBySlug } from '@/data/packages';
import { verifyPaidGuideUser } from '@/lib/server/firebase-access';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const PAID_GUIDES_STORE_ID = 'store_Qu89PDZ4WlNNieex';
const LARGE_GUIDE_BYTES = 4_000_000;

function acceptsGzip(request: NextRequest) {
  return request.headers
    .get('accept-encoding')
    ?.split(',')
    .some((encoding) => encoding.trim().startsWith('gzip'));
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) {
    return NextResponse.json({ error: 'Guide not found.' }, { status: 404 });
  }

  const user = await verifyPaidGuideUser(request.headers.get('authorization'));
  if (!user) {
    return NextResponse.json({ error: 'Valid sign-in is required.' }, { status: 401 });
  }

  if (!user.unlockedPackages.includes(pkg.id)) {
    return NextResponse.json({ error: 'This guide has not been unlocked.' }, { status: 403 });
  }

  try {
    const oidcToken = process.env.VERCEL_OIDC_TOKEN;
    const readWriteToken = process.env.BLOB_READ_WRITE_TOKEN;
    if (!oidcToken && !readWriteToken) {
      return NextResponse.json(
        { error: 'Private guide storage is not configured.' },
        { status: 503 }
      );
    }

    const result = await get(
      `paid-guides/${pkg.slug}.html`,
      oidcToken && process.env.VERCEL
          ? {
              access: 'private',
              oidcToken,
              storeId: PAID_GUIDES_STORE_ID,
              useCache: false,
            }
          : {
              access: 'private',
              token: readWriteToken,
              useCache: false,
            }
    );

    if (!result || result.statusCode !== 200) {
      return NextResponse.json({ error: 'Paid guide content is unavailable.' }, { status: 404 });
    }

    // Some guides contain embedded images and can exceed Vercel's 4.5 MB
    // function response limit. Compress only large responses and keep the
    // Blob stream intact so the complete private guide is never buffered.
    const useGzip =
      result.blob.size >= LARGE_GUIDE_BYTES && acceptsGzip(request);
    const responseStream = useGzip
      ? result.stream.pipeThrough(
          // Node's CompressionStream accepts Uint8Array at runtime, while its
          // DOM declaration uses the wider BufferSource input type.
          new CompressionStream('gzip') as unknown as TransformStream<
            Uint8Array,
            Uint8Array
          >
        )
      : result.stream;

    return new NextResponse(responseStream, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `inline; filename="${pkg.slug}.html"`,
        'Cache-Control': 'private, no-store',
        ...(useGzip ? { 'Content-Encoding': 'gzip' } : {}),
        'X-Content-Type-Options': 'nosniff',
        Vary: 'Authorization, Accept-Encoding',
      },
    });
  } catch (error) {
    console.error('[PaidGuide] Private Blob read failed:', error);
    return NextResponse.json(
      { error: 'Private guide storage is temporarily unavailable.' },
      { status: 503 }
    );
  }
}

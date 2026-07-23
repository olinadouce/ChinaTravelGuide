import { get } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

import { getPackageBySlug } from '@/data/packages';
import { verifyPaidGuideUser } from '@/lib/server/firebase-access';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const PAID_GUIDES_STORE_ID = 'store_Qu89PDZ4WlNNieex';

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
          }
        : {
            access: 'private',
            token: readWriteToken,
          }
    );

    if (!result || result.statusCode !== 200) {
      return NextResponse.json({ error: 'Paid guide content is unavailable.' }, { status: 404 });
    }

    return new NextResponse(result.stream, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `inline; filename="${pkg.slug}.html"`,
        'Cache-Control': 'private, no-store',
        'X-Content-Type-Options': 'nosniff',
        Vary: 'Authorization',
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

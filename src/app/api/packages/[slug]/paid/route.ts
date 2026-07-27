import { head, issueSignedToken, presignUrl } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

import { getPackageBySlug } from '@/data/packages';
import { verifyPaidGuideUser } from '@/lib/server/firebase-access';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const PAID_GUIDES_STORE_ID = 'store_Qu89PDZ4WlNNieex';
const SIGNED_URL_LIFETIME_MS = 2 * 60 * 1000;

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

    const pathname = `paid-guides/${pkg.slug}.html`;
    const blobCredentials =
      oidcToken && process.env.VERCEL
        ? {
            oidcToken,
            storeId: PAID_GUIDES_STORE_ID,
          }
        : {
            token: readWriteToken,
          };

    try {
      await head(pathname, blobCredentials);
    } catch {
      return NextResponse.json({ error: 'Paid guide content is unavailable.' }, { status: 404 });
    }

    // The signed URL is scoped to one private file, permits GET only and
    // expires quickly. Large guides therefore download directly from Blob
    // instead of crossing Vercel Function's 4.5 MB response boundary.
    const validUntil = Date.now() + SIGNED_URL_LIFETIME_MS;
    const signedToken = await issueSignedToken({
      ...blobCredentials,
      pathname,
      operations: ['get'],
      validUntil,
    });
    const { presignedUrl } = await presignUrl(signedToken, {
      access: 'private',
      operation: 'get',
      pathname,
      validUntil,
      useCache: false,
    });

    return NextResponse.json(
      { url: presignedUrl, expiresAt: validUntil },
      {
      headers: {
        'Cache-Control': 'private, no-store',
        'X-Content-Type-Options': 'nosniff',
        Vary: 'Authorization',
      },
      }
    );
  } catch (error) {
    console.error('[PaidGuide] Private Blob read failed:', error);
    return NextResponse.json(
      { error: 'Private guide storage is temporarily unavailable.' },
      { status: 503 }
    );
  }
}

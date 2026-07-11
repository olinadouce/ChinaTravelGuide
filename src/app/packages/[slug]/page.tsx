import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { PaidIframeGate } from '@/components/packages/PaidIframeGate';
import { getPackageBySlug } from '@/data/packages';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const pkg = getPackageBySlug(params.slug);
  if (!pkg) return { title: 'Package not found · China Travel Guide' };
  return {
    title: `${pkg.name} · Travel Packages · China Travel Guide`,
    description: pkg.shortDescription,
  };
}

/**
 * Theme → static-asset URL mapping.
 * Each theme's HTML files live under /public/<theme>/<slug>/{free,paid}.html.
 */
const themeToAssetBase: Record<string, string> = {
  ishowspeed: '/ishowspeed',
  landscape: '/nature',
  themed: '/themed',
  history: '/history',
};

const citySlugByDestination: Record<string, string> = {
  Beijing: 'beijing',
  Shanghai: 'shanghai',
  Chengdu: 'chengdu',
  'Chengdu · Sichuan': 'chengdu',
  Chongqing: 'chongqing',
  Henan: 'henan',
  'Hong Kong': 'hong-kong',
  Shenzhen: 'shenzhen',
};

export default function PackageDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const pkg = getPackageBySlug(params.slug);
  if (!pkg) notFound();

  const assetBase = themeToAssetBase[pkg.themeId];
  // IShowSpeed uses destination→city mapping; landscape slug matches the folder name directly
  const slug = pkg.themeId === 'ishowspeed'
    ? (citySlugByDestination[pkg.destination] ?? params.slug)
    : params.slug;
  const freeUrl = assetBase ? `${assetBase}/${slug}/free.html` : null;
  const paidUrl = assetBase ? `${assetBase}/${slug}/paid.html` : null;

  return (
    <div className="min-h-screen bg-[#f7f1e8]">
      {/* Navigation spacer */}
      <div className="h-20" />

      {/* Minimal header with back link */}
      <div className="container-main mb-4">
        <Link
          href="/packages"
          className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-secondary-900 shadow-sm transition-colors hover:bg-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all packages
        </Link>
      </div>

      {freeUrl && paidUrl ? (
        <>
          {/* Free preview — directly renders the static HTML file */}
          <iframe
            src={freeUrl}
            title={`${pkg.slug}-free`}
            className="w-full border-0"
            style={{ minHeight: '1800px' }}
          />

          {/* Paid version — gated: only loads the static HTML after sign-in + redeem */}
          <PaidIframeGate pkg={pkg} paidUrl={paidUrl} />
        </>
      ) : (
        <div className="container-main">
          <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center text-secondary-700">
            <h2 className="text-xl font-bold">{pkg.name}</h2>
            <p className="mt-2 text-sm">
              Detailed view for this theme is coming soon. Browse all{' '}
              <Link href="/packages" className="text-primary underline">
                packages
              </Link>{' '}
              to explore other destinations.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
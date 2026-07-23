import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { PaidIframeGate } from '@/components/packages/PaidIframeGate';
import { PointsEarnPanel } from '@/components/packages/PointsEarnPanel';
import { ThemeAwareIframe } from '@/components/packages/ThemeAwareIframe';
import { getPackageBySlug } from '@/data/packages';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) return { title: 'Package not found - China Travel Guide' };
  return {
    title: `${pkg.name} - Travel Packages - China Travel Guide`,
    description: pkg.shortDescription,
  };
}
/**
 * Theme to static-asset URL mapping.
 * Free previews remain public. Paid guides are fetched through an authenticated API.
 */
const themeToAssetBase: Record<string, string> = {
  ishowspeed: '/ishowspeed',
  landscape: '/nature',
  themed: '/themed',
  history: '/history',
};

const packageWordDownloads: Record<string, string> = {
  guangzhou: '/themed/guangzhou/free-guide.docx',
  'guilin-yangshuo-longji': '/themed/guilin-yangshuo-longji/free-guide.docx',
  tibet: '/themed/tibet/free-guide.docx',
};


export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: packageSlug } = await params;
  const pkg = getPackageBySlug(packageSlug);
  if (!pkg) notFound();

  const assetBase = themeToAssetBase[pkg.themeId];
  // IShowSpeed package slugs are stable even when destination labels change.
  const slug = pkg.themeId === 'ishowspeed'
    ? packageSlug.replace(/^ishowspeed-/, '')
    : packageSlug;
  const freeUrl = assetBase ? `${assetBase}/${slug}/free.html` : null;

  const cityName = pkg.destination.split(' - ')[0].split(' · ')[0];

  return (
    <div className="min-h-screen bg-[#f7f1e8] dark:bg-[#0b1220]">
      <div className="h-20" />

      <div className="container-main mb-4">
        <Link
          href="/packages"
          className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-secondary-900 dark:text-white shadow-sm transition-colors hover:bg-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all packages
        </Link>
      </div>

      {freeUrl ? (
        <>
          <ThemeAwareIframe
            src={freeUrl}
            title={`${pkg.slug}-free`}
            minHeight={1800}
          />

          <PointsEarnPanel
            citySlug={slug}
            cityName={cityName}
            freeUrl={freeUrl}
            wordUrl={packageWordDownloads[packageSlug]}
          />

          <PaidIframeGate pkg={pkg} />
        </>
      ) : (
        <div className="container-main">
          <div className="rounded-2xl border border-stone-200 bg-white dark:bg-secondary-900 p-8 text-center text-secondary-700 dark:text-secondary-200">
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


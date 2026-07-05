import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Clock,
  Coins,
  Eye,
  Lock,
  MapPin,
  Sparkles,
} from 'lucide-react';

import { PackageHtmlFrame } from '@/components/packages/PackageHtmlFrame';
import { UnlockPanel } from '@/components/packages/UnlockPanel';
import { UnlockedPaidGate } from '@/components/packages/UnlockedPaidGate';
import {
  getAllPackages,
  getFreeHtml,
  getPackageBySlug,
  getPaidHtml,
} from '@/data/packages';

export function generateStaticParams() {
  return getAllPackages().map((p) => ({ slug: p.slug }));
}

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

const accentMap = {
  primary: { text: 'text-primary', bg: 'bg-primary' },
  accent: { text: 'text-accent', bg: 'bg-accent' },
  jade: { text: 'text-jade', bg: 'bg-jade' },
  secondary: { text: 'text-secondary-700', bg: 'bg-secondary-700' },
} as const;

export default async function PackageDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const pkg = getPackageBySlug(params.slug);
  if (!pkg) notFound();

  const freeHtml = getFreeHtml(params.slug);
  const paidHtml = getPaidHtml(params.slug);

  const accent =
    pkg.themeId === 'landscape'
      ? accentMap.jade
      : pkg.themeId === 'history'
        ? accentMap.primary
        : pkg.themeId === 'themed'
          ? accentMap.accent
          : accentMap.secondary;

  return (
    <div className="min-h-screen bg-[#f7f1e8]">
      {/* Navigation spacer */}
      <div className="h-20" />

      {/* Hero */}
      <section className="relative h-[440px] overflow-hidden">
        <Image
          src={pkg.coverImage}
          alt={pkg.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-transparent" />

        <div className="container-main relative h-full">
          <Link
            href="/packages"
            className="absolute left-4 top-8 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-secondary-900 shadow-sm transition-colors hover:bg-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all packages
          </Link>

          <div className="absolute bottom-10 left-4 right-4">
            <div className="flex flex-wrap items-center gap-2">
              {pkg.badge && (
                <div className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-secondary-900 shadow-sm">
                  {pkg.badge}
                </div>
              )}
              {pkg.popular && (
                <div className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-sm">
                  <Sparkles className="h-3 w-3" /> Popular
                </div>
              )}
              <div className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-secondary-900 shadow-sm">
                <Clock className="h-3 w-3" /> {pkg.duration}
              </div>
              <div className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-secondary-900 shadow-sm">
                <MapPin className={`h-3 w-3 ${accent.text}`} /> {pkg.destination}
              </div>
            </div>

            <h1 className="mt-4 font-serif text-3xl font-bold text-white md:text-5xl">
              {pkg.name}
            </h1>
            <p className="mt-3 max-w-3xl text-sm text-white/85 md:text-base">
              {pkg.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="container-main py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main column */}
          <div className="space-y-8 lg:col-span-2">
            {/* Free preview */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-jade/10 px-3 py-1.5 text-xs font-bold text-jade">
                  <Eye className="h-3.5 w-3.5" /> Free preview
                </div>
                <p className="text-xs text-secondary-500">
                  {pkg.highlights.length} core highlights · overview & route summary
                </p>
              </div>
              <PackageHtmlFrame html={freeHtml} title={`${pkg.slug}-free`} />

              {/* Highlights + tags */}
              <div className="mt-6 rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
                <h3 className="font-bold text-secondary-900">Key highlights</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {pkg.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-full bg-stone-100 px-3 py-1 text-sm text-secondary-700"
                    >
                      {h}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {pkg.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Paid section */}
            <div id="paid-section" className="scroll-mt-28">
              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold text-white ${accent.bg}`}
                >
                  <Lock className="h-3.5 w-3.5" /> Full version · {pkg.pointsCost} pts
                </div>
                <p className="text-xs text-secondary-500">
                  Day-by-day plan · restaurant & hotel picks · contingency tips
                </p>
              </div>

              {/* Inline unlock panel */}
              <UnlockPanel pkg={pkg} variant="inline" />

              {/* Paid iframe — gated by client component */}
              <div className="mt-6">
                <UnlockedPaidGate pkg={pkg} paidHtml={paidHtml} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <UnlockPanel pkg={pkg} variant="sidebar" />

              <div className="overflow-hidden rounded-3xl border border-black/5 bg-white p-6 shadow-md">
                <h3 className="font-bold text-secondary-900">Package info</h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-secondary-500">Destination</dt>
                    <dd className="text-right font-medium text-secondary-800">
                      {pkg.destination}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-secondary-500">Recommended duration</dt>
                    <dd className="font-medium text-secondary-800">
                      {pkg.duration}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-secondary-500">Points cost</dt>
                    <dd
                      className={`inline-flex items-center gap-1 font-bold ${accent.text}`}
                    >
                      <Coins className="h-4 w-4" /> {pkg.pointsCost}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-secondary-500">Free preview</dt>
                    <dd className="font-medium text-jade">Included</dd>
                  </div>
                </dl>
              </div>

              <Link
                href="/packages"
                className="block w-full rounded-full bg-stone-100 px-5 py-3 text-center text-sm font-semibold text-secondary-700 transition-colors hover:bg-stone-200"
              >
                Browse more packages
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
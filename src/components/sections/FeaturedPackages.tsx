import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Coins, Eye, MapPin, Sparkles } from 'lucide-react';

import { getAllPackages, type ClientPackage } from '@/data/packages';

const accentMap = {
  primary: 'bg-primary',
  accent: 'bg-accent',
  jade: 'bg-jade',
  secondary: 'bg-secondary-700',
} as const;

function getAccent(pkg: ClientPackage): keyof typeof accentMap {
  if (pkg.themeId === 'landscape') return 'jade';
  if (pkg.themeId === 'history') return 'primary';
  if (pkg.themeId === 'themed') return 'accent';
  return 'secondary';
}

export default function FeaturedPackages() {
  const packages = getAllPackages().slice(0, 3);

  return (
    <section className="container-main py-16">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-primary">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-[0.18em]">
              Curated Packages
            </span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-secondary-900 md:text-4xl">
            Featured China travel guides
          </h2>
          <p className="mt-3 max-w-2xl text-secondary-600">
            Four themes · 17 in-depth guides. Free preview always — sign in to redeem 200 bonus points
            and unlock the full version.
          </p>
        </div>
        <Link
          href="/packages"
          className="inline-flex items-center gap-2 rounded-full bg-secondary-900 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-primary"
        >
          Browse all packages <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg, index) => {
          const accent = getAccent(pkg);
          return (
            <Link
              key={pkg.id}
              href={`/packages/${pkg.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={pkg.coverImage}
                  alt={pkg.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute left-3 top-3 flex flex-col gap-2">
                  {pkg.badge && (
                    <div className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-secondary-900 shadow-sm">
                      {pkg.badge}
                    </div>
                  )}
                </div>
                <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-xs font-bold text-white backdrop-blur">
                  <Eye className="h-3 w-3" /> Free preview
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-center gap-2 text-xs text-secondary-500">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  {pkg.destination}
                </div>
                <h3 className="line-clamp-1 font-serif text-lg font-bold text-secondary-900">
                  {pkg.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-secondary-600">
                  {pkg.shortDescription}
                </p>
                <div className="mt-auto flex items-center justify-between border-t border-secondary-100 pt-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold text-white ${accentMap[accent]}`}
                  >
                    <Coins className="h-3.5 w-3.5" />
                    {pkg.pointsCost} pts
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    View details <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
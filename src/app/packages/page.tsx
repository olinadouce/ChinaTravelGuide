import { BookOpen, Sparkles } from 'lucide-react';

import { ThemeSection } from '@/components/packages/ThemeSection';
import {
  getAllThemes,
  getPackagesByTheme,
} from '@/data/packages';
import type { ThemeId } from '@/types';

export const metadata = {
  title: 'Travel Packages · China Travel Guide',
  description:
    'Hand-crafted China travel guides organised into four themes — landscape, history, themed routes and IShowSpeed livestream highlights. Free preview always; sign in to unlock the full version with points.',
};

const themeMeta: Array<{ id: ThemeId; shortName: string }> = [
  { id: 'landscape', shortName: 'Landscape' },
  { id: 'history', shortName: 'History' },
  { id: 'themed', shortName: 'Themed' },
  { id: 'ishowspeed', shortName: 'IShowSpeed' },
];

export default function PackagesPage() {
  const themes = getAllThemes();
  const themePackages: Record<ThemeId, number> = {
    landscape: getPackagesByTheme('landscape').length,
    history: getPackagesByTheme('history').length,
    themed: getPackagesByTheme('themed').length,
    ishowspeed: getPackagesByTheme('ishowspeed').length,
  };
  const total = Object.values(themePackages).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-[#f7f1e8]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-stone-50 to-amber-50 py-20">
        <div className="absolute -left-16 top-8 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-16 bottom-8 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 rounded-full bg-jade/5 blur-3xl" />

        <div className="container-main relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm font-medium">Travel Packages</span>
            </div>
            <h1 className="text-5xl font-bold text-secondary-900 md:text-6xl">
              Four themes ·{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {total} in-depth
              </span>{' '}
              China guides
            </h1>
            <p className="mt-6 text-lg text-secondary-600">
              Every package ships with a free preview of the route and highlights. Sign in to redeem{' '}
              <span className="font-bold text-accent">200 bonus points</span> and unlock the full version
              (80 pts each) — including day-by-day plans, restaurant & hotel picks, and contingency guides.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1.5 font-medium text-secondary-700 shadow-sm">
                <Sparkles className="h-4 w-4 text-accent" /> 200 pts on sign-up
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1.5 font-medium text-secondary-700 shadow-sm">
                80 pts per package
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1.5 font-medium text-secondary-700 shadow-sm">
                Unlocks are permanent
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Theme Tabs */}
      <div className="sticky top-16 z-30 border-b border-black/5 bg-[#f7f1e8]/85 backdrop-blur-md md:top-20">
        <div className="container-main">
          <nav className="flex items-center gap-2 overflow-x-auto py-3">
            <span className="mr-2 hidden text-xs font-bold uppercase tracking-[0.16em] text-secondary-500 md:inline">
              Jump to
            </span>
            {themeMeta.map((m) => (
              <a
                key={m.id}
                href={`#theme-${m.id}`}
                className="inline-flex items-center gap-1 rounded-full bg-white/70 px-4 py-1.5 text-sm font-bold text-secondary-700 shadow-sm ring-1 ring-black/5 transition-colors hover:bg-primary hover:text-white"
              >
                {m.shortName}
                <span className="rounded-full bg-secondary-100 px-2 py-0.5 text-xs text-secondary-600 group-hover:bg-white/20 group-hover:text-white">
                  {themePackages[m.id]}
                </span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Theme Sections */}
      <section className="container-main space-y-16 py-12 md:space-y-20 md:py-16">
        {themes.map((theme) => {
          const packages = getPackagesByTheme(theme.id);
          return (
            <ThemeSection key={theme.id} theme={theme} packages={packages} />
          );
        })}
      </section>

      {/* Footer note */}
      <section className="container-main pb-16">
        <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6 text-sm text-secondary-700 md:p-8">
          <h3 className="font-serif text-xl font-bold text-secondary-900">
            How packages work
          </h3>
          <ul className="mt-3 space-y-2 leading-relaxed">
            <li>· Every package includes a <b>free preview</b> showing the core route and highlights.</li>
            <li>· The <b>full version</b> adds detailed day-by-day plans, hotel tiers, restaurant picks, contingency options, and local-only tips.</li>
            <li>· New accounts receive <b>200 bonus points</b> — enough to unlock 2 paid guides. Unlocks persist forever.</li>
            <li>· This is a demo build (mock auth) — points are virtual, no real payment is involved.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
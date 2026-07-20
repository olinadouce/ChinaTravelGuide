'use client';

import { motion } from 'framer-motion';
import {
  Compass,
  Landmark,
  Mountain,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

import type { PackageTheme } from '@/types';
import type { ClientPackage } from '@/data/packages';
import { cn } from '@/lib/utils';
import { PackageCard } from './PackageCard';

const ICONS: Record<PackageTheme['icon'], LucideIcon> = {
  Mountain,
  Landmark,
  Compass,
  Sparkles,
};

const accentBg: Record<PackageTheme['accent'], string> = {
  primary: 'bg-primary/10 text-primary',
  accent: 'bg-accent/15 text-accent',
  jade: 'bg-jade/15 text-jade',
  secondary: 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-200',
};

const accentText: Record<PackageTheme['accent'], string> = {
  primary: 'text-primary',
  accent: 'text-accent',
  jade: 'text-jade',
  secondary: 'text-secondary-700 dark:text-secondary-200',
};

interface ThemeSectionProps {
  theme: PackageTheme;
  packages: ClientPackage[];
}

export function ThemeSection({ theme, packages }: ThemeSectionProps) {
  const Icon = ICONS[theme.icon];
  return (
    <section
      id={`theme-${theme.id}`}
      className="scroll-mt-28"
      aria-labelledby={`theme-${theme.id}-title`}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="overflow-hidden rounded-[32px] border border-black/5 bg-white p-6 shadow-lg shadow-black/5 transition-colors duration-300 dark:border-white/10 dark:bg-secondary-900 md:p-8"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div
              className={cn(
                'flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl shadow-inner',
                accentBg[theme.accent]
              )}
            >
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <p
                className={cn(
                  'text-xs font-bold uppercase tracking-[0.18em]',
                  accentText[theme.accent]
                )}
              >
                {theme.tagline}
              </p>
              <h2
                id={`theme-${theme.id}-title`}
                className="mt-1 font-serif text-2xl font-bold text-secondary-900 dark:text-white md:text-3xl"
              >
                {theme.name}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary-600 dark:text-secondary-300">
                {theme.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-start">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold text-secondary-700 shadow-sm backdrop-blur dark:bg-secondary-800/80 dark:text-secondary-200">
              {packages.length} packages
            </span>
          </div>
        </div>
      </motion.div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {packages.map((pkg, i) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            index={i}
            accent={theme.accent}
          />
        ))}
      </div>
    </section>
  );
}

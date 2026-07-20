'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Coins, Eye, MapPin, Clock, Sparkles } from 'lucide-react';

import type { ClientPackage } from '@/data/packages';
import { cn } from '@/lib/utils';

interface PackageCardProps {
  pkg: ClientPackage;
  index?: number;
  accent?: 'primary' | 'accent' | 'jade' | 'secondary';
}

const accentText: Record<NonNullable<PackageCardProps['accent']>, string> = {
  primary: 'text-primary',
  accent: 'text-accent',
  jade: 'text-jade',
  secondary: 'text-secondary-700 dark:text-secondary-200',
};

const accentBg: Record<NonNullable<PackageCardProps['accent']>, string> = {
  primary: 'bg-primary',
  accent: 'bg-accent',
  jade: 'bg-jade',
  secondary: 'bg-secondary-700',
};

export function PackageCard({ pkg, index = 0, accent = 'primary' }: PackageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="h-full"
    >
      <Link
        href={`/packages/${pkg.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-secondary-900 shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={pkg.coverImage}
            alt={pkg.name}
            fill
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

          {/* Top badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {pkg.badge && (
              <div className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-secondary-900 shadow-sm dark:bg-secondary-950/85 dark:text-secondary-100 dark:ring-1 dark:ring-white/10">
                {pkg.badge}
              </div>
            )}
            {pkg.popular && (
              <div className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-sm">
                <Sparkles className="h-3 w-3" />
                Popular
              </div>
            )}
          </div>

          {/* Free preview badge */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1 text-xs font-bold text-white backdrop-blur">
            <Eye className="h-3 w-3" />
            Free preview
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-3 flex items-center gap-3 text-xs text-secondary-500 dark:text-secondary-400">
            <span className="inline-flex items-center gap-1">
              <MapPin className={cn('h-3.5 w-3.5', accentText[accent])} />
              {pkg.destination}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-accent" />
              {pkg.duration}
            </span>
          </div>

          <h3 className="line-clamp-1 font-serif text-lg font-bold text-secondary-900 dark:text-white">
            {pkg.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-secondary-600 dark:text-secondary-300">
            {pkg.shortDescription}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {pkg.highlights.slice(0, 3).map((h) => (
              <span
                key={h}
                className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs text-secondary-700 dark:bg-secondary-800 dark:text-secondary-200"
              >
                {h}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-secondary-100 dark:border-secondary-700 pt-4">
            <div
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white shadow-sm',
                accentBg[accent]
              )}
            >
              <Coins className="h-3.5 w-3.5" />
              {pkg.pointsCost} pts to unlock
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2">
              View details
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

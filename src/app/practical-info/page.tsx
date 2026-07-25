import Link from 'next/link';
import { ArrowRight, FileCheck2 } from 'lucide-react';
import { practicalGuides } from '@/data/content';
import { guideIconMap } from '@/components/ui/RichBlocks';
import type { LucideIcon } from 'lucide-react';

const accentClassMap: Record<string, string> = {
  primary: 'bg-primary/10 text-primary',
  accent: 'bg-accent/10 text-accent',
  jade: 'bg-emerald-500/10 text-emerald-600',
  secondary: 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-200',
};

export default function PracticalInfoPage() {
  return (
    <div className="min-h-screen bg-[#f7f1e8] dark:bg-[#0b1220]">
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-stone-50 to-amber-50 py-20 transition-colors duration-300 dark:from-[#111827] dark:via-[#0b1220] dark:to-[#172033]">
        <div className="absolute -left-16 top-8 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-16 bottom-8 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 rounded-full bg-jade/5 blur-3xl" />
        <div className="container-main relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary">
              <FileCheck2 className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm font-medium">Practical Information</span>
            </div>
            <h1 className="text-5xl font-bold text-secondary-900 dark:text-white md:text-6xl">
              Arrive prepared with{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                less uncertainty
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-secondary-600 dark:text-secondary-300">
              Accommodation, medical care, food culture, transportation, payment, and language — the six essentials that decide whether a China trip feels easy on day one.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
              {[
                `${practicalGuides.length} detailed guides`,
                'Arrival-ready advice',
                'China-specific essentials',
              ].map((label) => (
                <span key={label} className="rounded-full bg-white/80 px-3 py-1.5 font-medium text-secondary-700 shadow-sm dark:bg-secondary-800/80 dark:text-secondary-200">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-main grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {practicalGuides.map((guide) => {
            const Icon: LucideIcon = guideIconMap[guide.icon] ?? FileCheck2;
            const iconWrap = accentClassMap[guide.accent] ?? accentClassMap.secondary;
            return (
              <Link
                key={guide.slug}
                href={`/practical-info/${guide.slug}`}
                className="group flex flex-col rounded-[28px] bg-white dark:bg-secondary-900 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-5 flex items-start justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconWrap}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-secondary-50 px-3 py-1 text-xs uppercase tracking-[0.16em] text-secondary-500 dark:text-secondary-400">
                    {guide.readMinutes} min read
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">{guide.title}</h2>
                <p className="mt-3 text-sm leading-7 text-secondary-600 dark:text-secondary-300">{guide.summary}</p>
                <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-secondary-500 marker:text-primary dark:text-secondary-400">
                  {guide.preview.slice(0, 3).map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
                    Open guide
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

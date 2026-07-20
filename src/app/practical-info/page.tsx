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
    <div className="min-h-screen bg-[#f7f1e8] dark:bg-[#0b1220] pt-20">
      <section className="bg-secondary-900 py-20 text-white">
        <div className="container-main max-w-4xl">
          <p className="mb-4 text-sm uppercase tracking-[0.24em] text-white/55">Practical information</p>
          <h1 className="text-5xl font-bold">Reduce uncertainty before travelers arrive.</h1>
          <p className="mt-6 text-lg leading-8 text-white/75">
            Accommodation, medical care, food culture, transportation, payment, and language 鈥?the six essentials that decide whether a China trip feels easy on day one.
          </p>
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
                <ul className="mt-5 space-y-2 text-sm text-secondary-500 dark:text-secondary-400">
                  {guide.preview.slice(0, 3).map((point) => (
                    <li key={point}>鈥?{point}</li>
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

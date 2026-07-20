'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, FileCheck2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { practicalGuides, travelTools } from '@/data/content';
import { guideIconMap } from '@/components/ui/RichBlocks';

const accentClassMap: Record<string, string> = {
  primary: 'bg-primary/15 text-primary',
  accent: 'bg-accent/15 text-accent',
  jade: 'bg-jade/15 text-jade',
  secondary: 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-200',
};

export default function TravelInfo() {
  return (
    <section className="relative overflow-hidden bg-[#f7f1e8] dark:bg-[#0b1220] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_75%,rgba(245,158,11,0.10),transparent_30%),radial-gradient(circle_at_90%_20%,rgba(16,185,129,0.08),transparent_32%)]" />

      {/* Decorative elements */}
      <div className="absolute -left-32 bottom-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -right-20 top-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="container-main relative">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary ring-1 ring-primary/15">
            <FileCheck2 className="h-4 w-4" />
            Practical Planning Layer
          </div>
          <h2 className="mb-4 font-serif text-4xl font-bold text-secondary-900 dark:text-white md:text-5xl lg:text-5xl">
            More than inspiration.{' '}
            <span className="gradient-text">Friction-reducing</span> guidance.
          </h2>
          <p className="max-w-3xl text-lg leading-8 text-secondary-600 dark:text-secondary-300">
            Six core topics 鈥?accommodation, medical care, food culture, transportation, payment, and language 鈥?that decide whether a China trip feels easy on day one.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {practicalGuides.map((guide, index) => {
            const Icon: LucideIcon = guideIconMap[guide.icon] ?? FileCheck2;
            const iconWrap = accentClassMap[guide.accent] ?? accentClassMap.secondary;
            return (
              <motion.div
                key={guide.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <Link
                  href={`/practical-info/${guide.slug}`}
                  className="group flex h-full flex-col rounded-[28px] border border-black/5 dark:border-white/10 bg-white dark:bg-secondary-900 p-6 shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
                >
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconWrap}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-secondary-100 dark:bg-secondary-800 px-3 py-1 text-xs uppercase tracking-[0.16em] text-secondary-500 dark:text-secondary-400">
                      {guide.readMinutes} min
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white">{guide.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-secondary-600 dark:text-secondary-300">{guide.summary}</p>
                  <ul className="mt-5 space-y-2 text-sm text-secondary-500 dark:text-secondary-400">
                    {guide.preview.slice(0, 2).map((point) => (
                      <li key={point}>鈥?{point}</li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-all group-hover:gap-3">
                      Open guide
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 rounded-[32px] border border-black/5 dark:border-white/10 bg-white dark:bg-secondary-900 p-7 shadow-lg shadow-black/5"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-secondary-500 dark:text-secondary-400">Travel Tools</p>
          <h3 className="mt-4 font-serif text-3xl font-bold text-secondary-900 dark:text-white">Interactive helpers for trip prep</h3>
          <p className="mt-4 text-sm leading-7 text-secondary-600 dark:text-secondary-300">
            The tooling layer gives the project an immediately more useful feel and creates space for future lead generation or personalization.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {travelTools.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.href}
                className="flex items-start justify-between gap-4 rounded-3xl border border-secondary-100 dark:border-secondary-700 bg-stone-50 dark:bg-secondary-800 p-4 transition-colors hover:bg-primary/5"
              >
                <div>
                  <p className="font-semibold text-secondary-900 dark:text-white">{tool.title}</p>
                  <p className="mt-1 text-sm text-secondary-600 dark:text-secondary-300">{tool.description}</p>
                </div>
                <span className="shrink-0 rounded-full bg-white dark:bg-secondary-900 px-3 py-1 text-xs uppercase tracking-[0.16em] text-secondary-500 dark:text-secondary-400 shadow-sm">
                  {tool.status}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

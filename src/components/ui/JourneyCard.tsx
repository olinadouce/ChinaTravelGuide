'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock3, Route, Sparkles } from 'lucide-react';
import { Journey } from '@/types';

interface JourneyCardProps {
  journey: Journey;
  index?: number;
}

const difficultyClasses = {
  easy: 'bg-jade/15 text-jade',
  moderate: 'bg-accent/15 text-accent',
  challenging: 'bg-primary/15 text-primary',
};

export default function JourneyCard({ journey, index = 0 }: JourneyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
    >
      <Link href={`/journeys/${journey.slug}`} className="group block h-full">
        <article className="h-full overflow-hidden rounded-[28px] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-secondary-800">
          <div className="relative aspect-[16/10]">
            <Image
              src={journey.image}
              alt={journey.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-secondary-900 dark:text-white">
              <Clock3 className="h-4 w-4 text-primary" />
              {journey.duration} days
            </div>
            <div className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${difficultyClasses[journey.difficulty]}`}>
              {journey.difficulty}
            </div>
          </div>

          <div className="p-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary-100 px-3 py-1 text-xs font-medium text-secondary-700 dark:bg-secondary-700 dark:text-secondary-100">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              {journey.theme}
            </span>

            <h3 className="mt-4 font-serif text-2xl font-bold text-secondary-900 dark:text-white">{journey.title}</h3>
            <p className="mt-3 text-sm leading-7 text-secondary-600 dark:text-secondary-300">{journey.description}</p>

            <div className="mt-5 rounded-3xl bg-secondary-50 p-4 dark:bg-secondary-700/60">
              <div className="flex items-center gap-2 text-sm font-medium text-secondary-700 dark:text-secondary-100">
                <Route className="h-4 w-4 text-primary" />
                Route highlights
              </div>
              <p className="mt-2 text-sm text-secondary-600 dark:text-secondary-300">{journey.highlights.join(' 鈥?')}</p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-secondary-100 pt-4 dark:border-secondary-700">
              <span className="text-sm font-semibold text-secondary-900 dark:text-white">{journey.price}</span>
              <span className="flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
                View journey
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

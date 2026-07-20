'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Route } from 'lucide-react';
import { journeys } from '@/data/content';
import JourneyCard from '@/components/ui/JourneyCard';

export default function FeaturedJourneys() {
  return (
    <section className="relative overflow-hidden bg-[#f7f1e8] dark:bg-[#0b1220] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(16,185,129,0.09),transparent_30%),radial-gradient(circle_at_85%_80%,rgba(220,38,38,0.07),transparent_34%)]" />

      {/* Decorative elements */}
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute -right-20 bottom-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="container-main relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-jade/10 px-4 py-2 text-jade ring-1 ring-jade/20">
              <Route className="h-4 w-4" />
              Suggested Journeys
            </div>
            <h2 className="mb-4 font-serif text-4xl font-bold text-secondary-900 dark:text-white md:text-5xl lg:text-5xl">
              Turn interest into <span className="gradient-text">routes travelers</span> can actually book.
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-secondary-600 dark:text-secondary-300">
              These sample itineraries show how the site can move beyond inspiration into concrete trip planning.
            </p>
          </div>

          <Link href="/journeys" className="inline-flex items-center gap-2 rounded-full bg-secondary-900 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-primary">
            See all journeys
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {journeys.slice(0, 3).map((journey, index) => (
            <JourneyCard key={journey.id} journey={journey} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MapPinned } from 'lucide-react';
import { destinations } from '@/data/content';
import DestinationCard from '@/components/ui/DestinationCard';

export default function FeaturedDestinations() {
  const featured = destinations.slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-[#f7f1e8] dark:bg-[#0b1220] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(220,38,38,0.08),transparent_32%),radial-gradient(circle_at_88%_20%,rgba(245,158,11,0.10),transparent_30%)]" />

      {/* Decorative elements */}
      <div className="absolute -left-20 top-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="container-main relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/12 px-4 py-2 text-accent ring-1 ring-accent/20">
              <MapPinned className="h-4 w-4" />
              Featured Destinations
            </div>
            <h2 className="mb-4 font-serif text-4xl font-bold text-secondary-900 dark:text-white md:text-5xl lg:text-5xl">
              Start with cities that make a <span className="gradient-text">first China trip</span> feel intuitive.
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-secondary-600 dark:text-secondary-300">
              These destinations balance traveler appeal, cultural depth, and realistic transport connections for international visitors.
            </p>
          </div>

          <Link href="/destinations" className="inline-flex items-center gap-2 rounded-full bg-secondary-900 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-primary">
            Browse all destinations
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((destination, index) => (
            <DestinationCard key={destination.id} destination={destination} index={index} featured={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

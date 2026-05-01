'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MapPinned } from 'lucide-react';
import { destinations } from '@/data/content';
import DestinationCard from '@/components/ui/DestinationCard';

export default function FeaturedDestinations() {
  const featured = destinations.slice(0, 6);

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-secondary-900 to-stone-950" />

      {/* Decorative elements */}
      <div className="absolute -left-20 top-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="container-main relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-accent">
              <MapPinned className="h-4 w-4" />
              Featured Destinations
            </div>
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-5xl">
              Start with cities that make a <span className="gradient-text">first China trip</span> feel intuitive.
            </h2>
            <p className="max-w-2xl text-lg text-secondary-300">
              These destinations balance traveler appeal, cultural depth, and realistic transport connections for international visitors.
            </p>
          </div>

          <Link href="/destinations" className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent/80">
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

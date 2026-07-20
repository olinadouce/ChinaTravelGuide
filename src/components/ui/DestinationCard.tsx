'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, PlaneTakeoff, Star } from 'lucide-react';
import { Destination } from '@/types';
import { formatNumber } from '@/lib/utils';

interface DestinationCardProps {
  destination: Destination;
  index?: number;
  featured?: boolean;
}

export default function DestinationCard({ destination, index = 0, featured = false }: DestinationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
    >
      <Link href={`/destinations/${destination.slug}`} className="group block h-full">
        <article className="flex h-full flex-col overflow-hidden rounded-[28px] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-secondary-800">
          <div className={`relative ${featured ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
            <Image
              src={destination.images[0]}
              alt={destination.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold capitalize text-secondary-900 dark:text-white">
              {destination.region} China
            </div>
            <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-secondary-900 dark:text-white">
              <Star className="h-4 w-4 fill-accent text-accent" />
              {destination.rating}
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="font-serif text-2xl font-bold text-white">{destination.name}</h3>
              <p className="mt-2 max-w-lg text-sm text-white/80">{destination.shortDescription}</p>
            </div>
          </div>

          <div className="flex flex-1 flex-col p-6">
            <div className="flex flex-wrap gap-2">
              {destination.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="rounded-full bg-secondary-100 px-3 py-1 text-xs text-secondary-600 dark:bg-secondary-700 dark:text-secondary-200">
                  {tag}
                </span>
              ))}
            </div>

            <p className="mt-4 flex-1 text-sm leading-7 text-secondary-600 dark:text-secondary-300">{destination.description}</p>

            <div className="mt-5 grid gap-3 rounded-3xl bg-secondary-50 p-4 text-sm dark:bg-secondary-700/60">
              <div className="flex items-center gap-2 text-secondary-600 dark:text-secondary-200">
                <CalendarDays className="h-4 w-4 text-primary" />
                Best season: {destination.bestTime}
              </div>
              <div className="flex items-center gap-2 text-secondary-600 dark:text-secondary-200">
                <PlaneTakeoff className="h-4 w-4 text-primary" />
                Suggested stay: {destination.practicalInfo.idealStay}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-sm text-secondary-500 dark:text-secondary-400">{formatNumber(destination.reviewCount)} traveler signals</span>
              <span className="flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
                Explore
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

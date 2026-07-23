'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, BadgeDollarSign, MapPin } from 'lucide-react';

import { bookingCities } from '@/data/bookings';

export default function FeaturedBook() {
  const featured = bookingCities.slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-[#f7f1e8] py-24 dark:bg-[#0b1220]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(15,93,98,0.10),transparent_32%),radial-gradient(circle_at_88%_20%,rgba(223,116,81,0.10),transparent_30%)]" />
      <div className="container-main relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#0f5d62]/10 px-4 py-2 font-bold text-[#0f5d62] dark:text-teal-300">
              <BadgeDollarSign className="h-4 w-4" /> Book your trip
            </div>
            <h2 className="max-w-4xl text-4xl font-bold text-[#102f46] dark:text-white md:text-5xl">
              Eat, stay and explore with <span className="text-[#0f5d62] dark:text-teal-300">curated city bookings.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-secondary-600 dark:text-secondary-300">
              Compare attractions, tours, hotels, dining experiences, shows and transfers from trusted booking partners.
            </p>
          </div>
          <Link href="/book" className="inline-flex items-center gap-2 rounded-full bg-[#0f5d62] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#0b484c]">
            Explore all cities <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((city) => (
            <Link key={city.slug} href={`/book/${city.slug}`} className="group relative h-64 overflow-hidden rounded-[26px] bg-secondary-800 shadow-md">
              {city.image ? (
                <img src={city.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" referrerPolicy="no-referrer" />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-[#0f5d62] to-[#102f46]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary-950 via-secondary-950/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-white/65">{city.region}</p>
                    <h3 className="mt-1 text-2xl font-bold">{city.name}</h3>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur">
                    <MapPin className="h-3 w-3" /> {city.productCount} options
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

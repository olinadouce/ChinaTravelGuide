'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Search } from 'lucide-react';

import type { BookingCity } from '@/data/bookings';

export function BookCityGrid({ cities, initialQuery = '' }: { cities: BookingCity[]; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return cities;
    return cities.filter((city) =>
      `${city.name} ${city.chineseName} ${city.region}`.toLowerCase().includes(normalized)
    );
  }, [cities, query]);

  return (
    <>
      <div className="mx-auto mb-10 max-w-2xl">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-secondary-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a city or region"
            className="w-full rounded-2xl border border-black/10 bg-white px-14 py-4 text-secondary-900 shadow-sm outline-none transition focus:border-[#0f5d62] focus:ring-4 focus:ring-[#0f5d62]/10 dark:border-white/10 dark:bg-secondary-900 dark:text-white"
          />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((city) => (
          <Link
            key={city.slug}
            href={`/book/${city.slug}`}
            className="group overflow-hidden rounded-[26px] border border-black/5 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-secondary-900"
          >
            <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#dbe8e4] via-[#edf1e8] to-[#f2d8c8] dark:from-secondary-800 dark:via-secondary-900 dark:to-[#153b3d]">
              {city.image ? (
                <img
                  src={city.image}
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex h-full items-center justify-center font-serif text-6xl font-bold text-[#0f5d62]/20 dark:text-white/10">
                  {city.chineseName.slice(0, 2)}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary-950/65 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/70">{city.region}</p>
                  <h2 className="mt-1 text-2xl font-bold">{city.name}</h2>
                </div>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur">{city.productCount} options</span>
              </div>
            </div>
            <div className="p-5">
              <p className="min-h-12 text-sm leading-6 text-secondary-600 dark:text-secondary-300">{city.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0f5d62] dark:text-teal-300">
                <MapPin className="h-4 w-4" /> Book {city.name} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-3xl border border-dashed border-secondary-300 py-16 text-center text-secondary-500 dark:border-secondary-700 dark:text-secondary-400">
          No matching city yet. Try another city or region.
        </div>
      )}
    </>
  );
}

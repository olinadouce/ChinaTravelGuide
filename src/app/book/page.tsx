import type { Metadata } from 'next';
import { BadgeDollarSign, Building2, Compass, ShieldCheck } from 'lucide-react';

import { BookCityGrid } from '@/components/book/BookCityGrid';
import { affiliateProducts, bookingCities } from '@/data/bookings';

export const metadata: Metadata = {
  title: 'Book China - Hotels, Attractions & Tours',
  description: 'Browse curated hotels, attractions, day tours, food experiences and transfers across China.',
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = '' } = await searchParams;
  return (
    <main className="min-h-screen bg-[#f7f1e8] dark:bg-[#0b1220]">
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-stone-50 to-amber-50 py-20 transition-colors duration-300 dark:from-[#111827] dark:via-[#0b1220] dark:to-[#172033]">
        <div className="absolute -left-16 top-8 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-16 bottom-8 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 rounded-full bg-jade/5 blur-3xl" />

        <div className="container-main relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary">
              <BadgeDollarSign className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm font-medium">Book with trusted partners</span>
            </div>
            <h1 className="text-5xl font-bold text-secondary-900 dark:text-white md:text-6xl">
              Book China,{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                city by city.
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-secondary-600 dark:text-secondary-300">
              Compare curated places to stay, attractions, day tours, dining experiences, shows and transfers from Klook, Trip.com and KKday.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 font-medium text-secondary-700 shadow-sm dark:bg-secondary-800/80 dark:text-secondary-200">
                <Compass className="h-4 w-4 text-primary" aria-hidden="true" />
                {bookingCities.length} cities & regions
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 font-medium text-secondary-700 shadow-sm dark:bg-secondary-800/80 dark:text-secondary-200">
                <Building2 className="h-4 w-4 text-accent" aria-hidden="true" />
                {affiliateProducts.length} booking options
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 font-medium text-secondary-700 shadow-sm dark:bg-secondary-800/80 dark:text-secondary-200">
                <ShieldCheck className="h-4 w-4 text-jade" aria-hidden="true" />
                3 affiliate partners
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container-main">
          <div className="mb-10 flex flex-col gap-4 text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-[#0f5d62]/10 px-4 py-2 text-sm font-bold text-[#0f5d62] dark:text-teal-300">
              <BadgeDollarSign className="h-4 w-4" /> Choose your destination
            </div>
            <h2 className="text-3xl font-bold text-[#102f46] dark:text-white md:text-4xl">What do you want to book?</h2>
          </div>
          <BookCityGrid cities={bookingCities} initialQuery={q} />
          <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-5 text-secondary-500 dark:text-secondary-400">
            Affiliate disclosure: we may earn a commission when you complete a booking through selected links. This does not increase the price you pay.
          </p>
        </div>
      </section>
    </main>
  );
}

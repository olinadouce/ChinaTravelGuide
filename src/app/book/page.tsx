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
    <main className="min-h-screen bg-[#f8f5ef] pt-20 dark:bg-[#0b1220]">
      <section className="relative overflow-hidden border-b border-black/5 py-20 dark:border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(15,93,98,0.16),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(223,116,81,0.13),transparent_22%)]" />
        <div className="container-main relative text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[#0f5d62] dark:text-teal-300">Book with trusted partners</p>
          <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-[#102f46] dark:text-white md:text-7xl">
            Book China, city by city.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-secondary-600 dark:text-secondary-300">
            Compare curated places to stay, attractions, day tours, dining experiences, shows and transfers from Klook, Trip.com and KKday.
          </p>

          <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-black/5 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-secondary-900/80">
              <Compass className="mx-auto h-6 w-6 text-[#0f5d62] dark:text-teal-300" />
              <p className="mt-2 text-2xl font-bold text-[#102f46] dark:text-white">{bookingCities.length}</p>
              <p className="text-xs uppercase tracking-wide text-secondary-500">Cities & regions</p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-secondary-900/80">
              <Building2 className="mx-auto h-6 w-6 text-[#0f5d62] dark:text-teal-300" />
              <p className="mt-2 text-2xl font-bold text-[#102f46] dark:text-white">{affiliateProducts.length}</p>
              <p className="text-xs uppercase tracking-wide text-secondary-500">Booking options</p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-secondary-900/80">
              <ShieldCheck className="mx-auto h-6 w-6 text-[#0f5d62] dark:text-teal-300" />
              <p className="mt-2 text-2xl font-bold text-[#102f46] dark:text-white">3</p>
              <p className="text-xs uppercase tracking-wide text-secondary-500">Affiliate partners</p>
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

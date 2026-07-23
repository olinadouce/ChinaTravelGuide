'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Building2,
  CarFront,
  ChevronDown,
  Compass,
  Landmark,
  MapPin,
  Search,
  Sparkles,
  Theater,
  UtensilsCrossed,
} from 'lucide-react';

import {
  bookingCategories,
  formatAffiliatePrice,
  type AffiliateProduct,
  type BookingCategory,
  type BookingCity,
} from '@/data/bookings';
import { cn } from '@/lib/utils';

const categoryIcons: Record<BookingCategory, typeof Landmark> = {
  attractions: Landmark,
  'day-tours': Compass,
  hotels: Building2,
  food: UtensilsCrossed,
  shows: Theater,
  transfers: CarFront,
};

const providerStyles: Record<AffiliateProduct['provider'], string> = {
  Klook: 'text-[#ff5b22]',
  'Trip.com': 'text-[#287dfa]',
  KKday: 'text-[#16a8b7]',
};

export function BookCityProducts({
  city,
  cities,
  products,
}: {
  city: BookingCity;
  cities: BookingCity[];
  products: AffiliateProduct[];
}) {
  const [category, setCategory] = useState<(typeof bookingCategories)[number]['id']>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category;
      const matchesQuery =
        !normalized ||
        product.title.toLowerCase().includes(normalized) ||
        product.provider.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [category, products, query]);

  return (
    <>
      <section className="relative overflow-hidden border-b border-black/5 bg-[#f8f5ef] pt-28 dark:border-white/10 dark:bg-[#0b1220]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_73%_35%,rgba(15,93,98,0.15),transparent_24%),radial-gradient(circle_at_88%_15%,rgba(223,116,81,0.13),transparent_18%)]" />
        <div className="container-main relative pb-10">
          <nav className="mb-9 flex items-center gap-2 text-sm text-secondary-500 dark:text-secondary-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#0f5d62]">Home</Link>
            <span>/</span>
            <Link href="/book" className="hover:text-[#0f5d62]">Book</Link>
            <span>/</span>
            <span className="text-secondary-800 dark:text-secondary-200">{city.name}</span>
          </nav>

          <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#0f5d62] dark:text-teal-300">Curated booking hub</p>
              <h1 className="text-5xl font-bold tracking-tight text-[#102f46] dark:text-white sm:text-6xl">Book {city.name}</h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-secondary-600 dark:text-secondary-300">
                Compare trusted affiliate partners for places to stay, things to do, food experiences and local transport.
              </p>
            </div>

            <div className="relative h-56 overflow-hidden rounded-[30px] bg-gradient-to-br from-[#dbe8e4] via-[#edf1e8] to-[#f2d8c8] shadow-sm sm:h-64">
              {city.image ? (
                <img src={city.image} alt="" className="h-full w-full object-cover opacity-85" referrerPolicy="no-referrer" />
              ) : (
                <div className="flex h-full items-center justify-center font-serif text-8xl font-bold text-[#0f5d62]/15">{city.chineseName.slice(0, 2)}</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-[#f8f5ef]/80 via-transparent to-transparent dark:from-[#0b1220]/70" />
              <div className="absolute bottom-5 right-5 rounded-full bg-white/85 px-4 py-2 text-sm font-medium text-[#102f46] shadow backdrop-blur dark:bg-secondary-900/85 dark:text-white">
                {city.productCount} curated options
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-16 z-30 border-b border-black/5 bg-[#f8f5ef]/95 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1220]/95 md:top-20">
        <div className="container-main">
          <div className="rounded-2xl border border-black/5 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-secondary-900">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative min-w-56 lg:w-64">
                <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0f5d62]" />
                <select
                  value={city.slug}
                  onChange={(event) => { window.location.href = `/book/${event.target.value}`; }}
                  className="w-full appearance-none rounded-xl border border-secondary-200 bg-white py-3 pl-11 pr-10 text-sm font-medium text-secondary-800 outline-none dark:border-secondary-700 dark:bg-secondary-800 dark:text-white"
                  aria-label="Choose a city"
                >
                  {cities.map((option) => <option key={option.slug} value={option.slug}>{option.name}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
              </div>

              <label className="relative min-w-56 flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search activities, hotels or partners"
                  className="w-full rounded-xl border border-secondary-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-[#0f5d62] dark:border-secondary-700 dark:bg-secondary-800 dark:text-white"
                />
              </label>

              <div className="flex min-w-0 max-w-full gap-2 overflow-x-auto pb-1 lg:pb-0">
                {bookingCategories.map((item) => {
                  const count = item.id === 'all' ? products.length : city.categoryCounts[item.id] ?? 0;
                  if (item.id !== 'all' && count === 0) return null;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCategory(item.id)}
                      className={cn(
                        'whitespace-nowrap rounded-xl px-4 py-3 text-sm font-medium transition',
                        category === item.id
                          ? 'bg-[#0f5d62] text-white shadow-sm'
                          : 'bg-[#f3f5f1] text-secondary-700 hover:bg-[#e6ece7] dark:bg-secondary-800 dark:text-secondary-200 dark:hover:bg-secondary-700'
                      )}
                    >
                      {item.label} <span className="ml-1 text-xs opacity-65">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f5ef] py-10 dark:bg-[#0b1220]">
        <div className="container-main">
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-sm text-secondary-500 dark:text-secondary-400">{filtered.length} options shown</p>
            <p className="hidden text-xs text-secondary-500 dark:text-secondary-400 sm:block">Prices are indicative and may change on the partner website.</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => {
              const Icon = categoryIcons[product.category];
              return (
                <article key={product.id} className="group flex min-h-[250px] flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-secondary-900 sm:flex-row">
                  <div className="relative h-48 w-full shrink-0 overflow-hidden bg-gradient-to-br from-[#dbe8e4] via-[#edf1e8] to-[#f2d8c8] dark:from-secondary-800 dark:to-[#153b3d] sm:h-auto sm:w-[39%]">
                    {product.image || city.image ? (
                      <img src={product.image ?? city.image ?? ''} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="flex h-full items-center justify-center"><Icon className="h-12 w-12 text-[#0f5d62]/25 dark:text-white/15" /></div>
                    )}
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 p-2 text-[#0f5d62] shadow-sm backdrop-blur dark:bg-secondary-900/90 dark:text-teal-300"><Icon className="h-4 w-4" /></span>
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col p-4">
                    <div className="flex items-start justify-between gap-2">
                      <span className="rounded-full bg-[#f3f5f1] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-secondary-600 dark:bg-secondary-800 dark:text-secondary-300">
                        {bookingCategories.find((item) => item.id === product.category)?.label}
                      </span>
                      <span className={cn('text-xs font-extrabold', providerStyles[product.provider])}>{product.provider}</span>
                    </div>
                    <h2 className="mt-3 line-clamp-4 text-base font-bold leading-5 text-[#102f46] dark:text-white">{product.title}</h2>
                    <div className="mt-auto pt-4">
                      <p className="text-[10px] uppercase tracking-wide text-secondary-400">From / listed price</p>
                      <p className="mt-0.5 text-lg font-bold text-[#102f46] dark:text-white">{formatAffiliatePrice(product)}</p>
                      <a
                        href={product.affiliateUrl}
                        target="_blank"
                        rel="sponsored noopener noreferrer"
                        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0f5d62] px-3 py-2.5 text-sm font-bold text-white transition hover:bg-[#0b484c]"
                      >
                        Check availability <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="rounded-3xl border border-dashed border-secondary-300 py-16 text-center dark:border-secondary-700">
              <Sparkles className="mx-auto h-8 w-8 text-[#0f5d62] dark:text-teal-300" />
              <p className="mt-3 font-semibold text-secondary-800 dark:text-white">No matching options</p>
              <button onClick={() => { setCategory('all'); setQuery(''); }} className="mt-3 text-sm font-bold text-[#0f5d62] dark:text-teal-300">Clear filters</button>
            </div>
          )}

          <div className="mt-8 rounded-2xl border border-black/5 bg-white/75 px-5 py-4 text-center text-xs leading-5 text-secondary-500 dark:border-white/10 dark:bg-secondary-900/75 dark:text-secondary-400">
            Affiliate disclosure: some links on this page are partner links. We may earn a commission if you book through them, at no additional cost to you. Availability, prices and booking terms are controlled by the partner website.
          </div>
        </div>
      </section>
    </>
  );
}

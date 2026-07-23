'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, MapPin, Search, Sparkles } from 'lucide-react';
import { popularSearches } from '@/data/content';
import { cn } from '@/lib/utils';

type HeroSlide = {
  slug: string;
  name: string;
  destination: string;
  duration: string;
  coverImage: string;
  badge?: string;
  shortDescription: string;
};

interface HeroProps {
  slides: HeroSlide[];
}

export default function Hero({ slides }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselSlides = slides.length > 0 ? slides : [];
  const currentSlide = carouselSlides[currentIndex];

  useEffect(() => {
    if (carouselSlides.length <= 1) return;
    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselSlides.length);
    }, 6500);
    return () => window.clearInterval(interval);
  }, [carouselSlides.length]);

  const bookHref = useMemo(
    () => `/book${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`,
    [searchQuery]
  );

  if (!currentSlide) {
    return null;
  }

  return (
    <section className="relative min-h-[820px] overflow-hidden bg-secondary-900 pt-20">
      {carouselSlides.map((slide, index) => (
        <div
          key={slide.slug}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000',
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          )}
        >
          <Image
            src={slide.coverImage}
            alt={slide.name}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/42 to-black/18" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#f7f1e8] via-[#f7f1e8]/70 to-transparent" />

      <div className="container-main relative z-10 flex min-h-[740px] items-center py-12">
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1.08fr)_460px] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-accent" />
              Curated China routes built from real guide packages
            </div>

            <h1 className="mt-7 max-w-4xl text-balance font-serif text-5xl font-bold leading-[0.98] text-white drop-shadow-xl sm:text-6xl lg:text-7xl">
              See China through routes worth planning around.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/86 drop-shadow">
              Browse mountain loops, heritage corridors, food cities, livestream landmarks, and nature escapes with free previews and full guide unlocks.
            </p>

            <div className="mt-9 flex max-w-2xl flex-col gap-3 rounded-[26px] border border-white/20 bg-white/96 p-3 shadow-2xl shadow-black/25 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-secondary-400" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search Beijing, Zhangjiajie, Guilin, Silk Road..."
                  className="w-full rounded-2xl bg-stone-50 dark:bg-secondary-800 py-4 pl-12 pr-4 text-secondary-900 dark:text-white outline-none transition focus:bg-white focus:ring-2 focus:ring-primary/25"
                />
              </div>
              <Link
                href={bookHref}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-sm font-bold text-white shadow-lg shadow-primary/25 transition hover:bg-primary-700"
              >
                Find bookings
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-white/70">Popular:</span>
              {popularSearches.slice(0, 6).map((term) => (
                <Link
                  key={term}
                  href={`/book?q=${encodeURIComponent(term)}`}
                  className="rounded-full border border-white/20 bg-white/14 px-3 py-1.5 text-sm font-semibold text-white/90 backdrop-blur-md transition hover:bg-white/25"
                >
                  {term}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="overflow-hidden rounded-[30px] border border-white/24 bg-white/92 shadow-2xl shadow-black/25 backdrop-blur-xl"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={currentSlide.coverImage}
                alt={currentSlide.name}
                fill
                sizes="(min-width: 1024px) 460px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              {currentSlide.badge && (
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-secondary-900 dark:text-white shadow-sm">
                  {currentSlide.badge}
                </span>
              )}
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/76">Featured Route</p>
                <h2 className="mt-1 font-serif text-2xl font-bold leading-tight text-white">
                  {currentSlide.name}
                </h2>
              </div>
            </div>

            <div className="p-5">
              <div className="flex flex-wrap gap-2 text-sm text-secondary-600 dark:text-secondary-300">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1.5">
                  <MapPin className="h-4 w-4 text-primary" />
                  {currentSlide.destination}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1.5">
                  <CalendarDays className="h-4 w-4 text-jade" />
                  {currentSlide.duration}
                </span>
              </div>
              <p className="mt-4 line-clamp-3 text-sm leading-6 text-secondary-600 dark:text-secondary-300">
                {currentSlide.shortDescription}
              </p>
              <Link
                href={`/packages/${currentSlide.slug}`}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-secondary-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-primary"
              >
                View this package
                <ArrowRight className="h-4 w-4" />
              </Link>

              <div className="mt-5 grid grid-cols-5 gap-2">
                {carouselSlides.slice(0, 10).map((slide, index) => (
                  <button
                    key={slide.slug}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Show ${slide.name}`}
                    className={cn(
                      'relative aspect-square overflow-hidden rounded-xl ring-2 transition',
                      index === currentIndex ? 'ring-primary' : 'ring-transparent opacity-75 hover:opacity-100'
                    )}
                  >
                    <Image
                      src={slide.coverImage}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

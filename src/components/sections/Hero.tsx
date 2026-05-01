'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Search } from 'lucide-react';
import { heroImages, heroStats, popularSearches } from '@/data/content';

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const destinationHref = useMemo(
    () => `/destinations${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`,
    [searchQuery]
  );

  return (
    <section className="relative min-h-[780px] overflow-hidden">
      {heroImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image src={image} alt="China travel hero" fill priority={index === 0} className="object-cover" />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-br from-[#07101a]/90 via-[#0f1d2b]/78 to-[#1d1408]/68" />

      {/* Decorative circles */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
        className="decorative-circle pointer-events-none absolute -left-32 top-20 h-96 w-96"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.8, repeat: Infinity, repeatType: 'reverse', delay: 0.3 }}
        className="decorative-circle pointer-events-none absolute -right-20 bottom-20 h-80 w-80"
      />

      <div className="container-main relative z-10 flex min-h-[780px] items-center py-28">
        <div className="grid w-full gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 glass px-4 py-2"
            >
              <Compass className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-white/90">Designed for overseas visitors exploring China</span>
            </motion.div>

            <h1 className="max-w-4xl text-balance text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
              Build a China trip that feels{' '}
              <span className="gradient-text">inspiring</span>, realistic, and easy to act on.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Discover gateway cities, heritage routes, nature escapes, entry planning advice, and travel tools in one polished inbound-tourism experience.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-10 flex max-w-2xl flex-col gap-3 rounded-[28px] border border-white/10 bg-white/95 p-3 shadow-2xl sm:flex-row"
            >
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-secondary-400" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search Beijing, Shanghai, pandas, Great Wall..."
                  className="w-full rounded-2xl bg-secondary-50 py-4 pl-12 pr-4 text-secondary-900 outline-none ring-0"
                />
              </div>
              <Link href={destinationHref} className="btn-primary gap-2 whitespace-nowrap">
                Explore Routes
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-5 flex flex-wrap items-center gap-2"
            >
              <span className="text-sm text-white/55">Popular:</span>
              {popularSearches.map((term) => (
                <Link
                  key={term}
                  href={`/destinations?q=${encodeURIComponent(term)}`}
                  className="rounded-full border border-white/15 glass px-3 py-1.5 text-sm text-white/85 transition-colors hover:bg-white/20"
                >
                  {term}
                </Link>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="rounded-[32px] border border-white/10 glass p-6"
          >
            <p className="text-sm uppercase tracking-[0.25em] text-white/55">Why this launch matters</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {heroStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  className="rounded-3xl bg-black/20 p-5 backdrop-blur-md"
                >
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="mt-2 text-sm text-white/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-6 rounded-3xl bg-[#f7f1e8] p-5 text-secondary-900"
            >
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-secondary-500">Launch framing</p>
              <p className="mt-3 text-base leading-7">
                This MVP is structured to grow from a high-end content site into a conversion-ready tourism platform with APIs, guides, and future booking or CRM workflows.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone-950 to-transparent" />
    </section>
  );
}

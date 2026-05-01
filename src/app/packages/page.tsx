'use client';

import { motion } from 'framer-motion';
import { BookOpen, Clock, Star, MapPin, Check, FileText, Lightbulb, Coffee, Home, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { pricingPackages } from '@/data/packages';

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-[#f7f1e8]">
      {/* Navigation spacer */}
      <div className="h-20" />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-stone-50 to-amber-50 py-20">
        {/* Decorative elements */}
        <div className="absolute -left-16 top-8 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-16 bottom-8 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 rounded-full bg-jade/5 blur-3xl" />

        <div className="container-main relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm font-medium">Travel Guide Packages</span>
            </div>
            <h1 className="text-5xl font-bold text-secondary-900 md:text-6xl">
              Expert-curated <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">travel guides</span> for your China journey
            </h1>
            <p className="mt-6 text-lg text-secondary-600">
              KOL-verified itineraries with detailed day-by-day plans, insider tips, restaurant recommendations, and accommodation suggestions. Travel like a local.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="container-main py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-secondary-900">Choose your travel guide</h2>
          <p className="mt-3 text-secondary-600">Each guide includes detailed itineraries, local tips, and restaurant recommendations</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {pricingPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Link href={`/packages/${pkg.slug}`} className="group block h-full">
                <article className="h-full overflow-hidden rounded-[28px] bg-white shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/10 border border-black/5">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={pkg.image}
                      alt={pkg.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                    {/* Badges */}
                    <div className="absolute left-4 top-4 flex flex-col gap-2">
                      {pkg.badge && (
                        <div className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-secondary-900 shadow-sm">
                          {pkg.badge}
                        </div>
                      )}
                      {pkg.popular && (
                        <div className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                          <Sparkles className="h-3 w-3" />
                          Popular
                        </div>
                      )}
                    </div>

                    {/* Price tag on image */}
                    <div className="absolute bottom-4 right-4 rounded-2xl bg-white/95 px-4 py-2 shadow-lg">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-jade">{pkg.price}</span>
                        {pkg.originalPrice && (
                          <span className="text-sm text-secondary-400 line-through">{pkg.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Destination & Duration */}
                    <div className="mb-3 flex items-center gap-4 text-sm text-secondary-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-primary" />
                        {pkg.destination}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-accent" />
                        {pkg.duration}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="font-serif text-xl font-bold text-secondary-900">{pkg.name}</h3>
                    <p className="mt-1 text-sm text-secondary-600">{pkg.tagline}</p>

                    {/* Features preview */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {pkg.features.slice(0, 3).map((feature) => (
                        <span key={feature} className="rounded-full bg-secondary-100 px-3 py-1 text-xs text-secondary-700">
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* View details link */}
                    <div className="mt-5 flex items-center justify-between border-t border-secondary-100 pt-4">
                      <span className="text-sm font-medium text-secondary-500">
                        {pkg.itinerary?.length || 0} days itinerary
                      </span>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
                        View details
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* What's Included Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 overflow-hidden rounded-[28px] bg-white p-8 shadow-lg shadow-black/5 border border-black/5"
        >
          <h2 className="text-center text-2xl font-bold text-secondary-900">What each guide includes</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start gap-4 rounded-2xl bg-stone-50 p-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-secondary-900">Daily Itineraries</h3>
                <p className="mt-1 text-sm text-secondary-600">Complete day-by-day plans with timing and logistics</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl bg-stone-50 p-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <Lightbulb className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-bold text-secondary-900">Insider Tips</h3>
                <p className="mt-1 text-sm text-secondary-600">Local secrets, crowd-avoiding strategies, photo spots</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl bg-stone-50 p-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-jade/10">
                <Coffee className="h-6 w-6 text-jade" />
              </div>
              <div>
                <h3 className="font-bold text-secondary-900">Food Recommendations</h3>
                <p className="mt-1 text-sm text-secondary-600">Restaurant picks with price ranges and must-tries</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl bg-stone-50 p-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-purple-100">
                <Home className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-secondary-900">Hotel Picks</h3>
                <p className="mt-1 text-sm text-secondary-600">Budget to luxury options in each destination</p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-secondary-100 pt-8">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              <span className="flex items-center gap-2 text-sm text-secondary-600">
                <Check className="h-4 w-4 text-jade" />
                Digital download (PDF/app)
              </span>
              <span className="flex items-center gap-2 text-sm text-secondary-600">
                <Check className="h-4 w-4 text-jade" />
                Lifetime updates included
              </span>
              <span className="flex items-center gap-2 text-sm text-secondary-600">
                <Check className="h-4 w-4 text-jade" />
                WeChat support access
              </span>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
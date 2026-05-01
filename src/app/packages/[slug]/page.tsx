'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Clock, MapPin, Check, X, ArrowLeft, Star, Sun, Utensils, Home, AlertCircle, CalendarDays, Camera, Lightbulb, FileText } from 'lucide-react';
import { pricingPackages } from '@/data/packages';

export default function PackageDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const pkg = pricingPackages.find((p) => p.slug === slug);

  if (!pkg) {
    return (
      <div className="min-h-screen bg-[#f7f1e8] pt-20">
        <div className="container-main py-20 text-center">
          <h1 className="text-2xl font-bold text-secondary-900">Package not found</h1>
          <Link href="/packages" className="btn-primary mt-6 inline-block">
            Back to Packages
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f1e8]">
      {/* Navigation spacer */}
      <div className="h-20" />

      {/* Hero Section */}
      <section className="relative h-[450px] overflow-hidden">
        <Image src={pkg.image} alt={pkg.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

        <div className="container-main relative h-full">
          <Link
            href="/packages"
            className="absolute left-4 top-8 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-secondary-900 shadow-sm transition-colors hover:bg-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Guides
          </Link>

          <div className="absolute bottom-12 left-4 right-4">
            <div className="flex flex-wrap gap-3">
              {pkg.badge && (
                <div className="rounded-full bg-white/95 px-4 py-1 text-sm font-bold text-secondary-900 shadow-sm">
                  {pkg.badge}
                </div>
              )}
              {pkg.popular && (
                <div className="flex items-center gap-1 rounded-full bg-primary px-4 py-1 text-sm font-bold text-white">
                  <Star className="h-3 w-3 fill-white" />
                  Popular
                </div>
              )}
              <div className="flex items-center gap-1 rounded-full bg-white/90 px-4 py-1 text-sm font-medium text-secondary-900 shadow-sm">
                <Clock className="h-4 w-4" />
                {pkg.duration}
              </div>
              <div className="flex items-center gap-1 rounded-full bg-white/90 px-4 py-1 text-sm font-medium text-secondary-900 shadow-sm">
                <MapPin className="h-4 w-4 text-primary" />
                {pkg.destination}
              </div>
            </div>

            <h1 className="mt-6 text-4xl font-bold text-white md:text-5xl">{pkg.name}</h1>
            <p className="mt-3 text-xl text-white/90">{pkg.tagline}</p>
          </div>
        </div>
      </section>

      <section className="container-main py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-hidden rounded-[28px] bg-white p-8 shadow-lg shadow-black/5 border border-black/5"
            >
              <h2 className="text-xl font-bold text-secondary-900">About this guide</h2>
              <p className="mt-4 leading-relaxed text-secondary-700">{pkg.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {pkg.features.map((feature) => (
                  <span key={feature} className="rounded-full bg-stone-100 px-3 py-1 text-sm text-secondary-700">
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Itinerary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="overflow-hidden rounded-[28px] bg-white p-8 shadow-lg shadow-black/5 border border-black/5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <CalendarDays className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-secondary-900">Day-by-Day Itinerary</h2>
              </div>

              <div className="mt-6 space-y-6">
                {pkg.itinerary?.map((day) => (
                  <div key={day.day} className="relative pl-10">
                    {/* Timeline line */}
                    <div className="absolute left-4 top-2 h-full w-px bg-secondary-200" />
                    <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-md shadow-primary/30">
                      {day.day}
                    </div>

                    <div className="rounded-2xl border border-secondary-200 bg-stone-50 p-5">
                      <h3 className="font-bold text-secondary-900">{day.title}</h3>

                      {/* Highlights */}
                      <div className="mt-3">
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
                          <Camera className="h-4 w-4" />
                          Highlights
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {day.highlights.map((highlight) => (
                            <span key={highlight} className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Tips */}
                      <div className="mt-3">
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-jade">
                          <Lightbulb className="h-4 w-4" />
                          Pro Tips
                        </div>
                        <ul className="space-y-1">
                          {day.tips.map((tip) => (
                            <li key={tip} className="text-sm text-secondary-700">
                              • {tip}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Meals & Accommodation */}
                      {(day.meals || day.accommodation) && (
                        <div className="mt-4 flex flex-wrap gap-4 border-t border-secondary-200 pt-4">
                          {day.meals && day.meals !== 'N/A' && (
                            <div className="flex items-center gap-2 text-sm text-secondary-600">
                              <Utensils className="h-4 w-4 text-accent" />
                              {day.meals}
                            </div>
                          )}
                          {day.accommodation && day.accommodation !== 'N/A - departure day' && day.accommodation !== 'N/A' && (
                            <div className="flex items-center gap-2 text-sm text-secondary-600">
                              <Home className="h-4 w-4 text-jade" />
                              {day.accommodation}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hotel Recommendations */}
            {pkg.hotelRecommendations && pkg.hotelRecommendations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="overflow-hidden rounded-[28px] bg-white p-8 shadow-lg shadow-black/5 border border-black/5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
                    <Home className="h-5 w-5 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-secondary-900">Recommended Hotels</h2>
                </div>

                <div className="mt-6 space-y-4">
                  {pkg.hotelRecommendations.map((hotel) => (
                    <div key={hotel} className="flex items-start gap-4 rounded-2xl border border-secondary-200 bg-stone-50 p-4">
                      <Check className="mt-1 h-5 w-5 flex-shrink-0 text-jade" />
                      <span className="text-secondary-700">{hotel}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Important Notes */}
            {pkg.importantNotes && pkg.importantNotes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="overflow-hidden rounded-[28px] border border-primary/30 bg-primary/5 p-8"
              >
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-bold text-secondary-900">Important Notes</h2>
                </div>

                <ul className="mt-6 space-y-3">
                  {pkg.importantNotes.map((note) => (
                    <li key={note} className="flex items-start gap-3 text-secondary-700">
                      <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      {note}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Purchase Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-hidden rounded-[28px] bg-white p-6 shadow-xl shadow-black/10 border border-black/5"
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-jade">{pkg.price}</span>
                  {pkg.originalPrice && (
                    <span className="text-xl text-secondary-400 line-through">{pkg.originalPrice}</span>
                  )}
                </div>

                {pkg.originalPrice && (
                  <div className="mt-1 text-sm font-medium text-jade">
                    Save ${parseInt(pkg.originalPrice.replace('$', '')) - parseInt(pkg.price.replace('$', ''))}
                  </div>
                )}

                <button className="btn-primary mt-6 w-full text-lg">
                  Purchase Guide
                </button>

                <div className="mt-6 space-y-3 text-sm text-secondary-600">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-jade" />
                    Instant digital delivery
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-jade" />
                    Lifetime updates included
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-jade" />
                    WeChat support access
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-jade" />
                    PDF & mobile app format
                  </div>
                </div>
              </motion.div>

              {/* Includes/Excludes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="overflow-hidden rounded-[28px] bg-white p-6 shadow-lg shadow-black/5 border border-black/5"
              >
                <h3 className="font-bold text-secondary-900">What&apos;s included</h3>
                <ul className="mt-4 space-y-2">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-secondary-700">
                      <Check className="h-4 w-4 text-jade" />
                      {item}
                    </li>
                  ))}
                </ul>

                <h3 className="mt-6 font-bold text-secondary-900">Not included</h3>
                <ul className="mt-4 space-y-2">
                  {pkg.exclude.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-secondary-500">
                      <X className="h-4 w-4 text-red-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
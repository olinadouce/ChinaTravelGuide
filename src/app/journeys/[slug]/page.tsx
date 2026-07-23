import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock3, MapPinned, Sparkles } from 'lucide-react';
import { destinations, journeys } from '@/data/content';

export function generateStaticParams() {
  return journeys.map((journey) => ({ slug: journey.slug }));
}

export default async function JourneyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const journey = journeys.find((item) => item.slug === slug);

  if (!journey) {
    notFound();
  }

  const stops = journey.includedDestinations
    .map((id) => destinations.find((destination) => destination.id === id))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-[#f7f1e8] dark:bg-[#0b1220] pt-16">
      <section className="relative min-h-[440px] overflow-hidden">
        <Image src={journey.image} alt={journey.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="container-main relative z-10 flex min-h-[440px] flex-col justify-end py-12 text-white">
          <Link href="/journeys" className="mb-8 inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to journeys
          </Link>
          <div className="max-w-4xl">
            <div className="mb-4 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm">{journey.theme}</span>
              <span className="rounded-full bg-primary px-4 py-1.5 text-sm">{journey.difficulty}</span>
            </div>
            <h1 className="text-5xl font-bold">{journey.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78">{journey.description}</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-main grid gap-10 lg:grid-cols-[1fr_0.85fr]">
          <div className="space-y-8">
            <div className="rounded-[32px] bg-white dark:bg-secondary-900 p-8 shadow-sm">
              <div className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-secondary-500 dark:text-secondary-400">
                <Sparkles className="h-4 w-4 text-accent" />
                Overview
              </div>
              <h2 className="mt-4 text-3xl font-bold text-secondary-900 dark:text-white">What this route delivers</h2>
              <p className="mt-4 leading-8 text-secondary-700 dark:text-secondary-200">{journey.highlights.join(' 鈥?')}</p>
            </div>

            <div className="rounded-[32px] bg-white dark:bg-secondary-900 p-8 shadow-sm">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white">Suggested flow</h2>
              <div className="mt-6 space-y-4">
                {journey.itinerary.map((item, index) => (
                  <div key={item} className="flex gap-4 rounded-3xl bg-secondary-50 p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                      {index + 1}
                    </div>
                    <p className="leading-7 text-secondary-700 dark:text-secondary-200">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] bg-secondary-900 p-8 text-white shadow-xl">
              <div className="flex items-center gap-3">
                <Clock3 className="h-5 w-5 text-accent" />
                <p className="text-lg font-semibold">{journey.duration} days</p>
              </div>
              <p className="mt-4 text-sm text-white/65">Indicative package range</p>
              <p className="mt-1 text-3xl font-bold">{journey.price}</p>
            </div>

            <div className="rounded-[32px] bg-white dark:bg-secondary-900 p-8 shadow-sm">
              <div className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-secondary-500 dark:text-secondary-400">
                <MapPinned className="h-4 w-4 text-primary" />
                Included stops
              </div>
              <div className="mt-5 space-y-4">
                {stops.map((stop) =>
                  stop ? (
                    <Link key={stop.id} href={`/destinations/${stop.slug}`} className="block rounded-3xl bg-secondary-50 p-5 transition-colors hover:bg-secondary-100">
                      <p className="font-semibold text-secondary-900 dark:text-white">{stop.name}</p>
                      <p className="mt-2 text-sm leading-7 text-secondary-600 dark:text-secondary-300">{stop.shortDescription}</p>
                    </Link>
                  ) : null
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

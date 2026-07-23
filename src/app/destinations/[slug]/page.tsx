import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CalendarDays, Globe2, PlaneTakeoff, Star } from 'lucide-react';
import JourneyCard from '@/components/ui/JourneyCard';
import { destinations, journeys } from '@/data/content';
import { formatNumber } from '@/lib/utils';

export function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.slug }));
}

export default async function DestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = destinations.find((item) => item.slug === slug);

  if (!destination) {
    notFound();
  }

  const relatedJourneys = journeys.filter((journey) => journey.includedDestinations.includes(destination.id));

  return (
    <div className="min-h-screen bg-[#f7f1e8] dark:bg-[#0b1220] pt-16">
      <section className="relative min-h-[520px] overflow-hidden">
        <Image src={destination.images[0]} alt={destination.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
        <div className="container-main relative z-10 flex min-h-[520px] flex-col justify-end py-12 text-white">
          <Link href="/destinations" className="mb-8 inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to destinations
          </Link>

          <div className="max-w-4xl">
            <div className="mb-4 flex flex-wrap gap-3">
              <span className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium capitalize">{destination.region} China</span>
              <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm">
                <Star className="h-4 w-4 fill-accent text-accent" />
                {destination.rating} 路 {formatNumber(destination.reviewCount)} traveler signals
              </span>
            </div>
            <h1 className="text-5xl font-bold">{destination.name}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78">{destination.description}</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-main grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-10">
            <div className="rounded-[32px] bg-white dark:bg-secondary-900 p-8 shadow-sm">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white">Why travelers choose {destination.name}</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {destination.highlights.map((highlight) => (
                  <div key={highlight} className="rounded-3xl bg-secondary-50 p-4 text-secondary-700 dark:text-secondary-200">
                    {highlight}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] bg-white dark:bg-secondary-900 p-8 shadow-sm">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white">Must-see experiences</h2>
              <div className="mt-6 space-y-4">
                {destination.mustSee.map((item, index) => (
                  <div key={item} className="flex gap-4 rounded-3xl bg-secondary-50 p-5">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                      {index + 1}
                    </div>
                    <p className="leading-7 text-secondary-700 dark:text-secondary-200">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {relatedJourneys.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white">Journeys that include this stop</h2>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  {relatedJourneys.map((journey, index) => (
                    <JourneyCard key={journey.id} journey={journey} index={index} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] bg-secondary-900 p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold">Quick planning facts</h3>
              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-1 h-5 w-5 text-accent" />
                  <div>
                    <p className="text-sm text-white/55">Best season</p>
                    <p>{destination.bestTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <PlaneTakeoff className="mt-1 h-5 w-5 text-accent" />
                  <div>
                    <p className="text-sm text-white/55">Arrival hub</p>
                    <p>{destination.practicalInfo.airport}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe2 className="mt-1 h-5 w-5 text-accent" />
                  <div>
                    <p className="text-sm text-white/55">Language and currency</p>
                    <p>{destination.practicalInfo.language} 路 {destination.practicalInfo.currency}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] bg-white dark:bg-secondary-900 p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-secondary-900 dark:text-white">Trip fit</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {destination.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-secondary-100 dark:bg-secondary-800 px-3 py-1 text-sm text-secondary-700 dark:text-secondary-200">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 rounded-3xl bg-[#f7f1e8] dark:bg-[#0b1220] p-5">
                <p className="text-sm text-secondary-500 dark:text-secondary-400">Suggested stay</p>
                <p className="mt-1 text-xl font-semibold text-secondary-900 dark:text-white">{destination.practicalInfo.idealStay}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

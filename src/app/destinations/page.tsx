'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, Search } from 'lucide-react';
import DestinationCard from '@/components/ui/DestinationCard';
import { destinations } from '@/data/content';
import { cn } from '@/lib/utils';

const regions = [
  { id: 'all', label: 'All' },
  { id: 'north', label: 'North' },
  { id: 'east', label: 'East' },
  { id: 'west', label: 'West' },
  { id: 'south', label: 'South' },
];

export default function DestinationsPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedRegion, setSelectedRegion] = useState('all');

  const filteredDestinations = useMemo(
    () =>
      destinations.filter((destination) => {
        const matchesQuery =
          !searchQuery ||
          destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          destination.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          destination.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesRegion = selectedRegion === 'all' || destination.region === selectedRegion;
        return matchesQuery && matchesRegion;
      }),
    [searchQuery, selectedRegion]
  );

  return (
    <div className="min-h-screen bg-[#f7f1e8] pt-20">
      <section className="bg-secondary-900 py-20 text-white">
        <div className="container-main">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm uppercase tracking-[0.24em] text-white/55">Destination library</p>
            <h1 className="text-5xl font-bold">Choose cities and regions that fit how international travelers actually move.</h1>
            <p className="mt-6 text-lg leading-8 text-white/75">
              Browse gateway cities, scenic extensions, and high-value stops that can shape first-time and repeat China trips.
            </p>
          </div>
        </div>
      </section>

      <section className="sticky top-16 z-20 border-b border-secondary-200 bg-[#f7f1e8]/95 py-5 backdrop-blur">
        <div className="container-main flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-xl flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-secondary-400" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by city, theme, or experience"
              className="input-field pl-12"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-secondary-500" />
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region.id)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  selectedRegion === region.id ? 'bg-primary text-white' : 'bg-white text-secondary-700 hover:bg-secondary-100'
                )}
              >
                {region.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-main">
          <p className="mb-6 text-sm text-secondary-500">{filteredDestinations.length} destinations matched</p>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredDestinations.map((destination, index) => (
              <DestinationCard key={destination.id} destination={destination} index={index} featured={index === 0} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

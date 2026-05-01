'use client';

import { useMemo, useState } from 'react';
import JourneyCard from '@/components/ui/JourneyCard';
import { journeys } from '@/data/content';
import { cn } from '@/lib/utils';

const themes = ['all', 'history', 'city', 'food', 'nature', 'culture'];
const levels = ['all', 'easy', 'moderate', 'challenging'];

export default function JourneysPage() {
  const [selectedTheme, setSelectedTheme] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const filtered = useMemo(
    () =>
      journeys.filter((journey) => {
        const matchesTheme = selectedTheme === 'all' || journey.theme.toLowerCase().includes(selectedTheme);
        const matchesDifficulty = selectedDifficulty === 'all' || journey.difficulty === selectedDifficulty;
        return matchesTheme && matchesDifficulty;
      }),
    [selectedDifficulty, selectedTheme]
  );

  return (
    <div className="min-h-screen bg-[#f7f1e8] pt-20">
      <section className="bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary py-20 text-white">
        <div className="container-main max-w-4xl">
          <p className="mb-4 text-sm uppercase tracking-[0.24em] text-white/55">Route planning</p>
          <h1 className="text-5xl font-bold">Sample itineraries that prove the site can move from dream stage to planning stage.</h1>
          <p className="mt-6 text-lg leading-8 text-white/75">
            Use curated journey pages to package cities into understandable products, themes, or campaign landing routes.
          </p>
        </div>
      </section>

      <section className="border-b border-secondary-200 bg-white py-6">
        <div className="container-main space-y-4">
          <div className="flex flex-wrap gap-2">
            {themes.map((theme) => (
              <button
                key={theme}
                onClick={() => setSelectedTheme(theme)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  selectedTheme === theme ? 'bg-primary text-white' : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                )}
              >
                {theme === 'all' ? 'All themes' : theme}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedDifficulty(level)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  selectedDifficulty === level ? 'bg-secondary-900 text-white' : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                )}
              >
                {level === 'all' ? 'All difficulty' : level}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-main">
          <div className="grid gap-6 lg:grid-cols-3">
            {filtered.map((journey, index) => (
              <JourneyCard key={journey.id} journey={journey} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { travelTools } from '@/data/content';

export function generateStaticParams() {
  return travelTools
    .filter((tool) => !['currency', 'phrases'].includes(tool.slug))
    .map((tool) => ({ slug: tool.slug }));
}

const toolGuides: Record<string, { headline: string; details: string[] }> = {
  timezone: {
    headline: 'China runs on one national time zone, which is useful for trip planning but can still hit long-haul travelers hard on arrival.',
    details: [
      'Schedule the first day lightly and avoid tight domestic transfers if possible.',
      'Use meal timing and daylight exposure to reset more quickly after arrival.',
      'For multi-city routes, China鈥檚 single time standard keeps internal travel simple once visitors land.',
    ],
  },
  distance: {
    headline: 'Strong route planning depends on understanding how China鈥檚 scale affects day count, transport choice, and traveler energy.',
    details: [
      'High-speed rail works best on shorter city pairs with strong central station access.',
      'Cross-country jumps often justify flying even in premium leisure itineraries.',
      'A site like this can later turn these guide blocks into real calculators or route planners.',
    ],
  },
};

export default async function ToolGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = travelTools.find((item) => item.slug === slug);
  const guide = toolGuides[slug];

  if (!tool || !guide) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f7f1e8] dark:bg-[#0b1220] pt-20">
      <section className="bg-white dark:bg-secondary-900 py-16">
        <div className="container-main max-w-4xl">
          <Link href="/tools" className="mb-6 inline-flex items-center gap-2 text-sm text-secondary-500 dark:text-secondary-400 hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to tools
          </Link>
          <p className="text-sm uppercase tracking-[0.24em] text-secondary-500 dark:text-secondary-400">Guide tool</p>
          <h1 className="mt-4 text-5xl font-bold text-secondary-900 dark:text-white">{tool.title}</h1>
          <p className="mt-6 text-lg leading-8 text-secondary-700 dark:text-secondary-200">{guide.headline}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-main max-w-4xl rounded-[32px] bg-secondary-900 p-8 text-white shadow-xl">
          <div className="space-y-4">
            {guide.details.map((detail, index) => (
              <div key={detail} className="flex gap-4 rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 font-semibold text-accent">
                  {index + 1}
                </div>
                <p className="leading-7 text-white/78">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

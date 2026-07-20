import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, FileCheck2 } from 'lucide-react';
import { practicalGuides } from '@/data/content';
import { getGuideBySlug } from '@/lib/content';
import RichBlocks, { guideIconMap } from '@/components/ui/RichBlocks';
import type { LucideIcon } from 'lucide-react';

export function generateStaticParams() {
  return practicalGuides.map((guide) => ({ slug: guide.slug }));
}

const accentClassMap: Record<string, string> = {
  primary: 'bg-primary/10 text-primary',
  accent: 'bg-accent/10 text-accent',
  jade: 'bg-emerald-500/10 text-emerald-600',
  secondary: 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-200',
};

export default function PracticalGuidePage({ params }: { params: { slug: string } }) {
  const guide = getGuideBySlug(params.slug);

  if (!guide) {
    notFound();
  }

  const Icon: LucideIcon = guideIconMap[guide.icon] ?? FileCheck2;
  const iconWrap = accentClassMap[guide.accent] ?? accentClassMap.secondary;

  return (
    <div className="min-h-screen bg-[#f7f1e8] dark:bg-[#0b1220] pt-20">
      <section className="bg-white dark:bg-secondary-900 py-14">
        <div className="container-main max-w-4xl">
          <Link
            href="/practical-info"
            className="mb-6 inline-flex items-center gap-2 text-sm text-secondary-500 dark:text-secondary-400 hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to practical info
          </Link>
          <div className="mb-6 flex items-center gap-4">
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconWrap}`}>
              <Icon className="h-7 w-7" />
            </div>
            <span className="rounded-full bg-secondary-50 px-3 py-1 text-xs uppercase tracking-[0.16em] text-secondary-500 dark:text-secondary-400">
              {guide.readMinutes} min read
            </span>
          </div>
          <p className="text-sm uppercase tracking-[0.24em] text-secondary-500 dark:text-secondary-400">Guide module</p>
          <h1 className="mt-3 text-5xl font-bold text-secondary-900 dark:text-white">{guide.title}</h1>
          <p className="mt-6 text-lg leading-8 text-secondary-700 dark:text-secondary-200">{guide.summary}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-main max-w-4xl">
          <div className="rounded-[32px] bg-white dark:bg-secondary-900 p-8 shadow-sm sm:p-10">
            <RichBlocks blocks={guide.body} />
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-main max-w-4xl">
          <div className="rounded-[32px] bg-secondary-900 p-8 text-white shadow-xl sm:p-10">
            <h2 className="text-3xl font-bold">Traveler questions</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {guide.faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5"
                >
                  <p className="font-semibold">{faq.question}</p>
                  <p className="mt-3 text-sm leading-7 text-white/72">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

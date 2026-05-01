import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { practicalGuides } from '@/data/content';

export function generateStaticParams() {
  return practicalGuides.map((guide) => ({ slug: guide.slug }));
}

export default function PracticalGuidePage({ params }: { params: { slug: string } }) {
  const guide = practicalGuides.find((item) => item.slug === params.slug);

  if (!guide) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f7f1e8] pt-20">
      <section className="bg-white py-14">
        <div className="container-main max-w-4xl">
          <Link href="/practical-info" className="mb-6 inline-flex items-center gap-2 text-sm text-secondary-500 hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to practical info
          </Link>
          <p className="text-sm uppercase tracking-[0.24em] text-secondary-500">Guide module</p>
          <h1 className="mt-4 text-5xl font-bold text-secondary-900">{guide.title}</h1>
          <p className="mt-6 text-lg leading-8 text-secondary-700">{guide.summary}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-main grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-[32px] bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-secondary-900">Planning checklist</h2>
            <div className="mt-6 space-y-4">
              {guide.points.map((point, index) => (
                <div key={point} className="flex gap-4 rounded-3xl bg-secondary-50 p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                    {index + 1}
                  </div>
                  <p className="leading-7 text-secondary-700">{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] bg-secondary-900 p-8 text-white shadow-xl">
            <h2 className="text-3xl font-bold">Traveler questions</h2>
            <div className="mt-6 space-y-5">
              {guide.faqs.map((faq) => (
                <div key={faq.question} className="rounded-3xl border border-white/10 bg-white/5 p-5">
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

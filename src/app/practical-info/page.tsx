import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { practicalGuides } from '@/data/content';

export default function PracticalInfoPage() {
  return (
    <div className="min-h-screen bg-[#f7f1e8] pt-20">
      <section className="bg-secondary-900 py-20 text-white">
        <div className="container-main max-w-4xl">
          <p className="mb-4 text-sm uppercase tracking-[0.24em] text-white/55">Practical information</p>
          <h1 className="text-5xl font-bold">Reduce uncertainty before travelers arrive.</h1>
          <p className="mt-6 text-lg leading-8 text-white/75">
            Entry prep, transport planning, payment readiness, and digital essentials are often what make or break an overseas visitor’s confidence.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-main grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {practicalGuides.map((guide) => (
            <Link key={guide.slug} href={`/practical-info/${guide.slug}`} className="group rounded-[28px] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <h2 className="text-2xl font-bold text-secondary-900">{guide.title}</h2>
              <p className="mt-4 text-sm leading-7 text-secondary-600">{guide.summary}</p>
              <ul className="mt-5 space-y-2 text-sm text-secondary-500">
                {guide.points.slice(0, 3).map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
                Open guide
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

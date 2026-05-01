import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { travelTools } from '@/data/content';

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-[#f7f1e8] pt-20">
      <section className="bg-gradient-to-br from-secondary-900 via-secondary-800 to-accent py-20 text-white">
        <div className="container-main max-w-4xl">
          <p className="mb-4 text-sm uppercase tracking-[0.24em] text-white/55">Planning tools</p>
          <h1 className="text-5xl font-bold">Utilities that make the platform feel useful, not just beautiful.</h1>
          <p className="mt-6 text-lg leading-8 text-white/75">
            These modules help travelers estimate budgets, prepare language basics, and understand route or timing tradeoffs.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-main grid gap-6 md:grid-cols-2">
          {travelTools.map((tool) => (
            <Link key={tool.slug} href={tool.href} className="group rounded-[28px] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-secondary-900">{tool.title}</h2>
                <span className="rounded-full bg-secondary-100 px-3 py-1 text-xs uppercase tracking-[0.18em] text-secondary-600">{tool.status}</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-secondary-600">{tool.description}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
                Open tool
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

import Link from 'next/link';
import { ArrowRight, Wrench } from 'lucide-react';
import { travelTools } from '@/data/content';

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-[#f7f1e8] dark:bg-[#0b1220]">
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-stone-50 to-amber-50 py-20 transition-colors duration-300 dark:from-[#111827] dark:via-[#0b1220] dark:to-[#172033]">
        <div className="absolute -left-16 top-8 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-16 bottom-8 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 rounded-full bg-jade/5 blur-3xl" />
        <div className="container-main relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary">
              <Wrench className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm font-medium">Travel Tools</span>
            </div>
            <h1 className="text-5xl font-bold text-secondary-900 dark:text-white md:text-6xl">
              Practical tools for{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                smarter travel
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-secondary-600 dark:text-secondary-300">
              These modules help travelers estimate budgets, prepare language basics, and understand route or timing tradeoffs.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
              {[`${travelTools.length} useful tools`, 'Fast planning help', 'Built for China travel'].map((label) => (
                <span key={label} className="rounded-full bg-white/80 px-3 py-1.5 font-medium text-secondary-700 shadow-sm dark:bg-secondary-800/80 dark:text-secondary-200">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-main grid gap-6 md:grid-cols-2">
          {travelTools.map((tool) => (
            <Link key={tool.slug} href={tool.href} className="group rounded-[28px] bg-white dark:bg-secondary-900 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">{tool.title}</h2>
                <span className="rounded-full bg-secondary-100 dark:bg-secondary-800 px-3 py-1 text-xs uppercase tracking-[0.18em] text-secondary-600 dark:text-secondary-300">{tool.status}</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-secondary-600 dark:text-secondary-300">{tool.description}</p>
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

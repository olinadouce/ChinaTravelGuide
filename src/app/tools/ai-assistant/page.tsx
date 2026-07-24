import Link from 'next/link';
import { ArrowLeft, Bot, ShieldCheck, Sparkles } from 'lucide-react';

import { AITravelAssistant } from '@/components/ai/AITravelAssistant';

export default function AIAssistantToolPage() {
  return (
    <main className="min-h-screen bg-[#f7f1e8] pb-16 pt-20 text-black">
      <section className="border-b border-black/10 py-12">
        <div className="container-main max-w-6xl">
          <Link
            href="/tools"
            className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-black hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to tools
          </Link>

          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/60 px-4 py-2 text-sm font-semibold">
                <Bot className="h-4 w-4" />
                AI Travel Assistant
              </div>
              <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
                Plan your China trip with our guide-trained AI
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 md:text-lg">
                Ask about routes, attractions, accommodation, food and transport. Answers are
                grounded in the travel guides published on this website.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm font-semibold">
              <span className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Guide-based answers
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Access-aware
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="container-main max-w-6xl py-10">
        <AITravelAssistant mode="page" />
      </section>
    </main>
  );
}

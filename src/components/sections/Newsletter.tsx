'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Send } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#f7f1e8] dark:bg-[#0b1220] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(220,38,38,0.08),transparent_32%),radial-gradient(circle_at_82%_80%,rgba(245,158,11,0.12),transparent_30%)]" />

      {/* Decorative elements */}
      <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="container-main relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl rounded-[36px] border border-black/5 dark:border-white/10 bg-white dark:bg-secondary-900 p-10 shadow-2xl shadow-black/8"
        >
          <p className="text-sm uppercase tracking-[0.24em] text-primary">CRM-ready module</p>
          <h2 className="mt-4 font-serif text-4xl font-bold text-secondary-900 dark:text-white">Capture interest before travelers are ready to book.</h2>
          <p className="mt-4 max-w-2xl leading-7 text-secondary-600 dark:text-secondary-300">
            This signup block can later connect to an email tool, CRM, or itinerary-consultation funnel. For now it demonstrates the conversion layer of the site.
          </p>

          {!submitted ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (email) {
                  setSubmitted(true);
                  setEmail('');
                }
              }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email for China trip inspiration"
                className="flex-1 rounded-2xl border border-secondary-200 dark:border-secondary-700 bg-stone-50 dark:bg-secondary-800 px-5 py-4 text-secondary-900 dark:text-white placeholder:text-secondary-400 outline-none focus:bg-white focus:ring-2 focus:ring-primary/25"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-accent px-6 py-4 font-semibold text-white shadow-lg shadow-primary/25"
              >
                Subscribe
                <Send className="h-4 w-4" />
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-jade/20 px-5 py-4 text-jade"
            >
              <CheckCircle2 className="h-5 w-5" />
              You now have a conversion-ready signup pattern in place.
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

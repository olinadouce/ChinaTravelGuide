'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Instagram, Mail, Sparkles } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="relative overflow-hidden bg-[#f7f1e8] py-24 dark:bg-[#0b1220]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(220,38,38,0.08),transparent_32%),radial-gradient(circle_at_82%_80%,rgba(245,158,11,0.12),transparent_30%)]" />
      <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="container-main relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto grid max-w-5xl gap-10 rounded-[36px] border border-black/5 bg-white p-8 shadow-2xl shadow-black/8 dark:border-white/10 dark:bg-secondary-900 sm:p-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center lg:p-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-primary">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Private trip planning
            </div>
            <h2 className="mt-4 font-serif text-4xl font-bold text-secondary-900 dark:text-white sm:text-5xl">
              Contact us for a journey designed around you.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-secondary-600 dark:text-secondary-300">
              Need a private, personalized China itinerary? Tell us your travel dates,
              interests, group size, and preferred pace. Our team will help shape a trip
              that fits the way you want to travel.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="mailto:sales@cchinaroute.com?subject=Private%20China%20Itinerary%20Enquiry"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-accent px-6 py-4 font-semibold text-white shadow-lg shadow-primary/25"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email our travel team
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://www.instagram.com/cchinaroute/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-secondary-200 bg-white px-6 py-4 font-semibold text-secondary-800 transition-colors hover:border-primary/30 hover:text-primary dark:border-secondary-700 dark:bg-secondary-800 dark:text-white"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
                @CCHINAROUTE
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </motion.a>
            </div>

            <a
              href="mailto:sales@cchinaroute.com?subject=Private%20China%20Itinerary%20Enquiry"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-secondary-600 transition-colors hover:text-primary dark:text-secondary-300"
            >
              <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
              sales@cchinaroute.com
            </a>
          </div>

          <a
            href="https://www.instagram.com/cchinaroute/"
            target="_blank"
            rel="noopener noreferrer"
            className="group mx-auto block w-full max-w-[300px] rounded-[28px] border border-secondary-100 bg-stone-50 p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-secondary-700 dark:bg-secondary-800"
            aria-label="Open CCHINAROUTE on Instagram"
          >
            <div className="overflow-hidden rounded-2xl bg-white p-2">
              <Image
                src="/images/instagram-cchinaroute-qr.png"
                alt="QR code for CCHINAROUTE on Instagram"
                width={720}
                height={720}
                className="h-auto w-full"
              />
            </div>
            <div className="mt-4 inline-flex items-center gap-2 font-semibold text-secondary-900 transition-colors group-hover:text-primary dark:text-white">
              <Instagram className="h-4 w-4" aria-hidden="true" />
              Scan to connect
            </div>
            <p className="mt-1 text-sm text-secondary-500 dark:text-secondary-400">
              @CCHINAROUTE
            </p>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

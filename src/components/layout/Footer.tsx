'use client';

import Link from 'next/link';
import { Mail, PhoneCall } from 'lucide-react';
import { siteNavigation } from '@/data/content';

export default function Footer() {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-6 inline-flex items-center gap-3" aria-label="seechinaroute home">
              <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-[#f8f4ec] ring-1 ring-white/10">
                <img
                  src="/see-china-route-mark.svg"
                  alt=""
                  className="h-full w-full"
                />
              </span>
              <span>
                <span className="block font-serif text-2xl font-bold leading-tight">seechinaroute</span>
                <span className="block text-xs uppercase tracking-[0.22em] text-secondary-400">See China Route</span>
              </span>
            </Link>

            <p className="mb-7 max-w-xl text-base leading-7 text-secondary-300">
              Plan China with practical guidance, curated travel packages, and trusted booking partners in one place.
            </p>

            <div className="max-w-xl rounded-2xl border border-white/10 bg-white/[0.045] px-5 py-4 sm:px-6 sm:py-5">
              <p className="text-left text-[13px] leading-6 tracking-[0.005em] text-secondary-400 sm:text-sm">
                Some booking links redirect to third-party websites and may be affiliate links. We may receive a commission from eligible bookings at no additional cost to you. Prices, availability, booking terms and service policies are determined by the third-party provider and may change without notice. Please verify all details before booking.
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-primary">Explore</h3>
            <ul className="space-y-3">
              {siteNavigation.slice(1).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-secondary-300 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-primary">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                <a href="mailto:sales@cchinaroute.com" className="text-secondary-300 transition-colors hover:text-white">
                  sales@cchinaroute.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <PhoneCall className="h-5 w-5 flex-shrink-0 text-primary" />
                <a href="tel:+85684971668" className="text-secondary-300 transition-colors hover:text-white">
                  +852 84971668
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-secondary-800 pt-8 md:flex-row">
          <p className="text-sm text-secondary-400">© {new Date().getFullYear()} China Travel Guide. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-secondary-400">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="/contact" className="transition-colors hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

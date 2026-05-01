'use client';

import Link from 'next/link';
import { Mail, MapPin, PhoneCall } from 'lucide-react';
import { siteNavigation } from '@/data/content';

export default function Footer() {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-accent to-jade text-2xl font-bold text-white">
                C
              </div>
              <span className="font-serif text-2xl font-bold">China Travel Guide</span>
            </Link>

            <p className="mb-6 max-w-md text-secondary-300">
              A scalable website foundation for attracting, informing, and converting overseas travelers interested in China.
            </p>

            <div className="max-w-md rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-secondary-300">
                Built as a full-stack MVP with reusable content models and API endpoints for future CMS, booking, and lead-management integration.
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
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-secondary-300">Beijing operations base for inbound travel partnerships and campaign launches.</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                <a href="mailto:hello@chinatravel.guide" className="text-secondary-300 transition-colors hover:text-white">
                  hello@chinatravel.guide
                </a>
              </li>
              <li className="flex items-center gap-3">
                <PhoneCall className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-secondary-300">+86 10 8888 2026</span>
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

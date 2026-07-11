'use client';

import { Lock, Check } from 'lucide-react';

import type { ClientPackage } from '@/data/packages';
import { useAuth } from '@/components/auth/MockAuthProvider';
import { UnlockPanel } from './UnlockPanel';

interface PaidIframeGateProps {
  pkg: ClientPackage;
  paidUrl: string;
}

/**
 * Renders the paid packet HTML inside an <iframe src=...> only when the user
 * is signed in AND has redeemed enough points to unlock this package.
 *
 * When locked, shows the unlock panel + a "locked" placeholder card so the
 * URL of the paid HTML is never leaked to unauthorized clients.
 */
export function PaidIframeGate({ pkg, paidUrl }: PaidIframeGateProps) {
  const { isAuthenticated, hasPackageUnlocked, user } = useAuth();
  const unlocked = isAuthenticated && hasPackageUnlocked(pkg.id);

  if (unlocked) {
    return (
      <div>
        <div className="container-main mb-3 mt-6 flex items-center gap-2 rounded-full bg-jade/10 px-4 py-2 text-sm font-bold text-jade">
          <Check className="h-4 w-4" />
          Full version unlocked · {user?.points} pts remaining
        </div>
        <iframe
          src={paidUrl}
          title={`${pkg.slug}-paid`}
          className="w-full border-0"
          style={{ minHeight: '2200px' }}
        />
      </div>
    );
  }

  return (
    <div className="container-main py-8">
      <div id="paid-section" className="scroll-mt-28">
        <UnlockPanel pkg={pkg} variant="inline" />

        <div className="mt-6 relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl border border-dashed border-secondary-300 bg-stone-50 p-8 text-center">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, transparent 0 14px, rgba(148,163,184,0.18) 14px 15px)',
            }}
          />
          <div className="relative max-w-md">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary-200 text-secondary-500">
              <Lock className="h-5 w-5" />
            </div>
            <p className="mt-3 font-bold text-secondary-800">
              {isAuthenticated
                ? 'Redeem points to view the full version'
                : 'Sign in first, then redeem to view the full version'}
            </p>
            <p className="mt-1 text-xs text-secondary-500">
              Once redeemed, you'll unlock the complete itinerary, restaurant &amp; hotel picks,
              and emergency plans. The full HTML is hosted at a private URL — only unlocked
              accounts can load it inside this page.
            </p>
            <p className="mt-3 inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              Cost: {pkg.pointsCost} pts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
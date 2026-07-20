'use client';

import { Lock } from 'lucide-react';
import type { ClientPackage } from '@/data/packages';
import { useAuth } from '@/components/auth/FirebaseAuthProvider';
import { PackageHtmlFrame } from './PackageHtmlFrame';

interface UnlockedPaidGateProps {
  pkg: ClientPackage;
  paidHtml: string;
}

/**
 * Only renders the paid iframe when the user is signed in AND has unlocked the package.
 * Otherwise shows a "locked" placeholder card.
 */
export function UnlockedPaidGate({ pkg, paidHtml }: UnlockedPaidGateProps) {
  const { isAuthenticated, hasPackageUnlocked } = useAuth();
  const unlocked = isAuthenticated && hasPackageUnlocked(pkg.id);

  if (unlocked) {
    return (
      <PackageHtmlFrame html={paidHtml} minHeight={2200} title={`${pkg.slug}-paid`} />
    );
  }

  return (
    <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-2xl border border-dashed border-secondary-300 bg-stone-50 dark:bg-secondary-800 p-8 text-center">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent 0 14px, rgba(148,163,184,0.18) 14px 15px)',
        }}
      />
      <div className="relative max-w-md">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary-200 text-secondary-500 dark:text-secondary-400">
          <Lock className="h-5 w-5" />
        </div>
        <p className="mt-3 font-bold text-secondary-800 dark:text-secondary-100">
          {isAuthenticated
            ? 'Redeem points to view the full version'
            : 'Sign in first, then redeem to view the full version'}
        </p>
        <p className="mt-1 text-xs text-secondary-500 dark:text-secondary-400">
          Once redeemed, you'll unlock the complete itinerary, restaurant & hotel picks, and emergency plans.
        </p>
      </div>
    </div>
  );
}

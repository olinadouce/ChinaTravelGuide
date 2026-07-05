'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Coins, Lock, Sparkles, Unlock, Check, AlertTriangle } from 'lucide-react';

import type { ClientPackage } from '@/data/packages';
import { useAuth } from '@/components/auth/MockAuthProvider';
import { cn } from '@/lib/utils';

interface UnlockPanelProps {
  pkg: ClientPackage;
  variant?: 'sidebar' | 'inline';
}

export function UnlockPanel({ pkg, variant = 'sidebar' }: UnlockPanelProps) {
  const { user, isAuthenticated, hasPackageUnlocked, unlockPackage } = useAuth();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const unlocked = isAuthenticated && hasPackageUnlocked(pkg.id);
  const insufficient =
    isAuthenticated && (user?.points ?? 0) < pkg.pointsCost;

  const handleUnlock = () => {
    setError(null);
    setPending(true);
    const result = unlockPackage(pkg.id, pkg.pointsCost);
    setPending(false);
    if (!result.ok) {
      setError(result.reason);
    }
  };

  const loginHref = (() => {
    const returnTo = `/packages/${pkg.slug}`;
    const params = new URLSearchParams({ returnTo });
    return `/login?${params.toString()}`;
  })();

  // Already unlocked
  if (unlocked) {
    return (
      <div
        className={cn(
          'overflow-hidden rounded-3xl border border-jade/30 bg-jade/5 p-6',
          variant === 'inline' && 'rounded-2xl'
        )}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-jade text-white shadow-md shadow-jade/30">
            <Check className="h-5 w-5" />
          </div>
          <div>
            <p className="text-base font-bold text-secondary-900">Full version unlocked</p>
            <p className="text-xs text-secondary-600">
              {user?.points} pts remaining — keep unlocking more guides
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Not signed in
  if (!isAuthenticated) {
    return (
      <div
        className={cn(
          'overflow-hidden rounded-3xl border border-black/5 bg-white p-6 shadow-lg shadow-black/5',
          variant === 'inline' && 'rounded-2xl'
        )}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-base font-bold text-secondary-900">
              Sign in to unlock with {pkg.pointsCost} pts
            </p>
            <p className="text-xs text-secondary-600">
              New users get 200 pts — enough for {Math.floor(200 / pkg.pointsCost)} paid guides
            </p>
          </div>
        </div>
        <Link
          href={loginHref}
          className="btn-primary mt-5 inline-flex w-full items-center justify-center"
        >
          Sign in / Sign up
        </Link>
        <p className="mt-3 text-center text-xs text-secondary-500">
          You'll be returned to this page automatically after signing in.
        </p>
      </div>
    );
  }

  // Signed in but not unlocked
  return (
    <div
      className={cn(
        'overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/5 via-white to-accent/5 p-6 shadow-lg shadow-black/5',
        variant === 'inline' && 'rounded-2xl'
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/30">
          <Unlock className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="text-base font-bold text-secondary-900">
            Redeem points for the full guide
          </p>
          <p className="mt-1 text-xs text-secondary-600">
            Get the full 14-day itinerary, hotel/restaurant picks and contingency plans.
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between rounded-2xl bg-white/80 p-4 ring-1 ring-black/5">
        <div>
          <p className="text-xs font-medium text-secondary-500">Cost</p>
          <p className="inline-flex items-center gap-1 text-xl font-bold text-primary">
            <Coins className="h-5 w-5" />
            {pkg.pointsCost} pts
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium text-secondary-500">Your balance</p>
          <p
            className={cn(
              'inline-flex items-center gap-1 text-xl font-bold',
              insufficient ? 'text-red-500' : 'text-jade'
            )}
          >
            <Coins className="h-5 w-5" />
            {user?.points}
          </p>
        </div>
      </div>

      {insufficient && (
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <p>Not enough points to unlock this guide.</p>
        </div>
      )}

      {error && !insufficient && (
        <p className="mt-3 text-xs text-red-600">{error}</p>
      )}

      <button
        type="button"
        onClick={handleUnlock}
        disabled={pending || insufficient}
        className={cn(
          'mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white shadow-md transition-all',
          insufficient
            ? 'cursor-not-allowed bg-secondary-300 shadow-none'
            : 'bg-primary shadow-primary/30 hover:-translate-y-0.5 hover:bg-primary-700'
        )}
      >
        <Sparkles className="h-4 w-4" />
        {insufficient ? 'Insufficient points' : `Redeem (${pkg.pointsCost} pts)`}
      </button>

      <p className="mt-3 text-center text-[11px] leading-relaxed text-secondary-500">
        Once unlocked, the guide stays in your account permanently and survives refreshes.
      </p>
    </div>
  );
}
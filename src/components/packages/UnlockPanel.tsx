'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Coins, Lock, Sparkles, Unlock, Check, AlertTriangle, TrendingUp } from 'lucide-react';

import type { ClientPackage } from '@/data/packages';
import { useAuth } from '@/components/auth/FirebaseAuthProvider';
import { POINTS_RULES, getNextTier, getUserTier } from '@/lib/points-rules';
import { cn } from '@/lib/utils';

interface UnlockPanelProps {
  pkg: ClientPackage;
  variant?: 'sidebar' | 'inline';
}

export function UnlockPanel({ pkg, variant = 'sidebar' }: UnlockPanelProps) {
  const { user, isAuthenticated, hasPackageUnlocked, unlockPackage } = useAuth();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cost = pkg.pointsCost || POINTS_RULES.FULL_GUIDE_COST;
  const unlocked = isAuthenticated && hasPackageUnlocked(pkg.id);
  const insufficient = isAuthenticated && (user?.points ?? 0) < cost;
  const needed = Math.max(0, cost - (user?.points ?? 0));

  const handleUnlock = async () => {
    setError(null);
    setPending(true);
    const result = await unlockPackage(pkg.id, cost);
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
            <p className="text-base font-bold text-secondary-900 dark:text-white">Full version unlocked</p>
            <p className="text-xs text-secondary-600 dark:text-secondary-300">
              {user?.points} pts remaining - keep unlocking more guides
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div
        className={cn(
          'overflow-hidden rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-secondary-900 p-6 shadow-lg shadow-black/5',
          variant === 'inline' && 'rounded-2xl'
        )}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-base font-bold text-secondary-900 dark:text-white">
              Sign in to unlock with {cost} pts
            </p>
            <p className="text-xs text-secondary-600 dark:text-secondary-300">
              New users get {POINTS_RULES.SIGNUP_BONUS} pts. Earn{' '}
              {Math.max(0, cost - POINTS_RULES.SIGNUP_BONUS)} more by reading and saving the Free Guide.
            </p>
          </div>
        </div>
        <Link
          href={loginHref}
          className="btn-primary mt-5 inline-flex w-full items-center justify-center"
        >
          Sign in / Sign up
        </Link>
        <p className="mt-3 text-center text-xs text-secondary-500 dark:text-secondary-400">
          You will be returned to this page automatically after signing in.
        </p>
      </div>
    );
  }

  const tier = getUserTier(user?.points ?? 0);
  const nextTier = getNextTier(user?.points ?? 0);

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
          <p className="text-base font-bold text-secondary-900 dark:text-white">
            Redeem points for the full guide
          </p>
          <p className="mt-1 text-xs text-secondary-600 dark:text-secondary-300">
            Get the full itinerary, hotel and restaurant picks, and contingency plans.
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-white/80 p-4 ring-1 ring-black/5">
        <div>
          <p className="text-xs font-medium text-secondary-500 dark:text-secondary-400">Cost</p>
          <p className="inline-flex items-center gap-1 text-xl font-bold text-primary">
            <Coins className="h-5 w-5" />
            {cost} pts
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium text-secondary-500 dark:text-secondary-400">Your balance</p>
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

      {!insufficient && (
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-jade/5 px-3 py-2 text-xs text-jade">
          <Check className="h-3.5 w-3.5" />
          You can unlock this guide now.
        </div>
      )}
      {insufficient && (
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-700">
          <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0" />
          Earn <span className="font-bold">{needed} more pts</span> to unlock. Scroll down and use the
          "Earn more points" panel.
        </div>
      )}

      <div className="mt-3 flex items-center gap-2 rounded-xl bg-stone-50 dark:bg-secondary-800 px-3 py-2 text-[11px] text-secondary-600 dark:text-secondary-300">
        <TrendingUp className="h-3 w-3 text-secondary-400" />
        Current tier: <span className="font-bold text-secondary-800 dark:text-secondary-100">{tier}</span>
        {nextTier && (
          <>
            {' '}
            - {nextTier.remaining} pts to <span className="font-bold text-secondary-800 dark:text-secondary-100">{nextTier.name}</span>
          </>
        )}
      </div>

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
        {insufficient ? `Need ${needed} more pts` : `Redeem (${cost} pts)`}
      </button>

      <p className="mt-3 text-center text-[11px] leading-relaxed text-secondary-500 dark:text-secondary-400">
        Once unlocked, the guide stays in your account permanently and survives refreshes.
      </p>
    </div>
  );
}

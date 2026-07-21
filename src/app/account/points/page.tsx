'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, ArrowLeft, CheckCircle2, Coins, Gift, Loader2, LockKeyhole, RefreshCw, TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { useAuth } from '@/components/auth/FirebaseAuthProvider';
import {
  POINTS_ACTION_LABELS,
  POINTS_RULES,
  PointsLedgerEntry,
  getNextTier,
  getUserTier,
} from '@/lib/points-rules';
import { cn } from '@/lib/utils';

export default function PointsAccountPage() {
  const {
    user,
    isAuthenticated,
    loading,
    pointsProfileLoading,
    pointsProfileError,
    getLedger,
    refreshUser,
  } = useAuth();
  const [ledger, setLedger] = useState<PointsLedgerEntry[]>([]);
  const [ledgerLoading, setLedgerLoading] = useState(false);
  const [syncStale, setSyncStale] = useState(false);
  const effectiveProfileError = pointsProfileError
    || (syncStale ? 'Firebase points sync is taking longer than expected. Showing local account data for now.' : null);
  const showSyncing = pointsProfileLoading && !syncStale;
  const profileReady = isAuthenticated && !!user && !pointsProfileLoading && !effectiveProfileError;

  useEffect(() => {
    if (!pointsProfileLoading) {
      setSyncStale(false);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setSyncStale(true);
    }, 50000);

    return () => window.clearTimeout(timeoutId);
  }, [pointsProfileLoading]);

  useEffect(() => {
    if (!profileReady) return;

    let alive = true;
    setLedgerLoading(true);
    getLedger()
      .then((entries) => {
        if (alive) setLedger(entries);
      })
      .finally(() => {
        if (alive) setLedgerLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [getLedger, profileReady]);

  const points = user?.points ?? 0;
  const tierKey = getUserTier(points);
  const tier = POINTS_RULES.TIERS[tierKey];
  const nextTier = getNextTier(points);
  const progress = useMemo(() => {
    if (!nextTier) return 100;
    const previousMin = tier.min;
    const span = nextTier.min - previousMin;
    return Math.max(0, Math.min(100, ((points - previousMin) / span) * 100));
  }, [nextTier, points, tier.min]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f1e8] dark:bg-[#0b1220] pt-24">
        <div className="container-main flex min-h-[360px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#f7f1e8] dark:bg-[#0b1220] pt-24">
        <section className="container-main py-12">
          <div className="mx-auto max-w-md rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-secondary-900 p-8 text-center shadow-sm">
            <LockKeyhole className="mx-auto h-10 w-10 text-primary" />
            <h1 className="mt-4 text-2xl font-bold text-secondary-900 dark:text-white">Sign in to view points</h1>
            <p className="mt-2 text-sm text-secondary-600 dark:text-secondary-300">
              Your balance, tier progress, unlocks, and point history live in your account.
            </p>
            <Link href="/login?returnTo=/account/points" className="btn-primary mt-6 inline-flex">
              Sign in
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f1e8] dark:bg-[#0b1220] pt-24">
      <section className="container-main py-8">
        <div className="mb-6 flex gap-2 border-b border-secondary-200 dark:border-secondary-700">
          <span className="border-b-2 border-primary px-4 py-3 text-sm font-bold text-primary">Points</span>
          <Link href="/account/posts" className="px-4 py-3 text-sm font-semibold text-secondary-500 hover:text-primary">My Posts</Link>
        </div>
        <Link
          href="/packages"
          className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-secondary-900 dark:text-white shadow-sm transition-colors hover:bg-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to packages
        </Link>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_360px]">
          <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-secondary-900 p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-primary">Compass Points</p>
                <h1 className="mt-2 text-3xl font-bold text-secondary-900 dark:text-white">Your points account</h1>
                <p className="mt-2 text-sm text-secondary-600 dark:text-secondary-300">
                  Earn points through useful travel actions, then redeem them for full guide access.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/10 px-5 py-4 text-right">
                <p className="text-xs font-semibold uppercase text-primary">Balance</p>
                <p className="mt-1 inline-flex items-center gap-2 text-3xl font-bold text-primary">
                  <Coins className="h-7 w-7" />
                  {showSyncing ? <span className="text-lg">Syncing</span> : points}
                </p>
              </div>
            </div>

            {showSyncing && (
              <div className="mt-5 flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
                <Loader2 className="h-4 w-4 animate-spin" />
                Syncing your Firebase points profile. Your signup and daily-login rewards will appear here shortly.
              </div>
            )}
            {effectiveProfileError && (
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                <div className="flex min-w-0 items-center gap-2">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                  <span className="min-w-0">
                    Points sync failed: {effectiveProfileError}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSyncStale(false);
                    void refreshUser();
                  }}
                  className="inline-flex items-center gap-1 rounded-full bg-white dark:bg-secondary-900 px-3 py-1 text-xs font-bold text-red-700 shadow-sm hover:bg-red-100"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Retry
                </button>
              </div>
            )}

            <div className="mt-6 rounded-2xl bg-stone-50 dark:bg-secondary-800 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 text-sm font-bold text-secondary-900 dark:text-white">
                  <TrendingUp className="h-4 w-4 text-jade" />
                  {tier.name}
                </div>
                {nextTier ? (
                  <p className="text-xs text-secondary-500 dark:text-secondary-400">{nextTier.remaining} pts to {nextTier.name}</p>
                ) : (
                  <p className="text-xs text-jade">Top tier reached</p>
                )}
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white dark:bg-secondary-900">
                <div className="h-full rounded-full bg-jade" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <SummaryTile icon={Gift} label="Signup bonus" value={`+${POINTS_RULES.SIGNUP_BONUS}`} />
              <SummaryTile icon={CheckCircle2} label="Daily login" value={`+${POINTS_RULES.DAILY_LOGIN}`} />
              <SummaryTile icon={LockKeyhole} label="Unlocked guides" value={`${user?.unlockedPackages.length ?? 0}`} />
            </div>
          </div>

          <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-secondary-900 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-secondary-900 dark:text-white">How to earn</h2>
            <div className="mt-4 space-y-3 text-sm">
              <RuleRow label="Create account" points={POINTS_RULES.SIGNUP_BONUS} />
              <RuleRow label="Daily login" points={POINTS_RULES.DAILY_LOGIN} />
              <RuleRow label="Read a free guide" points={POINTS_RULES.BROWSE_FREE_GUIDE} />
              <RuleRow label="Save a free guide" points={POINTS_RULES.SAVE_FREE_GUIDE} />
              <RuleRow label="Submit feedback" points={POINTS_RULES.SUBMIT_FEEDBACK} />
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-secondary-900 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-secondary-900 dark:text-white">Recent activity</h2>
            {ledgerLoading && <Loader2 className="h-4 w-4 animate-spin text-secondary-400" />}
          </div>

          <div className="mt-4 divide-y divide-secondary-100">
            {showSyncing && (
              <p className="py-8 text-center text-sm text-secondary-500 dark:text-secondary-400">Syncing points activity...</p>
            )}
            {effectiveProfileError && (
              <p className="py-8 text-center text-sm text-red-500">
                Points activity is unavailable until Firebase sync succeeds.
              </p>
            )}
            {profileReady && !ledgerLoading && ledger.length === 0 && (
              <p className="py-8 text-center text-sm text-secondary-500 dark:text-secondary-400">No points activity yet.</p>
            )}
            {ledger.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-secondary-900 dark:text-white">
                    {POINTS_ACTION_LABELS[entry.actionType] ?? entry.actionType}
                  </p>
                  <p className="mt-0.5 text-xs text-secondary-500 dark:text-secondary-400">
                    {formatDate(entry.createdAt)}
                    {entry.note ? ` - ${entry.note}` : ''}
                  </p>
                </div>
                <p
                  className={cn(
                    'shrink-0 rounded-full px-3 py-1 text-sm font-bold',
                    entry.pointsChange >= 0 ? 'bg-jade/10 text-jade' : 'bg-red-50 text-red-600'
                  )}
                >
                  {entry.pointsChange >= 0 ? '+' : ''}
                  {entry.pointsChange}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function SummaryTile({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-secondary-100 dark:border-secondary-700 bg-white dark:bg-secondary-900 px-4 py-3">
      <Icon className="h-4 w-4 text-primary" />
      <p className="mt-2 text-xs text-secondary-500 dark:text-secondary-400">{label}</p>
      <p className="text-lg font-bold text-secondary-900 dark:text-white">{value}</p>
    </div>
  );
}

function RuleRow({ label, points }: { label: string; points: number }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-secondary-700 dark:text-secondary-200">{label}</span>
      <span className="rounded-full bg-jade/10 px-2.5 py-1 text-xs font-bold text-jade">+{points}</span>
    </div>
  );
}

function formatDate(timestamp: number) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));
}

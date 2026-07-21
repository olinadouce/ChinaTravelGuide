'use client';

import { useCallback, useEffect, useState } from 'react';
import { AlertCircle, Check, Loader2, Lock, RefreshCw } from 'lucide-react';

import { useAuth } from '@/components/auth/FirebaseAuthProvider';
import type { ClientPackage } from '@/data/packages';
import { auth } from '@/lib/firebase';
import { PackageHtmlFrame } from './PackageHtmlFrame';
import { UnlockPanel } from './UnlockPanel';

interface PaidIframeGateProps {
  pkg: ClientPackage;
}

/**
 * Loads paid HTML through an authenticated API only after the account has
 * unlocked the package. The private Blob pathname never reaches the client.
 */
export function PaidIframeGate({ pkg }: PaidIframeGateProps) {
  const { isAuthenticated, hasPackageUnlocked, user } = useAuth();
  const unlocked = isAuthenticated && hasPackageUnlocked(pkg.id);
  const [paidHtml, setPaidHtml] = useState('');
  const [loadingGuide, setLoadingGuide] = useState(false);
  const [guideError, setGuideError] = useState<string | null>(null);

  const loadPaidGuide = useCallback(async () => {
    if (!unlocked) return;

    setLoadingGuide(true);
    setGuideError(null);
    try {
      const firebaseUser = auth.currentUser;
      if (!firebaseUser) throw new Error('Your sign-in session is not ready.');

      const token = await firebaseUser.getIdToken();
      const response = await fetch(`/api/packages/${encodeURIComponent(pkg.slug)}/paid`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || 'The private guide could not be loaded.');
      }

      setPaidHtml(await response.text());
    } catch (error: any) {
      setPaidHtml('');
      setGuideError(error?.message || 'The private guide could not be loaded.');
    } finally {
      setLoadingGuide(false);
    }
  }, [pkg.slug, unlocked]);

  useEffect(() => {
    if (unlocked && !paidHtml) void loadPaidGuide();
    if (!unlocked) {
      setPaidHtml('');
      setGuideError(null);
    }
  }, [loadPaidGuide, paidHtml, unlocked]);

  if (unlocked) {
    return (
      <div>
        <div className="container-main mb-3 mt-6 flex items-center gap-2 rounded-full bg-jade/10 px-4 py-2 text-sm font-bold text-jade">
          <Check className="h-4 w-4" />
          Full version unlocked - {user?.points} pts remaining
        </div>

        {loadingGuide ? (
          <div className="container-main flex min-h-[280px] items-center justify-center py-10">
            <div className="theme-surface flex items-center gap-3 rounded-2xl px-6 py-5">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="text-sm font-medium">Loading your private guide…</span>
            </div>
          </div>
        ) : guideError ? (
          <div className="container-main py-8">
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-200">
              <p className="flex items-center gap-2 font-bold">
                <AlertCircle className="h-5 w-5" /> Private guide unavailable
              </p>
              <p className="mt-2 text-sm">{guideError}</p>
              <button
                type="button"
                onClick={() => void loadPaidGuide()}
                className="btn-primary mt-4 gap-2"
              >
                <RefreshCw className="h-4 w-4" /> Try again
              </button>
            </div>
          </div>
        ) : paidHtml ? (
          <PackageHtmlFrame html={paidHtml} minHeight={2200} title={`${pkg.slug}-paid`} />
        ) : null}
      </div>
    );
  }

  return (
    <div className="container-main py-8">
      <div id="paid-section" className="scroll-mt-28">
        <UnlockPanel pkg={pkg} variant="inline" />

        <div className="relative mt-6 flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl border border-dashed border-secondary-300 bg-stone-50 dark:bg-secondary-800 p-8 text-center">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, transparent 0 14px, rgba(148,163,184,0.18) 14px 15px)',
            }}
          />
          <div className="relative max-w-md">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary-200 text-secondary-500 dark:bg-secondary-700 dark:text-secondary-300">
              <Lock className="h-5 w-5" />
            </div>
            <p className="mt-3 font-bold text-secondary-800 dark:text-secondary-100">
              {isAuthenticated
                ? 'Redeem points to view the full version'
                : 'Sign in first, then redeem to view the full version'}
            </p>
            <p className="mt-1 text-xs text-secondary-500 dark:text-secondary-400">
              Once redeemed, the complete itinerary is loaded from private storage after your
              account authorization is verified by the server.
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

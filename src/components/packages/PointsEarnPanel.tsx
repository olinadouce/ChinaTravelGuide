'use client';

import { useEffect, useMemo, useState } from 'react';
import { BookOpen, Download, Share2, Check, AlertCircle, Clock, Gauge, type LucideIcon } from 'lucide-react';
import { useAuth } from '@/components/auth/FirebaseAuthProvider';
import { POINTS_RULES } from '@/lib/points-rules';
import { cn } from '@/lib/utils';

interface PointsEarnPanelProps {
  citySlug: string;
  cityName: string;
  freeUrl: string;
  wordUrl?: string;
}

const READ_SECONDS_REQUIRED = 180;
const SCROLL_PERCENT_REQUIRED = 60;

export function PointsEarnPanel({ citySlug, cityName, freeUrl, wordUrl }: PointsEarnPanelProps) {
  const { isAuthenticated, user, earnPoints } = useAuth();
  const [feedback, setFeedback] = useState<{ ok: boolean; message: string } | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [pendingAction, setPendingAction] = useState<'browse_free_guide' | 'save_free_guide' | null>(null);

  const browseKey = `browse_free_guide:${citySlug}`;
  const saveKey = `save_free_guide:${citySlug}`;
  const browseClaimed = !!user?.actionsUsed?.[browseKey];
  const saveClaimed = !!user?.actionsUsed?.[saveKey];
  const readTimeReady = elapsedSeconds >= READ_SECONDS_REQUIRED;
  const scrollReady = scrollPercent >= SCROLL_PERCENT_REQUIRED;
  const readReady = readTimeReady && scrollReady;

  useEffect(() => {
    if (!isAuthenticated || browseClaimed) return;

    const storageKey = `ctg-read-seconds:${citySlug}`;
    const storedSeconds = Number(window.localStorage.getItem(storageKey) ?? 0);
    setElapsedSeconds(Number.isFinite(storedSeconds) ? Math.max(0, storedSeconds) : 0);

    const intervalId = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      setElapsedSeconds((current) => {
        const next = Math.min(READ_SECONDS_REQUIRED, current + 1);
        window.localStorage.setItem(storageKey, String(next));
        return next;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [browseClaimed, citySlug, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated || browseClaimed) return;

    const updateScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        setScrollPercent(100);
        return;
      }
      setScrollPercent(Math.min(100, Math.round((window.scrollY / scrollable) * 100)));
    };

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll);
    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, [browseClaimed, isAuthenticated]);

  const timerText = useMemo(() => {
    const remainingSeconds = Math.max(0, READ_SECONDS_REQUIRED - elapsedSeconds);
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    return readTimeReady ? '3:00 complete' : `${minutes}:${String(seconds).padStart(2, '0')} remaining`;
  }, [elapsedSeconds, readTimeReady]);

  if (!isAuthenticated) {
    return null;
  }

  const claim = async (
    actionType: 'browse_free_guide' | 'save_free_guide',
    label: string,
    points: number,
    proof: { readSeconds?: number; scrollPercent?: number; wordDownloaded?: boolean } = {}
  ) => {
    setFeedback(null);
    setPendingAction(actionType);
    const result = await earnPoints(actionType, { city: citySlug, note: `${label} - ${cityName}`, ...proof });
    setPendingAction(null);
    if (result.ok) {
      setFeedback({ ok: true, message: `+${points} points earned!` });
    } else {
      setFeedback({ ok: false, message: result.reason });
    }
  };

  const handleReadClaim = () => {
    if (!readReady || browseClaimed || pendingAction) return;
    void claim('browse_free_guide', 'Completed reading requirement', POINTS_RULES.BROWSE_FREE_GUIDE, {
      readSeconds: elapsedSeconds,
      scrollPercent,
    });
  };

  const handleDownloadWordAndClaim = async () => {
    if (saveClaimed || pendingAction) return;

    try {
      setFeedback(null);
      setPendingAction('save_free_guide');

      const response = await fetch(wordUrl ?? freeUrl);
      if (!response.ok) throw new Error('Word guide could not be downloaded.');
      const blob = wordUrl
        ? await response.blob()
        : new Blob(
            [`<!doctype html><html><head><meta charset="utf-8"><title>${cityName} Free Guide</title></head><body>${await response.text()}</body></html>`],
            { type: 'application/msword;charset=utf-8' }
          );
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = `${citySlug}-free-guide.${wordUrl ? 'docx' : 'doc'}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);

      const result = await earnPoints('save_free_guide', {
        city: citySlug,
        note: `Downloaded Word version - ${cityName}`,
        wordDownloaded: true,
      });
      if (result.ok) {
        setFeedback({ ok: true, message: `Word guide downloaded. +${POINTS_RULES.SAVE_FREE_GUIDE} points earned!` });
      } else {
        setFeedback({ ok: false, message: result.reason });
      }
    } catch (err: any) {
      setFeedback({ ok: false, message: err?.message ?? 'Word download failed.' });
    } finally {
      setPendingAction(null);
    }
  };

  return (
    <div className="container-main my-6">
      <div className="rounded-2xl border border-jade/20 bg-gradient-to-br from-jade/5 via-white to-primary/5 p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-jade" />
          <h3 className="text-sm font-bold text-secondary-900 dark:text-white">
            Earn more Compass Points for {cityName}
          </h3>
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          <div
            className={cn(
              'rounded-xl border p-4',
              browseClaimed ? 'border-jade/30 bg-jade/10' : 'border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900'
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="flex items-center gap-2 text-sm font-bold text-secondary-900 dark:text-white">
                  <BookOpen className="h-4 w-4 text-jade" />
                  Reading reward
                </p>
                <p className="mt-1 text-xs text-secondary-500 dark:text-secondary-400">
                  Stay on this guide for 3 minutes and scroll through 60% of the page.
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-jade/15 px-2 py-0.5 text-xs font-bold text-jade">
                {browseClaimed ? <Check className="h-3 w-3" /> : '+'} {POINTS_RULES.BROWSE_FREE_GUIDE}
              </span>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <ProgressMetric
                icon={Clock}
                label="Reading timer"
                value={timerText}
                progress={Math.min(100, Math.round((elapsedSeconds / READ_SECONDS_REQUIRED) * 100))}
                done={readTimeReady || browseClaimed}
              />
              <ProgressMetric
                icon={Gauge}
                label="Page scrolled"
                value={`${scrollPercent}% / ${SCROLL_PERCENT_REQUIRED}%`}
                progress={Math.min(100, Math.round((scrollPercent / SCROLL_PERCENT_REQUIRED) * 100))}
                done={scrollReady || browseClaimed}
              />
            </div>

            <button
              type="button"
              onClick={handleReadClaim}
              disabled={browseClaimed || !readReady || pendingAction !== null}
              className={cn(
                'mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition',
                browseClaimed
                  ? 'bg-jade/15 text-jade'
                  : readReady
                    ? 'bg-jade text-white hover:bg-jade/90'
                    : 'cursor-not-allowed bg-secondary-200 text-secondary-500 dark:text-secondary-400'
              )}
            >
              {browseClaimed ? <Check className="h-4 w-4" /> : null}
              {browseClaimed ? 'Reading reward claimed' : readReady ? 'Claim reading points' : 'Complete timer and scroll first'}
            </button>
          </div>

          <div
            className={cn(
              'rounded-xl border p-4',
              saveClaimed ? 'border-jade/30 bg-jade/10' : 'border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900'
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="flex items-center gap-2 text-sm font-bold text-secondary-900 dark:text-white">
                  <Download className="h-4 w-4 text-jade" />
                  Word download reward
                </p>
                <p className="mt-1 text-xs text-secondary-500 dark:text-secondary-400">
                  Download this free guide as a Word {wordUrl ? '.docx' : '.doc'} file to earn points.
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-jade/15 px-2 py-0.5 text-xs font-bold text-jade">
                {saveClaimed ? <Check className="h-3 w-3" /> : '+'} {POINTS_RULES.SAVE_FREE_GUIDE}
              </span>
            </div>

            <button
              type="button"
              onClick={handleDownloadWordAndClaim}
              disabled={saveClaimed || pendingAction !== null}
              className={cn(
                'mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition',
                saveClaimed
                  ? 'bg-jade/15 text-jade'
                  : 'bg-secondary-900 text-white hover:bg-primary'
              )}
            >
              {saveClaimed ? <Check className="h-4 w-4" /> : <Download className="h-4 w-4" />}
              {saveClaimed
                ? 'Word download reward claimed'
                : pendingAction === 'save_free_guide'
                  ? 'Preparing Word download...'
                  : 'Download Word file and earn points'}
            </button>
          </div>
        </div>

        <p className="mt-3 text-[11px] leading-relaxed text-secondary-500 dark:text-secondary-400">
          Coming soon: <Share2 className="inline h-3 w-3" /> share with valid click{' '}
          <span className="font-bold text-secondary-600 dark:text-secondary-300">+{POINTS_RULES.SHARE_VALID_CLICK}</span>, invite a friend{' '}
          <span className="font-bold text-secondary-600 dark:text-secondary-300">+{POINTS_RULES.INVITE_SIGNUP}</span>, submit feedback{' '}
          <span className="font-bold text-secondary-600 dark:text-secondary-300">+{POINTS_RULES.SUBMIT_FEEDBACK}</span>.
        </p>

        {feedback && (
          <p
            className={cn(
              'mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium',
              feedback.ok
                ? 'bg-jade/10 text-jade'
                : 'bg-amber-50 text-amber-700'
            )}
          >
            {feedback.ok ? <Check className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
            {feedback.message}
          </p>
        )}
      </div>
    </div>
  );
}

function ProgressMetric({
  icon: Icon,
  label,
  value,
  progress,
  done,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  progress: number;
  done: boolean;
}) {
  return (
    <div className="rounded-lg bg-stone-50 dark:bg-secondary-800 p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-secondary-600 dark:text-secondary-300">
          <Icon className="h-3.5 w-3.5" />
          {label}
        </span>
        {done && <Check className="h-3.5 w-3.5 text-jade" />}
      </div>
      <p className={cn('mt-1 text-sm font-bold', done ? 'text-jade' : 'text-secondary-900 dark:text-white')}>
        {value}
      </p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white dark:bg-secondary-900">
        <div className="h-full rounded-full bg-jade" style={{ width: `${Math.min(100, progress)}%` }} />
      </div>
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import type { Analytics } from 'firebase/analytics';
import { firebaseApp } from '@/lib/firebase';

export type AnalyticsEventName =
  | 'sign_up'
  | 'login'
  | 'view_package'
  | 'unlock_package'
  | 'affiliate_click'
  | 'ai_assistant_open'
  | 'ai_message_sent'
  | 'translation_completed'
  | 'tool_open';

type AnalyticsEventValue = string | number | boolean;
type AnalyticsEventParams = Record<string, AnalyticsEventValue | null | undefined>;

let analyticsPromise: Promise<Analytics | null> | null = null;

function getClientAnalytics() {
  if (typeof window === 'undefined' || !process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID) {
    return Promise.resolve(null);
  }

  if (!analyticsPromise) {
    analyticsPromise = import('firebase/analytics')
      .then(async ({ initializeAnalytics, isSupported }) => {
        if (!(await isSupported())) return null;

        return initializeAnalytics(firebaseApp, {
          config: { send_page_view: false },
        });
      })
      .catch((error: unknown) => {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Firebase Analytics could not be initialized.', error);
        }
        return null;
      });
  }

  return analyticsPromise;
}

export function trackAnalyticsEvent(
  eventName: AnalyticsEventName,
  params: AnalyticsEventParams = {}
) {
  const safeParams = Object.fromEntries(
    Object.entries(params)
      .filter((entry): entry is [string, AnalyticsEventValue] => entry[1] != null)
      .map(([key, value]) => [
        key,
        typeof value === 'string' ? value.slice(0, 100) : value,
      ])
  );

  void getClientAnalytics().then(async (analytics) => {
    if (!analytics) return;

    const { logEvent } = await import('firebase/analytics');
    if (eventName === 'sign_up') {
      logEvent(analytics, 'sign_up', safeParams);
      return;
    }
    if (eventName === 'login') {
      logEvent(analytics, 'login', safeParams);
      return;
    }
    logEvent(analytics, eventName, safeParams);
  }).catch((error: unknown) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Firebase Analytics event "${eventName}" could not be sent.`, error);
    }
  });
}

export function FirebaseAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    void getClientAnalytics().then(async (analytics) => {
      if (!analytics) return;

      const { logEvent } = await import('firebase/analytics');
      logEvent(analytics, 'page_view', {
        page_location: window.location.href,
        page_path: `${pathname}${window.location.search}`,
        page_title: document.title,
      });
    });

    const toolMatch = pathname.match(/^\/tools\/([^/]+)$/);
    if (toolMatch) {
      trackAnalyticsEvent('tool_open', {
        tool_name: toolMatch[1],
      });
    }
  }, [pathname]);

  return null;
}

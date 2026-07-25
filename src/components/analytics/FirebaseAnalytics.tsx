'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import type { Analytics } from 'firebase/analytics';
import { firebaseApp } from '@/lib/firebase';

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
  }, [pathname]);

  return null;
}

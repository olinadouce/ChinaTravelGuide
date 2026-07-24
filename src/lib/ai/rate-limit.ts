import { createHash } from 'crypto';
import { FieldValue } from 'firebase-admin/firestore';

import { adminDb } from '@/lib/server/firebase-admin';
import { getAiConfig } from './config';

const WINDOW_MS = 10 * 60 * 1000;

function bucketKey(parts: string[]): string {
  return createHash('sha256').update(parts.join('|')).digest('hex').slice(0, 40);
}

/**
 * Cross-instance rate limit via Firestore.
 * Replaces single-instance memory limits for Vercel serverless.
 */
export async function enforceAiRateLimit(params: {
  userId?: string | null;
  ip?: string | null;
  isAuthenticated: boolean;
}): Promise<{ allowed: true } | { allowed: false; retryAfterSec: number }> {
  const config = getAiConfig();
  const limit = params.isAuthenticated
    ? config.rateLimitPer10Min
    : config.anonymousRateLimitPer10Min;

  const identity = params.userId
    ? `user:${params.userId}`
    : `ip:${params.ip || 'unknown'}`;
  const docId = bucketKey([identity]);
  const ref = adminDb().collection('aiRateLimits').doc(docId);
  const now = Date.now();

  return adminDb().runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const data = snap.exists ? snap.data() || {} : {};
    const windowStart = Number(data.windowStart || 0);
    const count = Number(data.count || 0);

    if (!windowStart || now - windowStart >= WINDOW_MS) {
      tx.set(
        ref,
        {
          identity,
          windowStart: now,
          count: 1,
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
      return { allowed: true as const };
    }

    if (count >= limit) {
      const retryAfterSec = Math.max(1, Math.ceil((WINDOW_MS - (now - windowStart)) / 1000));
      return { allowed: false as const, retryAfterSec };
    }

    tx.set(
      ref,
      {
        identity,
        windowStart,
        count: count + 1,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    return { allowed: true as const };
  });
}

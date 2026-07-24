import { createHash } from 'crypto';
import { FieldValue } from 'firebase-admin/firestore';

import { adminDb } from '@/lib/server/firebase-admin';

export type UnansweredStatus = 'unreviewed' | 'planned' | 'added' | 'ignored';

const INJECTION_RE =
  /(ignore (all|previous|above) instructions|reveal (the )?system prompt|jailbreak|DAN mode|bypass (the )?filter)/i;

export function normalizeQuestion(question: string): string {
  return question.trim().replace(/\s+/g, ' ');
}

export function hashQuestion(normalized: string): string {
  return createHash('sha256').update(normalized.toLowerCase()).digest('hex');
}

export function shouldRecordUnanswered(question: string): boolean {
  const q = question.trim();
  if (q.length < 4 || q.length > 1000) return false;
  if (INJECTION_RE.test(q)) return false;
  // Reject punctuation / symbol-only noise (keep CJK / Latin letters).
  if (!/[\p{L}\p{N}]/u.test(q)) return false;
  return true;
}

export async function recordUnansweredQuestion(params: {
  question: string;
  language: 'zh' | 'en';
  detectedCity?: string | null;
  packageId?: string | null;
  userId?: string | null;
  topRetrievalScore?: number | null;
}): Promise<void> {
  if (!shouldRecordUnanswered(params.question)) return;

  const normalized = normalizeQuestion(params.question);
  const questionHash = hashQuestion(normalized);
  const ref = adminDb().collection('unansweredQuestions').doc(questionHash);
  const now = FieldValue.serverTimestamp();

  await adminDb().runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists) {
      tx.set(ref, {
        id: questionHash,
        question: params.question.trim(),
        normalizedQuestion: normalized,
        questionHash,
        language: params.language,
        detectedCity: params.detectedCity || null,
        packageId: params.packageId || null,
        userId: params.userId || null,
        topRetrievalScore:
          typeof params.topRetrievalScore === 'number' ? params.topRetrievalScore : null,
        occurrenceCount: 1,
        firstAskedAt: now,
        lastAskedAt: now,
        status: 'unreviewed' satisfies UnansweredStatus,
        createdAt: now,
        updatedAt: now,
      });
      return;
    }

    const data = snap.data() || {};
    tx.update(ref, {
      occurrenceCount: Number(data.occurrenceCount || 1) + 1,
      lastAskedAt: now,
      updatedAt: now,
      detectedCity: params.detectedCity || data.detectedCity || null,
      packageId: params.packageId || data.packageId || null,
      topRetrievalScore:
        typeof params.topRetrievalScore === 'number'
          ? Math.max(Number(data.topRetrievalScore || 0), params.topRetrievalScore)
          : data.topRetrievalScore ?? null,
    });
  });
}

export async function listUnansweredQuestions(params?: {
  city?: string;
  status?: UnansweredStatus;
  limit?: number;
}) {
  const query = adminDb()
    .collection('unansweredQuestions')
    .orderBy('occurrenceCount', 'desc')
    .limit(params?.limit ?? 100);

  const snap = await query.get();
  let rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  if (params?.city) {
    rows = rows.filter((r: any) => r.detectedCity === params.city);
  }
  if (params?.status) {
    rows = rows.filter((r: any) => r.status === params.status);
  }
  return rows;
}

export async function updateUnansweredStatus(
  id: string,
  status: UnansweredStatus
): Promise<void> {
  await adminDb().collection('unansweredQuestions').doc(id).set(
    {
      status,
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
}

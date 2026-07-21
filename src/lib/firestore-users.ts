import { collection, doc, getDoc, getDocs, limit, orderBy, query } from 'firebase/firestore';

import { FIRESTORE_DATABASE_ID, auth, db } from './firebase';
import type { PointsLedgerEntry } from './points-rules';

export interface FirestoreUser {
  uid: string;
  email: string | null;
  displayName: string;
  photoURL: string | null;
  points: number;
  unlockedPackages: string[];
  actionsUsed: Record<string, true>;
  lastDailyLoginDate?: string;
  createdAt: any;
  updatedAt: any;
}

type FirestoreValue =
  | { nullValue: null }
  | { stringValue: string }
  | { timestampValue: string }
  | { integerValue: string }
  | { doubleValue: number }
  | { booleanValue: boolean }
  | { arrayValue: { values?: FirestoreValue[] } }
  | { mapValue: { fields?: Record<string, FirestoreValue> } };

type RestDocument = {
  name: string;
  fields?: Record<string, FirestoreValue>;
  createTime?: string;
  updateTime?: string;
};

const SDK_TIMEOUT_MS = 30000;
const SDK_TIMEOUT = Symbol('sdk-timeout');
const REST_ROOT =
  `https://firestore.googleapis.com/v1/projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}` +
  `/databases/${encodeURIComponent(FIRESTORE_DATABASE_ID)}/documents`;

export async function getUserDoc(uid: string): Promise<FirestoreUser | null> {
  return sdkThenRest(
    async () => {
      const snapshot = await getDoc(doc(db, 'users', uid));
      return snapshot.exists() ? ({ ...snapshot.data(), uid } as FirestoreUser) : null;
    },
    async () => {
      const result = await restFetch<RestDocument>(`users/${encodeURIComponent(uid)}`, true);
      return result ? restDocToUser(result, uid) : null;
    },
    'getUserDoc'
  );
}

export async function getLedger(uid: string, max = 50): Promise<PointsLedgerEntry[]> {
  return sdkThenRest(
    async () => {
      const ledgerQuery = query(
        collection(db, 'users', uid, 'ledger'),
        orderBy('createdAt', 'desc'),
        limit(max)
      );
      const snapshot = await getDocs(ledgerQuery);
      return snapshot.docs.map((entry) => {
        const data = entry.data() as any;
        return {
          id: entry.id,
          ...data,
          createdAt: data.createdAt?.toMillis?.() ?? Date.now(),
        } as PointsLedgerEntry;
      });
    },
    async () => {
      const params = new URLSearchParams({ pageSize: String(max), orderBy: 'createdAt desc' });
      const result = await restFetch<{ documents?: RestDocument[] }>(
        `users/${encodeURIComponent(uid)}/ledger?${params.toString()}`
      );
      return (result?.documents || []).map((entry) => ({
        id: entry.name.split('/').pop() || entry.name,
        ...fromFirestoreFields(entry.fields || {}),
      })) as PointsLedgerEntry[];
    },
    'getLedger'
  );
}

async function sdkThenRest<T>(sdkCall: () => Promise<T>, restCall: () => Promise<T>, label: string) {
  try {
    const result = await Promise.race([
      sdkCall(),
      new Promise<typeof SDK_TIMEOUT>((resolve) =>
        window.setTimeout(() => resolve(SDK_TIMEOUT), SDK_TIMEOUT_MS)
      ),
    ]);
    if (result !== SDK_TIMEOUT) return result;
    console.warn(`[Firestore] SDK ${label} timed out; falling back to REST.`);
  } catch (error) {
    console.warn(`[Firestore] SDK ${label} failed; falling back to REST.`, error);
  }
  return restCall();
}

async function restFetch<T>(path: string, allow404 = false): Promise<T | null> {
  const token = await auth.currentUser?.getIdToken();
  if (!token) throw new Error('Firebase auth token is not available.');
  const response = await fetch(`${REST_ROOT}/${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (allow404 && response.status === 404) return null;
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('Firestore denied access to this account data.');
    }
    throw new Error(`Firestore read failed (${response.status}).`);
  }
  return (await response.json()) as T;
}

function restDocToUser(entry: RestDocument, uid: string): FirestoreUser {
  const data = fromFirestoreFields(entry.fields || {}) as Partial<FirestoreUser>;
  return {
    uid,
    email: data.email ?? null,
    displayName: data.displayName || 'Traveler',
    photoURL: data.photoURL ?? null,
    points: data.points ?? 0,
    unlockedPackages: data.unlockedPackages ?? [],
    actionsUsed: data.actionsUsed ?? {},
    lastDailyLoginDate: data.lastDailyLoginDate,
    createdAt: data.createdAt ?? entry.createTime ?? null,
    updatedAt: data.updatedAt ?? entry.updateTime ?? null,
  };
}

function fromFirestoreFields(fields: Record<string, FirestoreValue>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, fromFirestoreValue(value)])
  );
}

function fromFirestoreValue(value: FirestoreValue): any {
  if ('nullValue' in value) return null;
  if ('stringValue' in value) return value.stringValue;
  if ('timestampValue' in value) return new Date(value.timestampValue).getTime();
  if ('integerValue' in value) return Number(value.integerValue);
  if ('doubleValue' in value) return value.doubleValue;
  if ('booleanValue' in value) return value.booleanValue;
  if ('arrayValue' in value) return (value.arrayValue.values || []).map(fromFirestoreValue);
  if ('mapValue' in value) return fromFirestoreFields(value.mapValue.fields || {});
  return null;
}

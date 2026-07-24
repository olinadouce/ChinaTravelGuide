'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { authenticatedGet } from '@/lib/authenticated-api';
import { useAuth } from '@/components/auth/FirebaseAuthProvider';
import { auth } from '@/lib/firebase';

type Item = {
  id: string;
  question: string;
  language: string;
  detectedCity: string | null;
  packageId: string | null;
  occurrenceCount: number;
  status: 'unreviewed' | 'planned' | 'added' | 'ignored';
  topRetrievalScore: number | null;
};

export default function UnansweredQuestionsAdminPage() {
  const { isAuthenticated, loading } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [city, setCity] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    setBusy(true);
    setError(null);
    try {
      const qs = city ? `?city=${encodeURIComponent(city)}` : '';
      const data = await authenticatedGet<{ items: Item[] }>(
        `/api/ai-assistant/unanswered${qs}`
      );
      setItems(data.items || []);
    } catch (err: any) {
      setError(err?.message || 'Failed to load unanswered questions.');
      setItems([]);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    if (loading || !isAuthenticated) return;
    void load();
    // Initial admin fetch only; manual Refresh button available below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, isAuthenticated]);

  async function updateStatus(id: string, status: Item['status']) {
    const token = await auth.currentUser?.getIdToken();
    if (!token) throw new Error('Please sign in first.');
    const response = await fetch('/api/ai-assistant/unanswered', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, status }),
      cache: 'no-store',
    });
    if (!response.ok) {
      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      throw new Error(payload.error || 'Failed to update status.');
    }
    await load();
  }

  if (loading) {
    return <div className="container-main py-24">Loading…</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="container-main py-24">
        <p>Admin sign-in required.</p>
        <Link href="/login" className="text-primary underline">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="container-main py-24">
      <h1 className="text-2xl font-bold">Unanswered AI Questions</h1>
      <p className="mt-2 text-sm text-secondary-600">
        Only accounts listed in <code>AI_ADMIN_UIDS</code> / <code>AI_ADMIN_EMAILS</code> can
        access this page.
      </p>

      <div className="mt-6 flex flex-wrap items-end gap-3">
        <label className="text-sm">
          City filter
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1 block rounded-lg border px-3 py-2"
            placeholder="hong-kong"
          />
        </label>
        <button
          type="button"
          onClick={() => void load()}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
        >
          Refresh
        </button>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {busy && <p className="mt-4 text-sm">Loading…</p>}

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 pr-4">Question</th>
              <th className="py-2 pr-4">City</th>
              <th className="py-2 pr-4">Count</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items
              .slice()
              .sort((a, b) => b.occurrenceCount - a.occurrenceCount)
              .map((item) => (
                <tr key={item.id} className="border-b align-top">
                  <td className="py-3 pr-4 max-w-md">{item.question}</td>
                  <td className="py-3 pr-4">{item.detectedCity || '—'}</td>
                  <td className="py-3 pr-4">{item.occurrenceCount}</td>
                  <td className="py-3 pr-4">{item.status}</td>
                  <td className="py-3 pr-4 space-x-2">
                    {(['planned', 'added', 'ignored'] as const).map((status) => (
                      <button
                        key={status}
                        type="button"
                        className="rounded border px-2 py-1 text-xs"
                        onClick={() => void updateStatus(item.id, status)}
                      >
                        {status}
                      </button>
                    ))}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

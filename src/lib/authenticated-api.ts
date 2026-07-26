'use client';

import { auth } from '@/lib/firebase';

type AuthenticatedRequestOptions = {
  method?: 'GET' | 'POST' | 'DELETE';
  body?: unknown;
};

/**
 * Single transport for every authenticated browser-to-API call.
 *
 * Firebase authenticates the browser, but the server must independently
 * verify a fresh ID token. Centralising that protocol prevents individual
 * screens from accidentally omitting the Authorization header or handling
 * API errors differently.
 */
async function authenticatedRequest<T>(
  path: string,
  { method = 'GET', body }: AuthenticatedRequestOptions = {}
): Promise<T> {
  const token = await auth.currentUser?.getIdToken();
  if (!token) throw new Error('Please sign in first.');

  const isFormData = body instanceof FormData;
  const response = await fetch(path, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(body !== undefined && !isFormData ? { 'Content-Type': 'application/json' } : {}),
    },
    ...(body !== undefined
      ? { body: isFormData ? body : JSON.stringify(body) }
      : {}),
    cache: 'no-store',
  });
  const payload = (await response.json().catch(() => ({}))) as T & { error?: string };
  if (!response.ok) throw new Error(payload.error || `Request failed (${response.status}).`);
  return payload;
}

export function authenticatedPost<T>(path: string, body?: unknown): Promise<T> {
  return authenticatedRequest<T>(path, { method: 'POST', body: body ?? {} });
}

export async function authenticatedPostForm<T>(path: string, body: FormData): Promise<T> {
  return authenticatedRequest<T>(path, { method: 'POST', body });
}

export function authenticatedGet<T>(path: string): Promise<T> {
  return authenticatedRequest<T>(path);
}

export function authenticatedDelete<T>(path: string): Promise<T> {
  return authenticatedRequest<T>(path, { method: 'DELETE' });
}

import { getAllPackages } from '@/data/packages';
import { verifyRequestUser, adminDb } from '@/lib/server/firebase-admin';
import { getAiConfig } from './config';

export type KnowledgeEntitlements = {
  isAuthenticated: boolean;
  isAdmin: boolean;
  userId: string | null;
  email: string | null;
  unlockedPackageIds: string[];
};

/**
 * Resolve package id/slug to the canonical unlockedPackages id (`pkg-...`).
 */
export function resolvePackageId(input?: string | null): string | null {
  if (!input) return null;
  const value = input.trim();
  if (!value) return null;
  const packages = getAllPackages();
  const byId = packages.find((p) => p.id === value);
  if (byId) return byId.id;
  const bySlug = packages.find((p) => p.slug === value);
  if (bySlug) return bySlug.id;
  if (value.startsWith('pkg-')) return value;
  const prefixed = `pkg-${value}`;
  if (packages.some((p) => p.id === prefixed)) return prefixed;
  return null;
}

export function resolvePackageSlug(input?: string | null): string | null {
  if (!input) return null;
  const packages = getAllPackages();
  const id = resolvePackageId(input);
  if (!id) return null;
  return packages.find((p) => p.id === id)?.slug ?? null;
}

export async function getUserKnowledgeEntitlements(
  authorizationHeader: string | null
): Promise<KnowledgeEntitlements> {
  const identity = await verifyRequestUser(authorizationHeader);
  if (!identity) {
    return {
      isAuthenticated: false,
      isAdmin: false,
      userId: null,
      email: null,
      unlockedPackageIds: [],
    };
  }

  const email = (identity.email || '').toLowerCase();
  const config = getAiConfig();
  const isAdmin =
    config.adminUids.includes(identity.uid) ||
    (email.length > 0 && config.adminEmails.includes(email));

  const profile = await adminDb().collection('users').doc(identity.uid).get();
  const unlockedPackages = profile.exists
    ? profile.data()?.unlockedPackages
    : [];

  return {
    isAuthenticated: true,
    isAdmin,
    userId: identity.uid,
    email: identity.email ?? null,
    unlockedPackageIds: Array.isArray(unlockedPackages)
      ? unlockedPackages.filter((v): v is string => typeof v === 'string')
      : [],
  };
}

/**
 * Build OpenAI vector-store attribute filters.
 * Equivalence:
 *   access_level = free
 *   OR (access_level = paid AND package_id IN unlockedPackageIds)
 * Admin: no access filter.
 */
export function buildKnowledgeAccessFilter(entitlements: KnowledgeEntitlements) {
  if (entitlements.isAdmin) return undefined;

  const freeFilter = {
    type: 'eq' as const,
    key: 'access_level',
    value: 'free',
  };

  if (entitlements.unlockedPackageIds.length === 0) {
    return freeFilter;
  }

  return {
    type: 'or' as const,
    filters: [
      freeFilter,
      {
        type: 'and' as const,
        filters: [
          { type: 'eq' as const, key: 'access_level', value: 'paid' },
          {
            type: 'in' as const,
            key: 'package_id',
            value: entitlements.unlockedPackageIds,
          },
        ],
      },
    ],
  };
}

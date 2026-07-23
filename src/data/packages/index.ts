import type { PackageTheme, ThemeId, TravelPackage } from '@/types';

import { themes } from './themes';
import { landscapePackages } from './landscape';
import { historyPackages } from './history';
import { themedPackages } from './themed';
import { ishowspeedPackages } from './ishowspeed';

/**
 * Server-only full record that retains filesystem paths.
 * Never passed to client components.
 */
type ServerPackage = TravelPackage & {
  freeHtmlPath: string;
  paidHtmlPath: string;
};

/**
 * Client-safe view of a package: filesystem paths stripped.
 * Use this type for any prop that flows into client components.
 */
export type ClientPackage = Omit<TravelPackage, 'freeHtmlPath' | 'paidHtmlPath'>;

const allPackages: ServerPackage[] = [
  ...landscapePackages,
  ...historyPackages,
  ...themedPackages,
  ...ishowspeedPackages,
];

function toClient(pkg: ServerPackage): ClientPackage {
  const { freeHtmlPath: _f, paidHtmlPath: _p, ...rest } = pkg;
  return rest;
}

export function getAllThemes(): PackageTheme[] {
  return themes;
}

export function getAllPackages(): ClientPackage[] {
  return allPackages.map(toClient);
}

export function getThemeById(id: ThemeId): PackageTheme | undefined {
  return themes.find((t) => t.id === id);
}

export function getPackagesByTheme(themeId: ThemeId): ClientPackage[] {
  return allPackages.filter((p) => p.themeId === themeId).map(toClient);
}

export function getPackageBySlug(slug: string): ClientPackage | undefined {
  const p = allPackages.find((p) => p.slug === slug);
  return p ? toClient(p) : undefined;
}

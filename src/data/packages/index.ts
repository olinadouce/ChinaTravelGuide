import type { PackageTheme, ThemeId, TravelPackage } from '@/types';

import { themes } from './themes';
import { landscapePackages } from './landscape';
import { historyPackages } from './history';
import { themedPackages } from './themed';
import { ishowspeedPackages } from './ishowspeed';

export type ClientPackage = TravelPackage;

const allPackages: TravelPackage[] = [
  ...landscapePackages,
  ...historyPackages,
  ...themedPackages,
  ...ishowspeedPackages,
];

export function getAllThemes(): PackageTheme[] {
  return themes;
}

export function getAllPackages(): ClientPackage[] {
  return allPackages;
}

export function getThemeById(id: ThemeId): PackageTheme | undefined {
  return themes.find((t) => t.id === id);
}

export function getPackagesByTheme(themeId: ThemeId): ClientPackage[] {
  return allPackages.filter((pkg) => pkg.themeId === themeId);
}

export function getPackageBySlug(slug: string): ClientPackage | undefined {
  return allPackages.find((pkg) => pkg.slug === slug);
}

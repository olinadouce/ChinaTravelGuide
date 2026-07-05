'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

export const SIGNUP_BONUS_POINTS = 200;

export interface User {
  id: string;
  name: string;
  avatar: string;
  isMember: boolean;
  points: number;
  unlockedPackages: string[];
}

type UnlockResult = { ok: true } | { ok: false; reason: string };

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (name: string) => void;
  logout: () => void;
  hasPackageUnlocked: (packageId: string) => boolean;
  unlockPackage: (packageId: string, cost: number) => UnlockResult;
  addPoints: (n: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'ctg_user';

function isUser(v: unknown): v is User {
  if (!v || typeof v !== 'object') return false;
  const u = v as Partial<User>;
  return (
    typeof u.id === 'string' &&
    typeof u.name === 'string' &&
    typeof u.avatar === 'string' &&
    typeof u.isMember === 'boolean' &&
    typeof u.points === 'number' &&
    Array.isArray(u.unlockedPackages)
  );
}

function normalizeUser(v: unknown): User | null {
  if (!isUser(v)) return null;
  return {
    id: v.id,
    name: v.name,
    avatar: v.avatar,
    isMember: v.isMember,
    points: v.points,
    unlockedPackages: v.unlockedPackages,
  };
}

export function MockAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(normalizeUser(JSON.parse(stored)));
    } catch {
      // ignore corrupted storage
    }
  }, []);

  const persist = useCallback((next: User | null) => {
    setUser(next);
    if (typeof window === 'undefined') return;
    if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    else localStorage.removeItem(STORAGE_KEY);
  }, []);

  const login = useCallback(
    (name: string) => {
      const newUser: User = {
        id: 'user-' + Date.now(),
        name,
        avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(name)}`,
        isMember: true,
        points: SIGNUP_BONUS_POINTS,
        unlockedPackages: [],
      };
      persist(newUser);
    },
    [persist]
  );

  const logout = useCallback(() => persist(null), [persist]);

  const hasPackageUnlocked = useCallback(
    (packageId: string) => !!user?.unlockedPackages.includes(packageId),
    [user]
  );

  const unlockPackage = useCallback(
    (packageId: string, cost: number): UnlockResult => {
      if (!user) return { ok: false, reason: 'Please sign in first to redeem' };
      if (user.unlockedPackages.includes(packageId))
        return { ok: false, reason: 'This package is already unlocked' };
      if (user.points < cost)
        return { ok: false, reason: `Not enough points (you have ${user.points}, need ${cost})` };
      const next: User = {
        ...user,
        points: user.points - cost,
        unlockedPackages: [...user.unlockedPackages, packageId],
      };
      persist(next);
      return { ok: true };
    },
    [user, persist]
  );

  const addPoints = useCallback(
    (n: number) => {
      if (!user) return;
      const next: User = { ...user, points: user.points + n };
      persist(next);
    },
    [user, persist]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        hasPackageUnlocked,
        unlockPackage,
        addPoints,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within MockAuthProvider');
  return context;
}
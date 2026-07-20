'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { POINTS_RULES, PointsActionType, PointsLedgerEntry } from '@/lib/points-rules';

export const SIGNUP_BONUS_POINTS = POINTS_RULES.SIGNUP_BONUS;

export interface User {
  id: string;
  name: string;
  avatar: string;
  isMember: boolean;
  points: number;
  unlockedPackages: string[];
  /** Per-city action tracking (anti-abuse). */
  actionsUsed: Record<string, true>;
  /** Last day we awarded the daily login bonus (YYYY-MM-DD). */
  lastDailyLoginDate?: string;
  /** Persistent points ledger. */
  ledger: PointsLedgerEntry[];
}

type UnlockResult = { ok: true; ledger: PointsLedgerEntry } | { ok: false; reason: string };
type EarnResult = { ok: true; entry: PointsLedgerEntry } | { ok: false; reason: string };
type EarnPointsOptions = {
  city?: string;
  productId?: string;
  pointsOverride?: number;
  note?: string;
  readSeconds?: number;
  scrollPercent?: number;
  wordDownloaded?: boolean;
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (name: string) => void;
  logout: () => void;
  hasPackageUnlocked: (packageId: string) => boolean;
  unlockPackage: (packageId: string, cost?: number) => UnlockResult;
  /** Award points for an action. Anti-abuse rules are checked here. */
  earnPoints: (actionType: PointsActionType, opts?: EarnPointsOptions) => EarnResult;
  /** Read user-readable ledger (most recent first). */
  getLedger: () => PointsLedgerEntry[];
  addPoints: (n: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'ctg_user_v2';

function isUser(v: unknown): v is User {
  if (!v || typeof v !== 'object') return false;
  const u = v as Partial<User>;
  return (
    typeof u.id === 'string' &&
    typeof u.name === 'string' &&
    typeof u.avatar === 'string' &&
    typeof u.isMember === 'boolean' &&
    typeof u.points === 'number' &&
    Array.isArray(u.unlockedPackages) &&
    typeof u.actionsUsed === 'object' &&
    Array.isArray(u.ledger)
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
    actionsUsed: v.actionsUsed,
    lastDailyLoginDate: v.lastDailyLoginDate,
    ledger: v.ledger,
  };
}

function makeEntry(userId: string, actionType: PointsActionType, pointsChange: number, opts: { city?: string; productId?: string; note?: string } = {}): PointsLedgerEntry {
  return {
    id: `le_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    userId,
    actionType,
    pointsChange,
    relatedCity: opts.city,
    relatedProductId: opts.productId,
    createdAt: Date.now(),
    status: 'confirmed',
    note: opts.note,
  };
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
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
      // First-time signup 鈥?give the welcome bonus and record it in the ledger.
      const welcomeEntry = makeEntry('pending-id', 'signup_bonus', POINTS_RULES.SIGNUP_BONUS, { note: `Welcome, ${name}!` });
      const newUser: User = {
        id: 'user-' + Date.now(),
        name,
        avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(name)}`,
        isMember: true,
        points: POINTS_RULES.SIGNUP_BONUS,
        unlockedPackages: [],
        actionsUsed: {},
        ledger: [{ ...welcomeEntry, userId: 'self' }],
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

  const getLedger = useCallback(() => {
    if (!user) return [];
    return [...user.ledger].sort((a, b) => b.createdAt - a.createdAt);
  }, [user]);

  /**
   * Award points for an action. Returns ok:false if the action is rate-limited
   * (e.g. once per city, once per day). The points are NOT awarded in that case.
   */
  const earnPoints = useCallback(
    (actionType: PointsActionType, opts: EarnPointsOptions = {}): EarnResult => {
      if (!user) return { ok: false, reason: 'Please sign in first' };

      if (actionType === 'browse_free_guide') {
        const readSeconds = opts.readSeconds ?? 0;
        const scrollPercent = opts.scrollPercent ?? 0;
        if (readSeconds < 180 || scrollPercent < 60) {
          return {
            ok: false,
            reason: 'Read this guide for at least 3 minutes and scroll through 60% before claiming.',
          };
        }
      }

      if (actionType === 'save_free_guide' && opts.wordDownloaded !== true) {
        return {
          ok: false,
          reason: 'Download the Word version before claiming this reward.',
        };
      }

      // Anti-abuse: per-city actions
      const city = opts.city;
      const perCityActions: PointsActionType[] = ['browse_free_guide', 'save_free_guide'];
      if (city && perCityActions.includes(actionType)) {
        const key = `${actionType}:${city}`;
        if (user.actionsUsed[key]) {
          return { ok: false, reason: 'You have already claimed this reward for this city.' };
        }
      }

      // Anti-abuse: once per day
      if (actionType === 'daily_login') {
        if (user.lastDailyLoginDate === todayStr()) {
          return { ok: false, reason: 'Daily login bonus already claimed today.' };
        }
      }

      // Determine points
      let points = 0;
      if (actionType === 'signup_bonus') {
        // Should not happen via earnPoints (signup is handled in login), but guard
        return { ok: false, reason: 'Signup bonus is granted automatically on sign up.' };
      } else if (actionType === 'browse_free_guide') {
        points = POINTS_RULES.BROWSE_FREE_GUIDE;
      } else if (actionType === 'save_free_guide') {
        points = POINTS_RULES.SAVE_FREE_GUIDE;
      } else if (actionType === 'share_valid_click') {
        points = POINTS_RULES.SHARE_VALID_CLICK;
      } else if (actionType === 'invite_signup') {
        points = POINTS_RULES.INVITE_SIGNUP;
      } else if (actionType === 'invite_full_guide_unlock') {
        points = POINTS_RULES.INVITE_FULL_GUIDE_UNLOCK;
      } else if (actionType === 'submit_feedback') {
        points = POINTS_RULES.SUBMIT_FEEDBACK;
      } else if (actionType === 'daily_login') {
        points = POINTS_RULES.DAILY_LOGIN;
      } else if (actionType === 'redeem_full_guide') {
        // redeem_full_guide goes through unlockPackage, not earnPoints
        return { ok: false, reason: 'Use unlockPackage to redeem a Full Guide.' };
      } else {
        points = opts.pointsOverride ?? 0;
      }

      if (points <= 0) {
        return { ok: false, reason: 'No points configured for this action.' };
      }

      const entry = makeEntry(user.id, actionType, points, opts);
      const updates: Partial<User> = {
        points: user.points + points,
        ledger: [...user.ledger, entry],
      };
      if (city && perCityActions.includes(actionType)) {
        const key = `${actionType}:${city}`;
        updates.actionsUsed = { ...user.actionsUsed, [key]: true };
      }
      if (actionType === 'daily_login') {
        updates.lastDailyLoginDate = todayStr();
      }

      persist({ ...user, ...updates });
      return { ok: true, entry };
    },
    [user, persist]
  );

  const unlockPackage = useCallback(
    (packageId: string, cost: number = POINTS_RULES.FULL_GUIDE_COST): UnlockResult => {
      if (!user) return { ok: false, reason: 'Please sign in first to redeem' };
      if (user.unlockedPackages.includes(packageId)) {
        return { ok: false, reason: 'This package is already unlocked' };
      }
      if (user.points < cost) {
        return { ok: false, reason: `Not enough points (you have ${user.points}, need ${cost})` };
      }
      const entry = makeEntry(user.id, 'redeem_full_guide', -cost, { productId: packageId, note: `Unlocked ${packageId}` });
      const next: User = {
        ...user,
        points: user.points - cost,
        unlockedPackages: [...user.unlockedPackages, packageId],
        ledger: [...user.ledger, entry],
      };
      persist(next);
      return { ok: true, ledger: entry };
    },
    [user, persist]
  );

  const addPoints = useCallback(
    (n: number) => {
      if (!user) return;
      const entry = makeEntry(user.id, 'admin_adjust', n, { note: 'Manual adjustment' });
      const next: User = { ...user, points: user.points + n, ledger: [...user.ledger, entry] };
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
        earnPoints,
        getLedger,
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

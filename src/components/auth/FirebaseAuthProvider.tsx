'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import {
  getLedger as fetchLedger,
  FirestoreUser,
} from '@/lib/firestore-users';
import { authenticatedPost } from '@/lib/authenticated-api';
import { PointsActionType, PointsLedgerEntry } from '@/lib/points-rules';

type Result = { ok: true } | { ok: false; reason: string };
type EarnPointsOptions = {
  city?: string;
  productId?: string;
  note?: string;
  readSeconds?: number;
  scrollPercent?: number;
  wordDownloaded?: boolean;
};

interface AuthContextType {
  user: FirestoreUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  pointsProfileLoading: boolean;
  pointsProfileError: string | null;
  signUp: (email: string, password: string, name: string) => Promise<Result>;
  signIn: (email: string, password: string) => Promise<Result>;
  signInWithGoogle: () => Promise<Result>;
  logout: () => Promise<void>;
  hasPackageUnlocked: (packageId: string) => boolean;
  earnPoints: (
    actionType: PointsActionType,
    opts?: EarnPointsOptions
  ) => Promise<Result>;
  unlockPackage: (packageId: string, cost?: number) => Promise<Result>;
  getLedger: () => Promise<PointsLedgerEntry[]>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function FirebaseAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirestoreUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [pointsProfileLoading, setPointsProfileLoading] = useState(false);
  const [pointsProfileError, setPointsProfileError] = useState<string | null>(null);

  const refreshUser = useCallback(async () => {
    const fbUser = auth.currentUser;
    if (!fbUser) {
      setUser(null);
      return;
    }
    setPointsProfileLoading(true);
    setPointsProfileError(null);
    try {
      const result = await authenticatedPost<{ profile: FirestoreUser }>('/api/account/sync');
      setUser(result.profile);
    } catch (err: any) {
      setPointsProfileError(err?.message ?? 'Failed to refresh Firestore profile.');
    } finally {
      setPointsProfileLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log('[FirebaseAuth] Initializing auth state listener...');
    // 3-second safety timeout. We do not clear this on auth success because it
    // guarantees loading flips to false even if Firestore is hanging.
    const timeoutId = setTimeout(() => {
      console.warn('[FirebaseAuth] Auth init timed out after 3s, forcing loading=false');
      setLoading(false);
    }, 3000);

    const unsubscribe = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
      console.log('[FirebaseAuth] onAuthStateChanged fired. User:', fbUser?.email ?? 'null');
      if (!fbUser) {
        setUser(null);
        setPointsProfileLoading(false);
        setPointsProfileError(null);
        setLoading(false);
        return;
      }

      const minimalUser: FirestoreUser = {
        uid: fbUser.uid,
        email: fbUser.email,
        displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Traveler',
        photoURL: fbUser.photoURL,
        points: 0,
        unlockedPackages: [],
        actionsUsed: {},
        createdAt: null,
        updatedAt: null,
      };
      setUser(minimalUser);
      setLoading(false);
      setPointsProfileLoading(true);
      setPointsProfileError(null);

      const FIRESTORE_TIMEOUT_MS = 45000;
      const hardTimeoutId = window.setTimeout(() => {
        setPointsProfileLoading(false);
        setPointsProfileError('Firebase points sync timed out. Check Firestore rules, network access, or whether Firestore is enabled for this project.');
      }, FIRESTORE_TIMEOUT_MS + 5000);
      const timeoutResult = Symbol('firestore-timeout');
      const withTimeout = <T,>(p: Promise<T>, ms: number): Promise<T | typeof timeoutResult> =>
        Promise.race([
          p,
          new Promise<typeof timeoutResult>((resolve) => setTimeout(() => resolve(timeoutResult), ms)),
        ]);

      try {
        const synced = await withTimeout(
          authenticatedPost<{ profile: FirestoreUser }>('/api/account/sync'),
          FIRESTORE_TIMEOUT_MS
        );
        if (synced === timeoutResult) throw new Error('Timed out while syncing your points profile.');
        setUser(synced.profile);
      } catch (err: any) {
        setPointsProfileError(err?.message ?? 'Failed to sync your Firestore points profile.');
        console.error('[FirebaseAuth] Failed to load user doc (UI still works):', err);
      } finally {
        window.clearTimeout(hardTimeoutId);
        setPointsProfileLoading(false);
      }
    });
    return () => {
      clearTimeout(timeoutId);
      unsubscribe();
    };
  }, []);

  const signUp = useCallback(async (email: string, password: string, name: string): Promise<Result> => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name) {
        await updateProfile(cred.user, { displayName: name });
      }
      return { ok: true };
    } catch (err: any) {
      return { ok: false, reason: err.message ?? 'Sign-up failed' };
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string): Promise<Result> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { ok: true };
    } catch (err: any) {
      return { ok: false, reason: err.message ?? 'Sign-in failed' };
    }
  }, []);

  const signInWithGoogle = useCallback(async (): Promise<Result> => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      return { ok: true };
    } catch (err: any) {
      return { ok: false, reason: err.message ?? 'Google sign-in failed' };
    }
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
    setUser(null);
  }, []);

  const hasPackageUnlocked = useCallback(
    (packageId: string) => !!user?.unlockedPackages?.includes(packageId),
    [user]
  );

  const earnPoints = useCallback(
    async (
      actionType: PointsActionType,
      opts: EarnPointsOptions = {}
    ): Promise<Result> => {
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

      let actionKey: string | undefined;
      if (opts.city && (actionType === 'browse_free_guide' || actionType === 'save_free_guide')) {
        actionKey = `${actionType}:${opts.city}`;
        if (user.actionsUsed?.[actionKey]) {
          return { ok: false, reason: 'You have already claimed this reward for this city.' };
        }
      }
      try {
        await authenticatedPost('/api/points/claim', {
          actionType,
          city: opts.city,
          evidence: {
            readSeconds: opts.readSeconds,
            scrollPercent: opts.scrollPercent,
            wordDownloaded: opts.wordDownloaded,
          },
        });
        await refreshUser();
        return { ok: true };
      } catch (err: any) {
        return { ok: false, reason: err?.message ?? 'Points claim failed.' };
      }
    },
    [user, refreshUser]
  );

  const unlockPackage = useCallback(
    async (packageId: string, _displayCost?: number): Promise<Result> => {
      if (!user) return { ok: false, reason: 'Please sign in first to redeem' };
      if (user.unlockedPackages?.includes(packageId)) {
        return { ok: false, reason: 'This package is already unlocked' };
      }
      try {
        await authenticatedPost('/api/packages/unlock', { packageId });
        await refreshUser();
        return { ok: true };
      } catch (err: any) {
        return { ok: false, reason: err.message ?? 'Unlock failed' };
      }
    },
    [user, refreshUser]
  );

  const getLedger = useCallback(async () => {
    if (!user) return [];
    return fetchLedger(user.uid);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        pointsProfileLoading,
        pointsProfileError,
        signUp,
        signIn,
        signInWithGoogle,
        logout,
        hasPackageUnlocked,
        earnPoints,
        unlockPackage,
        getLedger,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within FirebaseAuthProvider');
  return ctx;
}

'use client';
import { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, Mail, Lock, User, AlertCircle, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/auth/FirebaseAuthProvider';
import { POINTS_RULES } from '@/lib/points-rules';

type Mode = 'signin' | 'signup';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo') || '/packages';

  const { signIn, signUp, signInWithGoogle, user, loading } = useAuth();

  const [mode, setMode] = useState<Mode>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showDebug, setShowDebug] = useState(false);

  // Detect the most common Firebase error and give actionable advice
  function friendlyError(msg: string): string {
    if (!msg) return 'Authentication failed';
    if (msg.includes('api-key-not-valid')) {
      return 'Firebase API key is invalid. Check NEXT_PUBLIC_FIREBASE_API_KEY in Vercel env vars.';
    }
    if (msg.includes('auth/unauthorized-domain') || msg.includes('auth-domain') || msg.includes('400')) {
      return 'This domain is not authorized. Add it in Firebase Console → Authentication → Settings → Authorized domains.';
    }
    if (msg.includes('auth/email-already-in-use')) {
      return 'This email is already registered. Try signing in instead.';
    }
    if (msg.includes('auth/invalid-email')) {
      return 'Invalid email address format.';
    }
    if (msg.includes('auth/weak-password')) {
      return 'Password is too weak. Use at least 6 characters.';
    }
    if (msg.includes('auth/invalid-credential') || msg.includes('wrong-password')) {
      return 'Incorrect email or password.';
    }
    if (msg.includes('auth/too-many-requests')) {
      return 'Too many failed attempts. Please try again later.';
    }
    if (msg.includes('auth/popup-closed-by-user')) {
      return 'Sign-in popup was closed before completing.';
    }
    return msg;
  }
  const [pending, setPending] = useState(false);

  // Redirect when auth state becomes available (handles both pre-existing and freshly-signed-in users)
  useEffect(() => {
    if (!loading && user) {
      router.push(returnTo);
    }
  }, [user, loading, router, returnTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      if (mode === 'signup') {
        const result = await signUp(email.trim(), password, name.trim() || email.split('@')[0]);
        if (!result.ok) {
          setError(result.reason);
          setPending(false);
          return;
        }
      } else {
        const result = await signIn(email.trim(), password);
        if (!result.ok) {
          setError(result.reason);
          setPending(false);
          return;
        }
      }
      // Wait for Firebase auth state to propagate, then redirect
      // The useEffect above will fire once user state is set
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
      setPending(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setPending(true);
    try {
      const result = await signInWithGoogle();
      if (!result.ok) {
        setError(result.reason);
        setPending(false);
        return;
      }
      // useEffect handles redirect once user state propagates
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed');
      setPending(false);
    }
  };

  // Show loading while Firebase is initializing the auth state
  if (loading) {
    return (
      <div className="mx-auto max-w-md rounded-[28px] bg-white dark:bg-secondary-900 p-12 text-center shadow-md">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-sm text-secondary-600 dark:text-secondary-300">Loading…</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-md overflow-hidden rounded-[28px] bg-white dark:bg-secondary-900 p-8 shadow-md"
    >
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <User className="h-8 w-8 text-primary" />
        </div>
        <h1 className="mt-4 text-2xl font-bold">
          {mode === 'signin' ? 'Welcome back' : 'Create your account'}
        </h1>
        <p className="mt-2 text-sm text-secondary-600 dark:text-secondary-300">
          {mode === 'signup' ? 'Sign up and get' : 'Sign in to use your'}{' '}
          <span className="inline-flex items-center gap-1 font-bold text-accent">
            <Coins className="h-3.5 w-3.5" />
            {POINTS_RULES.SIGNUP_BONUS} bonus points
          </span>
          , redeemable for paid travel packages.
        </p>
      </div>

      {/* Google sign-in */}
      <button
        type="button"
        onClick={handleGoogle}
        disabled={pending}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 px-5 py-2.5 text-sm font-bold text-secondary-800 dark:text-secondary-100 shadow-sm transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-secondary-200" />
        <span className="text-xs uppercase tracking-wider text-secondary-500 dark:text-secondary-400">or</span>
        <div className="h-px flex-1 bg-secondary-200" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-200">Display name</label>
            <div className="relative mt-1">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field w-full pl-9"
                placeholder="How should we call you?"
                autoComplete="name"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-200">Email</label>
          <div className="relative mt-1">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field w-full pl-9"
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-200">Password</label>
          <div className="relative mt-1">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field w-full pl-9"
              placeholder={mode === 'signup' ? 'At least 6 characters' : 'Your password'}
              required
              minLength={6}
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
            />
          </div>
        </div>

        {error && (
          <div className="flex flex-col gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
            <div className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
              <span className="flex-1">{friendlyError(error)}</span>
            </div>
            <button
              type="button"
              onClick={() => setShowDebug((s) => !s)}
              className="self-start text-[10px] text-red-500 underline hover:text-red-700"
            >
              {showDebug ? 'Hide' : 'Show'} technical details
            </button>
            {showDebug && (
              <pre className="overflow-x-auto rounded bg-red-100/50 px-2 py-1 font-mono text-[10px] leading-relaxed">
                {error}
              </pre>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="btn-primary inline-flex w-full items-center justify-center gap-2"
        >
          {pending && <Loader2 className="h-4 w-4 animate-spin" />}
          {pending
            ? 'Please wait...'
            : mode === 'signin'
              ? `Sign in`
              : `Create account & get ${POINTS_RULES.SIGNUP_BONUS} pts`}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-secondary-600 dark:text-secondary-300">
        {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button
          type="button"
          onClick={() => {
            setMode(mode === 'signin' ? 'signup' : 'signin');
            setError(null);
          }}
          className="font-bold text-primary hover:underline"
        >
          {mode === 'signin' ? 'Sign up' : 'Sign in'}
        </button>
      </p>
    </motion.div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f7f1e8] dark:bg-[#0b1220] pt-20">
      <section className="container-main py-12">
        <Suspense
          fallback={
            <div className="mx-auto max-w-md rounded-[28px] bg-white dark:bg-secondary-900 p-8 text-center text-sm text-secondary-500 dark:text-secondary-400 shadow-md">
              Loading…
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </section>
    </div>
  );
}

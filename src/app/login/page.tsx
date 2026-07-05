'use client';
import { Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, User } from 'lucide-react';
import { useAuth, SIGNUP_BONUS_POINTS } from '@/components/auth/MockAuthProvider';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const [name, setName] = useState('');
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo') || '/packages';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name.trim());
      router.push(returnTo);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-md overflow-hidden rounded-[28px] bg-white p-8 shadow-md"
    >
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <User className="h-8 w-8 text-primary" />
        </div>
        <h1 className="mt-4 text-2xl font-bold">Welcome back</h1>
        <p className="mt-2 text-sm text-secondary-600">
          Sign in to receive{' '}
          <span className="inline-flex items-center gap-1 font-bold text-accent">
            <Coins className="h-3.5 w-3.5" />
            {SIGNUP_BONUS_POINTS} bonus points
          </span>
          , redeemable for paid travel packages.
        </p>
      </div>

      <form onSubmit={handleLogin} className="mt-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-secondary-700">
            Your name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field mt-1 w-full"
            placeholder="Enter any name (demo build, no password)"
            required
          />
        </div>

        <button type="submit" className="btn-primary w-full">
          Sign in &amp; get {SIGNUP_BONUS_POINTS} pts
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-secondary-500">
        This is a demo login — no password required. You'll be redirected to{' '}
        <span className="font-medium text-secondary-700">{decodeURIComponent(returnTo)}</span> after signing in.
      </p>
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f7f1e8] pt-20">
      <section className="container-main py-12">
        <Suspense
          fallback={
            <div className="mx-auto max-w-md rounded-[28px] bg-white p-8 text-center text-sm text-secondary-500 shadow-md">
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
'use client';

import Link from 'next/link';
import { LockOpen, PackageOpen } from 'lucide-react';

import { useAuth } from '@/components/auth/FirebaseAuthProvider';
import { PackageCard } from '@/components/packages/PackageCard';
import { getAllPackages } from '@/data/packages';

export default function MyPackagesPage() {
  const { user, isAuthenticated, loading, pointsProfileLoading } = useAuth();
  const unlockedPackages = user
    ? getAllPackages().filter((pkg) => user.unlockedPackages.includes(pkg.id))
    : [];

  if (loading || pointsProfileLoading) {
    return (
      <main className="min-h-screen bg-[#f7f1e8] px-5 pb-20 pt-32 dark:bg-[#0b1220]">
        <div className="mx-auto max-w-7xl">
          <div className="h-10 w-56 animate-pulse rounded-full bg-secondary-200 dark:bg-secondary-800" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="h-[30rem] animate-pulse rounded-3xl bg-white dark:bg-secondary-900" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f7f1e8] px-5 pb-20 pt-32 dark:bg-[#0b1220]">
        <section className="w-full max-w-xl rounded-3xl bg-white p-10 text-center shadow-sm dark:bg-secondary-900">
          <LockOpen className="mx-auto h-12 w-12 text-primary" aria-hidden="true" />
          <h1 className="mt-5 font-serif text-4xl font-bold text-secondary-900 dark:text-white">My Packages</h1>
          <p className="mt-4 text-lg text-secondary-600 dark:text-secondary-300">
            Sign in to view and reopen all of your unlocked travel packages.
          </p>
          <Link href="/login?returnTo=/account/packages" className="btn-primary mt-7 inline-flex">
            Sign in
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f1e8] pb-20 pt-24 dark:bg-[#0b1220]">
      <section className="container-main py-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-primary">Member account</p>
            <h1 className="mt-1 font-serif text-4xl font-bold text-secondary-900 dark:text-white">
              My Packages
            </h1>
            <p className="mt-2 text-secondary-600 dark:text-secondary-300">
              Reopen your unlocked guides whenever you need them.
            </p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary-700 shadow-sm dark:bg-secondary-900 dark:text-secondary-200">
            <PackageOpen className="h-4 w-4 text-primary" aria-hidden="true" />
            {unlockedPackages.length} unlocked
          </div>
        </div>

        <nav className="mt-6 flex flex-wrap gap-2 border-b border-secondary-200 dark:border-secondary-700" aria-label="Account sections">
          <Link href="/account/points" className="px-4 py-3 text-sm font-semibold text-secondary-500 hover:text-primary">Points</Link>
          <Link href="/account/posts" className="px-4 py-3 text-sm font-semibold text-secondary-500 hover:text-primary">My Posts</Link>
          <span className="border-b-2 border-primary px-4 py-3 text-sm font-bold text-primary">My Packages</span>
        </nav>

        {unlockedPackages.length > 0 ? (
          <section className="mt-8 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {unlockedPackages.map((pkg, index) => (
              <PackageCard key={pkg.id} pkg={pkg} index={index} unlocked />
            ))}
          </section>
        ) : (
          <section className="mt-8 rounded-3xl bg-white px-6 py-16 text-center shadow-sm dark:bg-secondary-900 sm:px-12">
            <PackageOpen className="mx-auto h-12 w-12 text-secondary-300 dark:text-secondary-600" aria-hidden="true" />
            <h2 className="mt-5 font-serif text-3xl font-bold text-secondary-900 dark:text-white">
              No unlocked packages yet
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-secondary-600 dark:text-secondary-300">
              Explore our travel packages and use your points to unlock the full guides.
            </p>
            <Link href="/packages" className="btn-primary mt-7 inline-flex">
              Browse packages
            </Link>
          </section>
        )}
      </section>
    </main>
  );
}

'use client';
import { useAuth } from './FirebaseAuthProvider';
import { Lock } from 'lucide-react';
import Link from 'next/link';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Lock className="h-12 w-12 text-secondary-400" />
        <h3 className="mt-4 text-xl font-bold">Member-only content</h3>
        <p className="mt-2 text-secondary-600 dark:text-secondary-300">Please log in to access the forum.</p>
        <Link href="/login" className="btn-primary mt-6">Log In</Link>
      </div>
    );
  }

  return <>{children}</>;
}

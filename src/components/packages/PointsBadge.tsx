'use client';

import Link from 'next/link';
import { Coins } from 'lucide-react';
import { useAuth } from '@/components/auth/MockAuthProvider';
import { cn } from '@/lib/utils';

interface PointsBadgeProps {
  scrolled: boolean;
}

export function PointsBadge({ scrolled }: PointsBadgeProps) {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated || !user) return null;
  return (
    <Link
      href="/packages"
      aria-label={`Current points: ${user.points}`}
      className={cn(
        'hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold shadow-sm transition-colors sm:inline-flex',
        scrolled
          ? 'bg-accent/15 text-accent-700 hover:bg-accent/20'
          : 'bg-white/15 text-black hover:bg-white/25'
      )}
    >
      <Coins className="h-4 w-4" />
      <span>{user.points}</span>
      <span className="text-xs font-medium opacity-70">pts</span>
    </Link>
  );
}
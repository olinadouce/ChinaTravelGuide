'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, Monitor, Moon, Search, Sun, User, X } from 'lucide-react';
import { popularSearches, siteNavigation } from '@/data/content';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/components/auth/FirebaseAuthProvider';
import { PointsBadge } from '@/components/packages/PointsBadge';
import { LanguageTranslator } from '@/components/layout/LanguageTranslator';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isUserMenuOpen) return;
    const handler = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isUserMenuOpen]);

  const ThemeIcon = resolvedTheme === 'dark' ? Moon : resolvedTheme === 'light' ? Sun : Monitor;

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-[#f8f4ec]/94 shadow-sm backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-secondary-900/92',
          isScrolled && 'shadow-lg'
        )}
      >
        <nav className="container-main">
          <div className="flex h-16 items-center justify-between md:h-20">
            <Link href="/" className="group flex items-center gap-3" aria-label="seechinaroute home">
              <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-[#f8f4ec] shadow-sm ring-1 ring-black/5 transition-transform group-hover:scale-105 dark:bg-secondary-800 dark:ring-white/10 md:h-12 md:w-12">
                <img
                  src="/see-china-route-mark.svg"
                  alt=""
                  className="h-full w-full"
                />
              </span>
              <span className="hidden sm:block">
                <span className="block font-serif text-xl font-bold leading-tight text-secondary-900 dark:text-white md:text-2xl">
                  seechinaroute
                </span>
                <span className="block text-xs uppercase tracking-[0.22em] text-secondary-500 dark:text-secondary-300">
                  See China Route
                </span>
              </span>
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              {siteNavigation.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    'text-secondary-700 dark:text-secondary-100'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className={cn(
                  'rounded-full p-2.5 transition-colors',
                  'hover:bg-secondary-100 dark:hover:bg-secondary-800'
                )}
                aria-label="Toggle theme"
              >
                <ThemeIcon className="h-5 w-5 text-secondary-700 dark:text-white" />
              </button>

              <button
                onClick={() => setIsSearchOpen(true)}
                className={cn(
                  'rounded-full p-2.5 transition-colors',
                  'hover:bg-secondary-100 dark:hover:bg-secondary-800'
                )}
                aria-label="Open search"
              >
                <Search className="h-5 w-5 text-secondary-700 dark:text-white" />
              </button>

              <PointsBadge scrolled={isScrolled} />

              {isAuthenticated ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen((v) => !v)}
                    aria-label="Account menu"
                    className={cn(
                      'flex items-center gap-2 rounded-full px-2 py-1.5 text-sm font-medium transition-colors',
                      'hover:bg-secondary-100 dark:hover:bg-secondary-800'
                    )}
                  >
                    <img
                      src={user?.photoURL ?? undefined}
                      alt={user?.displayName ?? ''}
                      className="h-7 w-7 rounded-full ring-2 ring-white/40"
                    />
                    <span
                      className="hidden text-secondary-700 dark:text-white md:inline"
                    >
                      {user?.displayName}
                    </span>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-secondary-900 shadow-xl">
                      <div className="border-b border-secondary-100 dark:border-secondary-700 p-4">
                        <p className="text-sm font-bold text-secondary-900 dark:text-white">{user?.displayName}</p>
                        <p className="mt-1 text-xs text-secondary-500 dark:text-secondary-400">
                          Points balance: <span className="font-bold text-accent">{user?.points}</span>
                        </p>
                        <p className="mt-1 text-xs text-secondary-500 dark:text-secondary-400">
                          Unlocked: {user?.unlockedPackages.length} package
                          {user?.unlockedPackages.length === 1 ? '' : 's'}
                        </p>
                      </div>
                      <Link
                        href="/account/points"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-3 text-sm font-medium text-secondary-700 transition-colors hover:bg-stone-50 dark:text-secondary-200 dark:hover:bg-secondary-800"
                      >
                        Points account
                      </Link>
                      <Link
                        href="/packages"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-3 text-sm font-medium text-secondary-700 transition-colors hover:bg-stone-50 dark:text-secondary-200 dark:hover:bg-secondary-800"
                      >
                        Browse packages
                      </Link>
                      <button
                        onClick={() => {
                          void logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="block w-full px-4 py-3 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950/30"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-colors',
                    'bg-primary text-white shadow-md shadow-primary/25 hover:bg-primary-700'
                  )}
                >
                  <User className="h-4 w-4" /> Sign in
                </Link>
              )}

              <LanguageTranslator />

              <button
                onClick={() => setIsOpen((value) => !value)}
                className={cn(
                  'rounded-full p-2.5 transition-colors md:hidden',
                  'hover:bg-secondary-100 dark:hover:bg-secondary-800'
                )}
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="h-6 w-6 text-secondary-900 dark:text-white" />
                ) : (
                  <Menu className="h-6 w-6 text-secondary-900 dark:text-white" />
                )}
              </button>
            </div>
          </div>
        </nav>

        <div
          className={cn(
            'overflow-hidden border-t border-black/5 bg-white transition-all duration-300 dark:border-white/10 dark:bg-secondary-900 md:hidden',
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="container-main space-y-2 py-4">
            {isAuthenticated ? (
              <div className="mb-2 flex items-center gap-3 rounded-2xl bg-stone-50 dark:bg-secondary-800 px-4 py-3">
                <img
                  src={user?.photoURL ?? undefined}
                  alt={user?.displayName ?? ''}
                  className="h-9 w-9 rounded-full"
                />
                <div className="flex-1">
                  <p className="text-sm font-bold text-secondary-900 dark:text-white">{user?.displayName}</p>
                  <p className="text-xs text-secondary-500 dark:text-secondary-400">
                    {user?.points} pts 路 {user?.unlockedPackages.length} unlocked
                  </p>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="mb-2 block rounded-2xl bg-primary px-4 py-3 text-center font-bold text-white"
              >
                Sign in / Sign up
              </Link>
            )}
            {siteNavigation.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-2xl px-4 py-3 font-medium text-secondary-700 transition-colors hover:bg-secondary-100 hover:text-primary dark:text-secondary-100 dark:hover:bg-secondary-800"
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated && (
              <>
                <Link
                  href="/account/points"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-2xl px-4 py-3 font-medium text-secondary-700 transition-colors hover:bg-secondary-100 hover:text-primary dark:text-secondary-100 dark:hover:bg-secondary-800"
                >
                  Points account
                </Link>
                <button
                  onClick={() => {
                    void logout();
                    setIsOpen(false);
                  }}
                  className="block w-full rounded-2xl px-4 py-3 text-left font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950/30"
                >
                  Sign out
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm" onClick={() => setIsSearchOpen(false)}>
          <div className="container-main pt-24" onClick={(event) => event.stopPropagation()}>
            <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-secondary-800">
              <div className="flex items-center gap-4 border-b border-secondary-100 p-5 dark:border-secondary-700">
                <Search className="h-6 w-6 text-secondary-400" />
                <input
                  type="text"
                  placeholder="Search destinations, journeys, and practical travel advice"
                  className="flex-1 bg-transparent text-lg text-secondary-900 outline-none placeholder:text-secondary-400 dark:text-white"
                  autoFocus
                />
                <button onClick={() => setIsSearchOpen(false)} className="rounded-full p-2 hover:bg-secondary-100 dark:hover:bg-secondary-700">
                  <X className="h-5 w-5 text-secondary-500 dark:text-secondary-400" />
                </button>
              </div>

              <div className="p-5">
                <p className="mb-3 text-sm text-secondary-500 dark:text-secondary-400">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <Link
                      key={term}
                      href={`/destinations?q=${encodeURIComponent(term)}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="rounded-full bg-secondary-100 px-4 py-2 text-sm text-secondary-700 transition-colors hover:bg-primary hover:text-white dark:bg-secondary-700 dark:text-secondary-100"
                    >
                      {term}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

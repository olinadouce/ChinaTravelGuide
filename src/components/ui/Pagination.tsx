'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  if (totalPages <= 1) return null;

  const generatePages = () => {
    const pages: (number | 'ellipsis')[] = [];
    const delta = 1;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== 'ellipsis') {
        pages.push('ellipsis');
      }
    }

    return pages;
  };

  return (
    <nav className="mt-12 flex items-center justify-center gap-2">
      <Link
        href={`${baseUrl}?page=${currentPage - 1}`}
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-full transition-colors',
          currentPage === 1
            ? 'pointer-events-none text-secondary-400'
            : 'text-secondary-600 hover:bg-secondary-100'
        )}
        aria-disabled={currentPage === 1}
      >
        <ChevronLeft className="h-5 w-5" />
      </Link>

      {generatePages().map((page, index) =>
        page === 'ellipsis' ? (
          <span key={`ellipsis-${index}`} className="h-10 px-2 text-secondary-400">
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={`${baseUrl}?page=${page}`}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors',
              page === currentPage
                ? 'bg-primary text-white'
                : 'text-secondary-600 hover:bg-secondary-100'
            )}
          >
            {page}
          </Link>
        )
      )}

      <Link
        href={`${baseUrl}?page=${currentPage + 1}`}
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-full transition-colors',
          currentPage === totalPages
            ? 'pointer-events-none text-secondary-400'
            : 'text-secondary-600 hover:bg-secondary-100'
        )}
        aria-disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-5 w-5" />
      </Link>
    </nav>
  );
}
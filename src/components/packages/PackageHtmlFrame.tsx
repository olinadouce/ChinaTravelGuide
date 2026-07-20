'use client';

import { useEffect, useRef, useState } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';
import { applyIframeTheme } from './iframeTheme';

interface PackageHtmlFrameProps {
  html: string;
  /** Initial minimum height (px). iframe will resize to fit content once loaded. */
  minHeight?: number;
  className?: string;
  title?: string;
}

/**
 * Renders a complete HTML travel package via <iframe srcDoc>, preserving
 * the original layout, styles and assets 100%.
 */
export function PackageHtmlFrame({
  html,
  minHeight = 1400,
  className,
  title = 'travel-package',
}: PackageHtmlFrameProps) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState<number>(minHeight);
  const [expanded, setExpanded] = useState(false);
  const { resolvedTheme } = useTheme();

  // Auto-fit iframe height to its srcdoc content.
  useEffect(() => {
    const iframe = ref.current;
    if (!iframe || !html) return;

    const handleLoad = () => {
      try {
        const doc = iframe.contentDocument;
        if (!doc) return;
        applyIframeTheme(doc, resolvedTheme);
        const body = doc.body;
        const htmlEl = doc.documentElement;
        const computed = Math.max(
          body?.scrollHeight ?? 0,
          htmlEl?.scrollHeight ?? 0
        );
        if (computed > 0) setHeight(computed + 16);
      } catch {
        // Cross-origin or sandbox restriction — ignore.
      }
    };

    iframe.addEventListener('load', handleLoad);
    // Try once immediately; srcDoc writes don't always fire load.
    handleLoad();
    return () => iframe.removeEventListener('load', handleLoad);
  }, [html, resolvedTheme]);

  if (!html) {
    return (
      <div
        className={cn(
          'flex min-h-[200px] items-center justify-center rounded-2xl border border-dashed border-secondary-300 bg-stone-50 dark:bg-secondary-800 p-8 text-sm text-secondary-500 dark:text-secondary-400',
          className
        )}
      >
        Content not available yet — please check back soon.
      </div>
    );
  }

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-secondary-900 shadow-md shadow-black/5',
        expanded && 'fixed inset-4 z-[60] m-0 h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] rounded-3xl shadow-2xl',
        className
      )}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-secondary-900/80 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur transition-opacity hover:bg-secondary-900 group-hover:opacity-100"
        aria-label={expanded ? 'Exit fullscreen' : 'View fullscreen'}
      >
        {expanded ? (
          <>
            <Minimize2 className="h-3.5 w-3.5" /> Exit fullscreen
          </>
        ) : (
          <>
            <Maximize2 className="h-3.5 w-3.5" /> View fullscreen
          </>
        )}
      </button>

      <iframe
        ref={ref}
        title={title}
        srcDoc={html}
        sandbox="allow-same-origin"
        className="block w-full border-0 bg-white dark:bg-secondary-900"
        style={{ height: expanded ? '100%' : `${height}px` }}
      />
    </div>
  );
}

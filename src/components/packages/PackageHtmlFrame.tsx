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
 * Some paid guides ship with anchor links that point at placeholder hashes
 * (#hotel-detail, …). With allow-popups enabled these open a new tab that goes
 * nowhere, leaving the traveller staring at a blank page. Inject a small
 * bridge that finds any <a> with an empty / hash-only href, walks up the DOM
 * for the nearest heading, and rewrites the href to a Booking.com search
 * so the new tab lands on a real page.
 *
 * Only links whose href is currently empty / a fragment are touched, so
 * guides that already carry real URLs (or were materialised by the Guilin
 * helper) are left alone.
 */
const PAID_GUIDE_LINK_FALLBACK = `<script>(function(){function r(){var l=document.querySelectorAll('a[href]');l.forEach(function(a){var h=a.getAttribute('href')||'';if(!h||h.charAt(0)==='#'){var n='';var p=a;while(p&&p!==document.body){var hd=p.querySelector('h1,h2,h3,h4,h5,h6');if(hd){n=(hd.textContent||'').trim();break;}p=p.parentElement;}if(n){a.setAttribute('href','https://www.booking.com/searchresults.html?ss='+encodeURIComponent(n));a.setAttribute('target','_blank');a.setAttribute('rel','noopener noreferrer');}}});}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',r);}else{r();}setTimeout(r,200);setTimeout(r,800);})();</script>`;

/**
 * Renders a complete HTML travel package in an iframe, preserving the
 * original layout, styles and assets. A Blob URL is used instead of srcDoc
 * because several paid guides contain more than 20 MB of embedded images.
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

  // Load the HTML as a real document URL. Passing very large documents through
  // the iframe srcDoc attribute can leave Chromium with a blank or stalled
  // frame, while a Blob URL lets the browser parse it as a normal document.
  useEffect(() => {
    const iframe = ref.current;
    if (!iframe || !html) return;

    const documentUrl = URL.createObjectURL(
      new Blob([PAID_GUIDE_LINK_FALLBACK + html], { type: 'text/html;charset=utf-8' })
    );
    iframe.src = documentUrl;

    return () => {
      iframe.removeAttribute('src');
      URL.revokeObjectURL(documentUrl);
    };
  }, [html]);

  // Auto-fit the iframe height to the loaded guide document.
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
        sandbox="allow-same-origin allow-scripts allow-popups"
        className="block w-full border-0 bg-white dark:bg-secondary-900"
        style={{ height: expanded ? '100%' : `${height}px` }}
      />
    </div>
  );
}

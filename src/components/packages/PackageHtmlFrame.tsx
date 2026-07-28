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
 * Some paid guides ship with placeholder navigation that point at empty
 * hashes (#hotel-detail, …) or are bare arrow buttons with no destination
 * at all. Once allow-popups is enabled these open a new tab that goes
 * nowhere, leaving the traveller staring at a blank page. Inject a small
 * bridge that removes any <a> with an empty / hash-only href and any
 * bare chevron-only button so the broken controls disappear instead of
 * silently failing.
 *
 * Links with real http(s), mailto, or tel URLs are left alone, and
 * guides that already carry valid URLs (or were materialised by the
 * Guilin helper) are untouched.
 */
const PAID_GUIDE_LINK_FALLBACK = `<script>(function(){function kill(el){if(!el||el.dataset.ctgKilled==='1')return;el.dataset.ctgKilled='1';el.style.display='none';el.style.pointerEvents='none';el.setAttribute('aria-hidden','true');el.removeAttribute('href');}function isPlaceholder(h){if(!h)return true;if(h.charAt(0)==='#')return true;return false;}function run(){var links=document.querySelectorAll('a[href]');links.forEach(function(a){var h=a.getAttribute('href')||'';var isReal=/^https?:\\/\\//i.test(h)||/^mailto:/i.test(h)||/^tel:/i.test(h);if(!isReal&&isPlaceholder(h))kill(a);});var arrowPattern=/^[\\s\\u00A0›»‹«→←↑↓►◄]+$/;document.querySelectorAll('button,a,[role="button"]').forEach(function(el){if(el.tagName==='A'&&el.dataset.ctgKilled==='1')return;var t=(el.textContent||'').replace(/\\u00A0/g,'').trim();if(arrowPattern.test(t)){var hasRealHref=false;if(el.tagName==='A'){var hh=el.getAttribute('href')||'';if(/^https?:\\/\\//i.test(hh)||/^mailto:/i.test(hh)||/^tel:/i.test(hh))hasRealHref=true;}if(!hasRealHref)kill(el);}});}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',run);}else{run();}setTimeout(run,100);setTimeout(run,500);setTimeout(run,1500);})();</script>`;

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

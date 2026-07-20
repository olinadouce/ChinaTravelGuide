'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { applyIframeTheme } from './iframeTheme';

interface ThemeAwareIframeProps {
  src: string;
  title: string;
  className?: string;
  minHeight?: number;
}

export function ThemeAwareIframe({
  src,
  title,
  className = 'w-full border-0',
  minHeight = 1800,
}: ThemeAwareIframeProps) {
  const ref = useRef<HTMLIFrameElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const iframe = ref.current;
    if (!iframe) return;

    const syncTheme = () => {
      try {
        if (iframe.contentDocument) {
          applyIframeTheme(iframe.contentDocument, resolvedTheme);
        }
      } catch {
        // The packaged guides are same-origin. Keep the iframe usable if that changes.
      }
    };

    iframe.addEventListener('load', syncTheme);
    syncTheme();
    return () => iframe.removeEventListener('load', syncTheme);
  }, [resolvedTheme, src]);

  return (
    <iframe
      ref={ref}
      src={src}
      title={title}
      className={`${className} bg-white dark:bg-secondary-900`}
      style={{ minHeight }}
    />
  );
}

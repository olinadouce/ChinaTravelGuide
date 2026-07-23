'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/hooks/useTheme';

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
      iframe.contentWindow?.postMessage(
        { type: 'ctg:set-theme', theme: resolvedTheme },
        '*'
      );
    };

    const handleMessage = (event: MessageEvent) => {
      if (
        event.source === iframe.contentWindow &&
        event.data?.type === 'ctg:frame-ready'
      ) {
        syncTheme();
      }
    };

    iframe.addEventListener('load', syncTheme);
    window.addEventListener('message', handleMessage);
    syncTheme();
    return () => {
      iframe.removeEventListener('load', syncTheme);
      window.removeEventListener('message', handleMessage);
    };
  }, [resolvedTheme, src]);

  return (
    <iframe
      ref={ref}
      src={src}
      title={title}
      sandbox="allow-scripts allow-downloads allow-top-navigation-by-user-activation"
      className={`${className} bg-white dark:bg-secondary-900`}
      style={{ minHeight }}
    />
  );
}

(() => {
  'use strict';

  const STYLE_ID = 'china-travel-guide-theme-bridge';
  const parentOrigin = (() => {
    try {
      return new URL(document.referrer).origin;
    } catch {
      return null;
    }
  })();

  const themeCss = `
    html[data-ctg-theme="light"] { color-scheme: light; }
    html[data-ctg-theme="dark"] {
      color-scheme: dark;
      --bg: #0b1220 !important;
      --background: #0b1220 !important;
      --paper: #111827 !important;
      --surface: #111827 !important;
      --card: #172033 !important;
      --ink: #f3f4f6 !important;
      --text: #f3f4f6 !important;
      --muted: #9ca3af !important;
      background: #0b1220 !important;
    }
    html[data-ctg-theme="dark"] body {
      background: #0b1220 !important;
      color: #e5e7eb !important;
    }
    html[data-ctg-theme="dark"] :is(
      [class*="bg-white"], [class*="bg-slate-50"], [class*="bg-gray-50"],
      [class*="bg-stone-50"], [class*="bg-amber-50"], [class*="bg-orange-50"],
      .card, .panel, .glass, .content-card
    ) {
      background-color: #111827 !important;
      color: #e5e7eb !important;
      border-color: rgba(255, 255, 255, 0.12) !important;
    }
    html[data-ctg-theme="dark"] :is(
      [class*="text-black"], [class*="text-slate-9"], [class*="text-gray-9"],
      [class*="text-stone-9"], [class*="text-slate-8"], [class*="text-gray-8"]
    ) { color: #f3f4f6 !important; }
    html[data-ctg-theme="dark"] :is(
      [class*="text-slate-7"], [class*="text-gray-7"], [class*="text-stone-7"],
      [class*="text-slate-6"], [class*="text-gray-6"], [class*="text-stone-6"]
    ) { color: #d1d5db !important; }
    html[data-ctg-theme="dark"] :is(input, select, textarea) {
      background: #1f2937 !important;
      color: #f9fafb !important;
      border-color: #4b5563 !important;
    }
    html[data-ctg-theme="dark"] :is(img, video, picture, svg) { color-scheme: normal; }
  `;

  function applyTheme(theme) {
    document.documentElement.dataset.ctgTheme = theme;
    document.documentElement.style.colorScheme = theme;

    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement('style');
      style.id = STYLE_ID;
      style.textContent = themeCss;
      (document.head || document.documentElement).appendChild(style);
    }
  }

  window.addEventListener('message', (event) => {
    if (
      event.source !== window.parent ||
      !parentOrigin ||
      event.origin !== parentOrigin ||
      event.data?.type !== 'ctg:set-theme' ||
      !['light', 'dark'].includes(event.data.theme)
    ) {
      return;
    }

    applyTheme(event.data.theme);
  });

  if (window.parent !== window && parentOrigin) {
    window.parent.postMessage({ type: 'ctg:frame-ready' }, parentOrigin);
  }
})();

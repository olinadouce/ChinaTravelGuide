(() => {
  'use strict';

  const STYLE_ID = 'china-travel-guide-theme-bridge';
  const LIGHT_SURFACE_ATTRIBUTE = 'data-ctg-light-surface';
  const LIGHT_TEXT_ATTRIBUTE = 'data-ctg-light-text';
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
      --ink: #f3f4f6 !important;
      --text: #f3f4f6 !important;
      --muted: #9ca3af !important;
      background: #0b1220 !important;
    }
    html[data-ctg-theme="dark"] body {
      background: #0b1220 !important;
      color: #e5e7eb !important;
    }
    html[data-ctg-theme="dark"] :is(input, select, textarea) {
      background: #1f2937 !important;
      color: #f9fafb !important;
      border-color: #4b5563 !important;
    }
    html[data-ctg-theme="dark"] :is(
      [class*="text-black"], [class*="text-slate-9"], [class*="text-gray-9"],
      [class*="text-stone-9"], [class*="text-slate-8"], [class*="text-gray-8"],
      [class*="text-slate-7"], [class*="text-gray-7"], [class*="text-stone-7"],
      [class*="text-slate-6"], [class*="text-gray-6"], [class*="text-stone-6"]
    ):not([data-ctg-light-text]) {
      color: #e5e7eb !important;
    }
    html[data-ctg-theme="dark"] [data-ctg-light-surface] {
      background-color: #ffffff !important;
      border-color: #d1d5db !important;
      color-scheme: light;
    }
    html[data-ctg-theme="dark"] [data-ctg-light-text] {
      color: #111827 !important;
    }
    html[data-ctg-theme="dark"] :is(img, video, picture, svg) { color-scheme: normal; }
  `;

  function parseComputedColor(value) {
    const channels = value.match(/[\d.]+/g)?.map(Number);
    if (!channels || channels.length < 3) return null;
    return {
      red: channels[0],
      green: channels[1],
      blue: channels[2],
      alpha: channels[3] ?? 1,
    };
  }

  function isNearWhite(color) {
    return (
      color.alpha >= 0.7 &&
      color.red >= 245 &&
      color.green >= 245 &&
      color.blue >= 245
    );
  }

  function markLightSurfaces() {
    const root = document.documentElement;
    if (
      root.dataset.ctgLightSurfacesMarked ||
      !document.body ||
      !window.getComputedStyle
    ) {
      return;
    }

    const elements = Array.from(document.body.querySelectorAll('*'));
    const styles = new Map();
    const getStyle = (element) => {
      if (!styles.has(element)) {
        styles.set(element, window.getComputedStyle(element));
      }
      return styles.get(element);
    };

    for (const element of elements) {
      const background = parseComputedColor(getStyle(element).backgroundColor);
      if (background && isNearWhite(background)) {
        element.setAttribute(LIGHT_SURFACE_ATTRIBUTE, '');
      }
    }

    for (const element of elements) {
      let current = element;
      while (current && current !== document.body) {
        const background = parseComputedColor(getStyle(current).backgroundColor);
        if (background && background.alpha >= 0.7) {
          if (isNearWhite(background)) {
            element.setAttribute(LIGHT_TEXT_ATTRIBUTE, '');
          }
          break;
        }
        current = current.parentElement;
      }
    }

    root.dataset.ctgLightSurfacesMarked = 'true';
  }

  function applyTheme(theme) {
    markLightSurfaces();
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

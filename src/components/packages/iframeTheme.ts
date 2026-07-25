export type IframeTheme = 'light' | 'dark';

const THEME_STYLE_ID = 'china-travel-guide-theme-bridge';
const LIGHT_SURFACE_ATTRIBUTE = 'data-ctg-light-surface';
const LIGHT_TEXT_ATTRIBUTE = 'data-ctg-light-text';
const LIGHT_SURFACES_MARKED_ATTRIBUTE = 'data-ctg-light-surfaces-marked';

const THEME_CSS = `
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
    [class*="text-black"],
    [class*="text-slate-9"],
    [class*="text-gray-9"],
    [class*="text-stone-9"],
    [class*="text-slate-8"],
    [class*="text-gray-8"],
    [class*="text-slate-7"],
    [class*="text-gray-7"],
    [class*="text-stone-7"],
    [class*="text-slate-6"],
    [class*="text-gray-6"],
    [class*="text-stone-6"]
  ):not([${LIGHT_TEXT_ATTRIBUTE}]) {
    color: #e5e7eb !important;
  }
  html[data-ctg-theme="dark"] [${LIGHT_SURFACE_ATTRIBUTE}] {
    background-color: #ffffff !important;
    border-color: #d1d5db !important;
    color-scheme: light;
  }
  html[data-ctg-theme="dark"] [${LIGHT_TEXT_ATTRIBUTE}] {
    color: #111827 !important;
  }
  html[data-ctg-theme="dark"] :is(img, video, picture, svg) {
    color-scheme: normal;
  }
`;

interface ParsedColor {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

function parseComputedColor(value: string): ParsedColor | null {
  const channels = value.match(/[\d.]+/g)?.map(Number);
  if (!channels || channels.length < 3) return null;

  return {
    red: channels[0],
    green: channels[1],
    blue: channels[2],
    alpha: channels[3] ?? 1,
  };
}

function isNearWhite(color: ParsedColor) {
  return (
    color.alpha >= 0.7 &&
    color.red >= 245 &&
    color.green >= 245 &&
    color.blue >= 245
  );
}

function markLightSurfaces(doc: Document) {
  const root = doc.documentElement;
  if (
    root.dataset.ctgLightSurfacesMarked ||
    !doc.body ||
    !doc.defaultView
  ) {
    return;
  }

  const elements = Array.from(doc.body.querySelectorAll<HTMLElement>('*'));
  const styles = new Map<Element, CSSStyleDeclaration>();
  const getStyle = (element: Element) => {
    const cached = styles.get(element);
    if (cached) return cached;
    const computed = doc.defaultView!.getComputedStyle(element);
    styles.set(element, computed);
    return computed;
  };

  for (const element of elements) {
    const background = parseComputedColor(getStyle(element).backgroundColor);
    if (background && isNearWhite(background)) {
      element.setAttribute(LIGHT_SURFACE_ATTRIBUTE, '');
    }
  }

  for (const element of elements) {
    let current: Element | null = element;
    while (current && current !== doc.body) {
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

  root.setAttribute(LIGHT_SURFACES_MARKED_ATTRIBUTE, 'true');
}

export function applyIframeTheme(doc: Document, theme: IframeTheme) {
  markLightSurfaces(doc);
  doc.documentElement.dataset.ctgTheme = theme;
  doc.documentElement.style.colorScheme = theme;

  let style = doc.getElementById(THEME_STYLE_ID) as HTMLStyleElement | null;
  if (!style) {
    style = doc.createElement('style');
    style.id = THEME_STYLE_ID;
    style.textContent = THEME_CSS;
    (doc.head || doc.documentElement).appendChild(style);
  }
}

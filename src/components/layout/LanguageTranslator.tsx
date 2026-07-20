'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Check, ChevronDown, Globe2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'zh-CN', label: 'Chinese Simplified', short: 'ZH' },
  { code: 'zh-TW', label: 'Chinese Traditional', short: 'ZT' },
  { code: 'ja', label: 'Japanese', short: 'JA' },
  { code: 'ko', label: 'Korean', short: 'KO' },
  { code: 'fr', label: 'French', short: 'FR' },
  { code: 'de', label: 'Deutsch', short: 'DE' },
  { code: 'es', label: 'Spanish', short: 'ES' },
  { code: 'it', label: 'Italiano', short: 'IT' },
  { code: 'pt', label: 'Portuguese', short: 'PT' },
  { code: 'ru', label: 'Russian', short: 'RU' },
  { code: 'ar', label: 'Arabic', short: 'AR' },
  { code: 'hi', label: 'Hindi', short: 'HI' },
  { code: 'th', label: 'Thai', short: 'TH' },
  { code: 'vi', label: 'Vietnamese', short: 'VI' },
  { code: 'id', label: 'Bahasa Indonesia', short: 'ID' },
] as const;

const TRANSLATABLE_SELECTOR = 'body';
const EXCLUDED_SELECTOR = 'script, style, noscript, svg, canvas, input, textarea, select, [data-no-translate]';
const BATCH_SIZE = 32;
const STORAGE_KEY = 'ctg_language';

type TranslationStatus = 'idle' | 'translating' | 'ready' | 'error';

type TextRecord = {
  node: Text;
  original: string;
};

const translationCache = new Map<string, string>();

export function LanguageTranslator() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [status, setStatus] = useState<TranslationStatus>('idle');
  const [message, setMessage] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const textRecordsRef = useRef<TextRecord[] | null>(null);
  const runIdRef = useRef(0);
  const pathname = usePathname();

  const currentLanguage = useMemo(
    () => LANGUAGES.find((item) => item.code === language) ?? LANGUAGES[0],
    [language]
  );

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && stored !== 'en') {
      const timer = window.setTimeout(() => {
        void changeLanguage(stored, { refreshTextRecords: true });
      }, 700);
      return () => window.clearTimeout(timer);
    }
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  async function changeLanguage(
    nextLanguage: string,
    options: { refreshTextRecords?: boolean } = {}
  ) {
    const runId = ++runIdRef.current;
    setIsOpen(false);
    setMessage('');

    if (nextLanguage === 'en') {
      runIdRef.current++;
      restoreOriginalText();
      textRecordsRef.current = null;
      setLanguage('en');
      setStatus('idle');
      window.localStorage.setItem(STORAGE_KEY, 'en');
      document.documentElement.lang = 'en';
      return;
    }

    setStatus('translating');
    setMessage(`Translating to ${LANGUAGES.find((item) => item.code === nextLanguage)?.label ?? nextLanguage}...`);
    setLanguage(nextLanguage);
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);
    document.documentElement.lang = nextLanguage;

    try {
      const records = collectTextRecords(options.refreshTextRecords ?? true);
      restoreOriginalText(records);
      if (records.length === 0) {
        setStatus('ready');
        setMessage('No page text found to translate.');
        return;
      }

      for (let index = 0; index < records.length; index += BATCH_SIZE) {
        const batch = records.slice(index, index + BATCH_SIZE);
        const untranslated = batch.filter((record) => !translationCache.has(cacheKey(nextLanguage, record.original)));
        if (untranslated.length > 0) {
          const translations = await requestTranslations(
            untranslated.map((record) => record.original),
            nextLanguage
          );
          if (runId !== runIdRef.current) return;
          untranslated.forEach((record, translationIndex) => {
            translationCache.set(cacheKey(nextLanguage, record.original), decodeHtmlEntities(translations[translationIndex] ?? record.original));
          });
        }
        batch.forEach((record) => {
          record.node.nodeValue = translationCache.get(cacheKey(nextLanguage, record.original)) ?? record.original;
        });
        setMessage(`Translated ${Math.min(index + BATCH_SIZE, records.length)} / ${records.length} text blocks...`);
      }

      setStatus('ready');
      setMessage(`Translated to ${LANGUAGES.find((item) => item.code === nextLanguage)?.label ?? nextLanguage}`);
    } catch (error: any) {
      if (runId !== runIdRef.current) return;
      restoreOriginalText();
      setLanguage('en');
      setStatus('error');
      setMessage(error?.message ?? 'Translation failed.');
      window.localStorage.setItem(STORAGE_KEY, 'en');
      document.documentElement.lang = 'en';
    }
  }

  function collectTextRecords(refresh = false) {
    if (!refresh && textRecordsRef.current) return textRecordsRef.current;

    const roots: Node[] = Array.from(document.querySelectorAll(TRANSLATABLE_SELECTOR));
    document.querySelectorAll('iframe').forEach((iframe) => {
      try {
        const body = (iframe as HTMLIFrameElement).contentDocument?.body;
        if (body) roots.push(body);
      } catch {
        // Cross-origin frames cannot be translated from this page.
      }
    });
    const records: TextRecord[] = [];
    roots.forEach((root) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          const parent = node.parentElement;
          const value = node.nodeValue?.replace(/\s+/g, ' ').trim() ?? '';
          if (!parent || !value || value.length < 2) return NodeFilter.FILTER_REJECT;
          if (parent.closest(EXCLUDED_SELECTOR)) return NodeFilter.FILTER_REJECT;
          if (/^[\d\s.,:+\-鈥撯€?()$楼%]+$/.test(value)) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        },
      });

      let node = walker.nextNode();
      while (node) {
        records.push({ node: node as Text, original: node.nodeValue ?? '' });
        node = walker.nextNode();
      }
    });

    textRecordsRef.current = records;
    return records;
  }

  function restoreOriginalText(records = textRecordsRef.current) {
    records?.forEach((record) => {
      record.node.nodeValue = record.original;
    });
  }

  return (
    <div ref={rootRef} className="relative" data-no-translate>
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-secondary-700 transition hover:bg-secondary-100 dark:text-white dark:hover:bg-secondary-800',
          status === 'translating' && 'cursor-wait'
        )}
        aria-label="Select language"
      >
        {status === 'translating' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Globe2 className="h-4 w-4" />}
        {currentLanguage.short}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-secondary-900 shadow-2xl shadow-black/15">
          <div className="border-b border-secondary-100 dark:border-secondary-700 px-4 py-3">
            <p className="text-sm font-bold text-secondary-900 dark:text-white">Translate site</p>
            <p className="mt-1 text-xs text-secondary-500 dark:text-secondary-400">Powered by Google Cloud Translation API</p>
          </div>
          <div className="grid max-h-80 grid-cols-2 gap-1 overflow-y-auto p-2">
            {LANGUAGES.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => void changeLanguage(item.code)}
                className={cn(
                  'flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm text-secondary-700 transition hover:bg-stone-50 dark:text-secondary-200 dark:hover:bg-secondary-800',
                  item.code === language && 'bg-primary/10 font-bold text-primary dark:bg-primary/15 dark:text-primary-300'
                )}
              >
                <span>{item.label}</span>
                {item.code === language && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
          {message && (
            <div className={cn('border-t px-4 py-3 text-xs', status === 'error' ? 'border-red-100 text-red-600' : 'border-secondary-100 dark:border-secondary-700 text-secondary-500 dark:text-secondary-400')}>
              {message}
            </div>
          )}
        </div>
      )}
      {message && !isOpen && (
        <div
          className={cn(
            'absolute right-0 top-full mt-2 w-64 rounded-2xl border bg-white dark:bg-secondary-900 px-4 py-3 text-xs shadow-xl',
            status === 'error' ? 'border-red-100 text-red-600' : 'border-secondary-100 dark:border-secondary-700 text-secondary-600 dark:text-secondary-300'
          )}
        >
          {message}
        </div>
      )}
    </div>
  );
}

async function requestTranslations(texts: string[], target: string): Promise<string[]> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 30000);
  const response = await fetch('/api/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texts, target, source: 'en' }),
    signal: controller.signal,
  });
  window.clearTimeout(timeoutId);
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.error ?? 'Translation failed.');
  }
  return Array.isArray(data?.translations) ? data.translations : [];
}

function cacheKey(language: string, text: string) {
  return `${language}:${text}`;
}

function decodeHtmlEntities(value: string) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = value;
  return textarea.value;
}

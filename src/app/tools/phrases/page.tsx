'use client';

import { useState } from 'react';
import {
  ArrowRight,
  Check,
  Copy,
  Languages,
  Loader2,
  Sparkles,
  Trash2,
  Volume2,
} from 'lucide-react';

const MAX_CHARACTERS = 5000;

const examples = [
  'Where is the nearest subway station?',
  '¿Este plato contiene frutos secos?',
  '空港までお願いします。',
];

const languageNames: Record<string, string> = {
  ar: 'Arabic',
  de: 'German',
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  hi: 'Hindi',
  id: 'Indonesian',
  it: 'Italian',
  ja: 'Japanese',
  ko: 'Korean',
  ms: 'Malay',
  pt: 'Portuguese',
  ru: 'Russian',
  th: 'Thai',
  tr: 'Turkish',
  vi: 'Vietnamese',
};

type TranslateResponse = {
  translations?: string[];
  detectedSourceLanguages?: string[];
  error?: string;
};

export default function PhrasesPage() {
  const [input, setInput] = useState('');
  const [translation, setTranslation] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState('');
  const [error, setError] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);

  const translate = async () => {
    const text = input.trim();
    if (!text || isTranslating) return;

    setIsTranslating(true);
    setError('');
    setCopied(false);

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          texts: [text],
          target: 'zh-CN',
          source: 'auto',
        }),
        signal: controller.signal,
      });
      const data = (await response.json().catch(() => null)) as TranslateResponse | null;

      if (!response.ok) {
        throw new Error(data?.error || 'Translation failed. Please try again.');
      }

      setTranslation(decodeHtmlEntities(data?.translations?.[0] || ''));
      setDetectedLanguage(data?.detectedSourceLanguages?.[0] || '');
    } catch (requestError) {
      setTranslation('');
      setDetectedLanguage('');
      setError(
        requestError instanceof DOMException && requestError.name === 'AbortError'
          ? 'The translation request timed out. Please try again.'
          : requestError instanceof Error
            ? requestError.message
            : 'Translation failed. Please try again.'
      );
    } finally {
      window.clearTimeout(timeoutId);
      setIsTranslating(false);
    }
  };

  const clear = () => {
    setInput('');
    setTranslation('');
    setDetectedLanguage('');
    setError('');
    setCopied(false);
  };

  const copyTranslation = async () => {
    if (!translation) return;
    await navigator.clipboard.writeText(translation);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const speakTranslation = () => {
    if (!translation || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(translation);
    utterance.lang = 'zh-CN';
    window.speechSynthesis.speak(utterance);
  };

  const sourceLanguageLabel = detectedLanguage
    ? languageNames[detectedLanguage] || detectedLanguage.toUpperCase()
    : '';

  return (
    <main className="min-h-screen bg-[#f7f1e8] pb-16 pt-20 dark:bg-[#0b1220]">
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary-950 via-secondary-900 to-jade py-16 text-white">
        <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="container-main relative max-w-5xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm backdrop-blur">
            <Languages className="h-4 w-4" />
            Chinese Translator
          </div>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            Turn any language into Chinese
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
            Type or paste what you want to say. We will detect the language and translate it into
            Simplified Chinese for you to copy, show, or play aloud.
          </p>
        </div>
      </section>

      <section className="container-main -mt-7 max-w-5xl">
        <div className="relative overflow-hidden rounded-[30px] border border-secondary-200/80 bg-white shadow-xl shadow-secondary-900/5 dark:border-secondary-700 dark:bg-secondary-900">
          <div className="grid lg:grid-cols-2">
            <div className="border-b border-secondary-200 p-5 dark:border-secondary-700 sm:p-7 lg:border-b-0 lg:border-r">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-secondary-900 dark:text-white">
                    Any language
                  </p>
                  <p className="mt-1 text-xs text-secondary-500 dark:text-secondary-400">
                    Automatically detected
                  </p>
                </div>
                {input && (
                  <button
                    type="button"
                    onClick={clear}
                    className="rounded-full p-2 text-secondary-400 transition hover:bg-secondary-100 hover:text-secondary-700 dark:hover:bg-secondary-800 dark:hover:text-white"
                    aria-label="Clear text"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value.slice(0, MAX_CHARACTERS))}
                onKeyDown={(event) => {
                  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
                    event.preventDefault();
                    void translate();
                  }
                }}
                placeholder="Type or paste text in any language…"
                className="min-h-52 w-full resize-none bg-transparent text-lg leading-8 text-secondary-900 outline-none placeholder:text-secondary-400 dark:text-white"
                aria-label="Text to translate"
                maxLength={MAX_CHARACTERS}
              />

              <div className="mt-4 flex items-center justify-between gap-4">
                <span className="text-xs text-secondary-400">
                  {input.length.toLocaleString()} / {MAX_CHARACTERS.toLocaleString()}
                </span>
                <button
                  type="button"
                  onClick={() => void translate()}
                  disabled={!input.trim() || isTranslating}
                  className="inline-flex min-w-36 items-center justify-center gap-2 rounded-full bg-jade px-5 py-3 text-sm font-semibold text-white transition hover:bg-jade/90 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {isTranslating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Translating
                    </>
                  ) : (
                    <>
                      Translate
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex min-h-[355px] flex-col bg-[#fbfaf7] p-5 dark:bg-secondary-950/35 sm:p-7">
              <div className="mb-4 flex min-h-11 items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-secondary-900 dark:text-white">
                    简体中文
                  </p>
                  <p className="mt-1 text-xs text-secondary-500 dark:text-secondary-400">
                    Simplified Chinese
                    {sourceLanguageLabel ? ` · Detected ${sourceLanguageLabel}` : ''}
                  </p>
                </div>
                {translation && (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={speakTranslation}
                      className="rounded-full p-2.5 text-jade transition hover:bg-jade/10"
                      aria-label="Play Chinese translation"
                    >
                      <Volume2 className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => void copyTranslation()}
                      className="rounded-full p-2.5 text-jade transition hover:bg-jade/10"
                      aria-label="Copy Chinese translation"
                    >
                      {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-1 items-start">
                {translation ? (
                  <p className="whitespace-pre-wrap text-2xl leading-10 text-secondary-900 dark:text-white">
                    {translation}
                  </p>
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center py-12 text-center text-secondary-400">
                    <Sparkles className="mb-3 h-7 w-7 text-jade/60" />
                    <p className="max-w-xs text-sm leading-6">
                      Your Chinese translation will appear here.
                    </p>
                  </div>
                )}
              </div>

              {error && (
                <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm font-semibold text-secondary-800 dark:text-secondary-200">
            Try an example
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {examples.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => {
                  setInput(example);
                  setTranslation('');
                  setDetectedLanguage('');
                  setError('');
                }}
                className="rounded-full border border-secondary-200 bg-white px-4 py-2.5 text-left text-sm text-secondary-600 transition hover:border-jade hover:text-jade dark:border-secondary-700 dark:bg-secondary-900 dark:text-secondary-300"
              >
                {example}
              </button>
            ))}
          </div>
          <p className="mt-6 text-xs leading-5 text-secondary-500 dark:text-secondary-400">
            Machine translations can make mistakes. For medical, legal, or emergency situations,
            confirm important details with a fluent speaker.
          </p>
        </div>
      </section>
    </main>
  );
}

function decodeHtmlEntities(value: string) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = value;
  return textarea.value;
}

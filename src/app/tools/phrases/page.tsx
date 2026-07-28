'use client';

import { useState } from 'react';
import {
  ArrowLeftRight,
  ArrowRight,
  Check,
  ChevronDown,
  Copy,
  Languages,
  Loader2,
  Sparkles,
  Trash2,
  Volume2,
} from 'lucide-react';
import { trackAnalyticsEvent } from '@/components/analytics/FirebaseAnalytics';

const MAX_CHARACTERS = 5000;

const examples = [
  '请带我去这个地址。',
  'Could you take me to this address, please?',
  'この住所まで連れて行っていただけますか。',
  '이 주소로 저를 데려가 주실 수 있나요?',
];

const targetLanguages = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'zh-CN', label: 'Simplified Chinese', nativeLabel: '简体中文' },
  { code: 'zh-TW', label: 'Traditional Chinese', nativeLabel: '繁體中文' },
  { code: 'ja', label: 'Japanese', nativeLabel: '日本語' },
  { code: 'ko', label: 'Korean', nativeLabel: '한국어' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español' },
  { code: 'fr', label: 'French', nativeLabel: 'Français' },
  { code: 'de', label: 'German', nativeLabel: 'Deutsch' },
  { code: 'it', label: 'Italian', nativeLabel: 'Italiano' },
  { code: 'pt', label: 'Portuguese', nativeLabel: 'Português' },
  { code: 'ru', label: 'Russian', nativeLabel: 'Русский' },
  { code: 'ar', label: 'Arabic', nativeLabel: 'العربية' },
  { code: 'th', label: 'Thai', nativeLabel: 'ไทย' },
  { code: 'vi', label: 'Vietnamese', nativeLabel: 'Tiếng Việt' },
  { code: 'id', label: 'Indonesian', nativeLabel: 'Bahasa Indonesia' },
  { code: 'ms', label: 'Malay', nativeLabel: 'Bahasa Melayu' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'tr', label: 'Turkish', nativeLabel: 'Türkçe' },
] as const;

const sourceLanguages = [
  { code: 'auto', label: 'Auto-detect', nativeLabel: 'Detect language' },
  ...targetLanguages,
] as const;

type TranslateResponse = {
  translations?: string[];
  detectedSourceLanguages?: string[];
  error?: string;
};

export default function PhrasesPage() {
  const [input, setInput] = useState('');
  const [sourceLanguageCode, setSourceLanguageCode] = useState('auto');
  const [targetLanguageCode, setTargetLanguageCode] = useState('en');
  const [translation, setTranslation] = useState('');
  const [detectedSourceLanguageCode, setDetectedSourceLanguageCode] = useState('');
  const [error, setError] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);

  const targetLanguage =
    targetLanguages.find((language) => language.code === targetLanguageCode) ??
    targetLanguages[0];

  const resolvedSourceLanguageCode =
    sourceLanguageCode === 'auto' && detectedSourceLanguageCode
      ? detectedSourceLanguageCode
      : sourceLanguageCode;

  const resolvedSourceLanguage =
    sourceLanguages.find(
      (language) => language.code === resolvedSourceLanguageCode
    ) ?? null;

  const translate = async () => {
    const text = input.trim();
    if (!text || isTranslating) return;

    setIsTranslating(true);
    setError('');
    setCopied(false);
    setDetectedSourceLanguageCode('');

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          texts: [text],
          target: targetLanguage.code,
          source: sourceLanguageCode,
        }),
        signal: controller.signal,
      });
      const data = (await response.json().catch(() => null)) as TranslateResponse | null;

      if (!response.ok) {
        throw new Error(data?.error || 'Translation failed. Please try again.');
      }

      const translatedText = decodeHtmlEntities(data?.translations?.[0] || '');
      const detected = data?.detectedSourceLanguages?.[0];
      setTranslation(translatedText);
      if (detected) {
        setDetectedSourceLanguageCode(detected);
      }
      if (translatedText) {
        trackAnalyticsEvent('translation_completed', {
          source_language: sourceLanguageCode === 'auto' ? (detected ?? 'auto') : sourceLanguageCode,
          target_language: targetLanguage.code,
          character_count: text.length,
        });
      }
    } catch (requestError) {
      setTranslation('');
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
    setError('');
    setCopied(false);
    setDetectedSourceLanguageCode('');
  };

  const changeSourceLanguage = (code: string) => {
    setSourceLanguageCode(code);
    setTranslation('');
    setError('');
    setCopied(false);
    setDetectedSourceLanguageCode('');
  };

  const changeTargetLanguage = (code: string) => {
    setTargetLanguageCode(code);
    setTranslation('');
    setError('');
    setCopied(false);
  };

  const swapLanguages = () => {
    if (sourceLanguageCode === 'auto') return;
    setSourceLanguageCode(targetLanguageCode);
    setTargetLanguageCode(sourceLanguageCode);
    setInput(translation);
    setTranslation(input);
    setError('');
    setCopied(false);
    setDetectedSourceLanguageCode('');
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
    utterance.lang = targetLanguage.code;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <main className="min-h-screen bg-[#f7f1e8] pb-16 pt-20 text-black">
      <section className="relative overflow-hidden border-b border-black/10 bg-[#f7f1e8] py-16">
        <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-jade/10 blur-3xl" />
        <div className="container-main relative max-w-5xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/60 px-4 py-2 text-sm font-semibold text-black backdrop-blur">
            <Languages className="h-4 w-4" />
            Universal Translator
          </div>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight text-black md:text-5xl">
            Translate any language into the one you need
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-black md:text-lg">
            Pick a source language or let the translator detect it, choose a target language, and get
            a translation you can copy or play aloud while travelling.
          </p>
        </div>
      </section>

      <section className="container-main -mt-7 max-w-5xl">
        <div className="relative overflow-hidden rounded-[30px] border border-black/15 bg-white shadow-xl shadow-black/10">
          <button
            type="button"
            onClick={swapLanguages}
            disabled={sourceLanguageCode === 'auto'}
            aria-label="Swap source and target languages"
            className="absolute left-1/2 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-jade bg-white text-jade shadow-lg transition hover:bg-jade hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-jade lg:inline-flex"
          >
            <ArrowLeftRight className="h-5 w-5" />
          </button>

          <div className="grid lg:grid-cols-2">
            <div className="border-b border-black/15 p-5 sm:p-7 lg:border-b-0 lg:border-r">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <label
                    htmlFor="source-language"
                    className="text-xs font-bold uppercase tracking-[0.12em] text-black"
                  >
                    Translate from
                  </label>
                  <div className="relative mt-2">
                    <select
                      id="source-language"
                      value={sourceLanguageCode}
                      onChange={(event) => changeSourceLanguage(event.target.value)}
                      className="w-full appearance-none rounded-xl border border-black/20 bg-white py-2.5 pl-3 pr-10 text-sm font-bold text-black outline-none transition focus:border-jade focus:ring-2 focus:ring-jade/20"
                    >
                      {sourceLanguages.map((language) => (
                        <option key={language.code} value={language.code}>
                          {language.label} · {language.nativeLabel}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black" />
                  </div>
                  {sourceLanguageCode === 'auto' && resolvedSourceLanguage && (
                    <p className="mt-2 text-xs font-medium text-black">
                      Detected: {resolvedSourceLanguage.label} · {resolvedSourceLanguage.nativeLabel}
                    </p>
                  )}
                </div>
                {input && (
                  <button
                    type="button"
                    onClick={clear}
                    className="rounded-full p-2 text-black transition hover:bg-black/5"
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
                className="min-h-52 w-full resize-none bg-transparent text-lg leading-8 text-black outline-none placeholder:text-black/50"
                aria-label="Text to translate"
                lang={resolvedSourceLanguageCode === 'auto' ? undefined : resolvedSourceLanguageCode}
                dir={sourceLanguageCode === 'ar' ? 'rtl' : 'ltr'}
                maxLength={MAX_CHARACTERS}
              />

              <div className="mt-4 flex items-center justify-between gap-4">
                <span className="text-xs font-medium text-black">
                  {input.length.toLocaleString()} / {MAX_CHARACTERS.toLocaleString()}
                </span>
                <button
                  type="button"
                  onClick={() => void translate()}
                  disabled={!input.trim() || isTranslating}
                  className="inline-flex min-w-36 items-center justify-center gap-2 rounded-full bg-jade px-5 py-3 text-sm font-bold text-black transition hover:bg-jade/80 disabled:cursor-not-allowed disabled:opacity-45"
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

            <div className="flex min-h-[355px] flex-col bg-[#fbfaf7] p-5 sm:p-7">
              <div className="mb-4 flex min-h-11 items-start justify-between gap-4">
                <div className="min-w-0">
                  <label
                    htmlFor="target-language"
                    className="text-xs font-bold uppercase tracking-[0.12em] text-black"
                  >
                    Translate to
                  </label>
                  <div className="relative mt-2">
                    <select
                      id="target-language"
                      value={targetLanguageCode}
                      onChange={(event) => changeTargetLanguage(event.target.value)}
                      className="w-full appearance-none rounded-xl border border-black/20 bg-white py-2.5 pl-3 pr-10 text-sm font-bold text-black outline-none transition focus:border-jade focus:ring-2 focus:ring-jade/20"
                    >
                      {targetLanguages.map((language) => (
                        <option key={language.code} value={language.code}>
                          {language.label} · {language.nativeLabel}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black" />
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={swapLanguages}
                    disabled={sourceLanguageCode === 'auto'}
                    aria-label="Swap source and target languages"
                    className="inline-flex items-center justify-center rounded-full p-2.5 text-black transition hover:bg-jade/15 disabled:cursor-not-allowed disabled:opacity-40 lg:hidden"
                  >
                    <ArrowLeftRight className="h-5 w-5" />
                  </button>
                  {translation && (
                    <>
                      <button
                        type="button"
                        onClick={speakTranslation}
                        className="rounded-full p-2.5 text-black transition hover:bg-jade/15"
                        aria-label={`Play ${targetLanguage.label} translation`}
                      >
                        <Volume2 className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => void copyTranslation()}
                        className="rounded-full p-2.5 text-black transition hover:bg-jade/15"
                        aria-label={`Copy ${targetLanguage.label} translation`}
                      >
                        {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-1 items-start">
                {translation ? (
                  <p
                    className="whitespace-pre-wrap text-2xl leading-10 text-black"
                    lang={targetLanguage.code}
                    dir={targetLanguage.code === 'ar' ? 'rtl' : 'ltr'}
                  >
                    {translation}
                  </p>
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center py-12 text-center text-black">
                    <Sparkles className="mb-3 h-7 w-7 text-jade" />
                    <p className="max-w-xs text-sm font-medium leading-6">
                      Your {targetLanguage.label} translation will appear here.
                    </p>
                  </div>
                )}
              </div>

              {error && (
                <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-black">
          <p className="text-sm font-bold">Try an example</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {examples.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => {
                  setInput(example);
                  setTranslation('');
                  setError('');
                  setDetectedSourceLanguageCode('');
                }}
                className="rounded-full border border-black/20 bg-white px-4 py-2.5 text-left text-sm font-medium text-black transition hover:border-jade hover:bg-jade/10"
              >
                {example}
              </button>
            ))}
          </div>
          <p className="mt-6 text-xs font-medium leading-5 text-black">
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

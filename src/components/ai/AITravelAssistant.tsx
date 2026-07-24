'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Loader2, MessageCircle, Minimize2, Send, X } from 'lucide-react';

import { auth } from '@/lib/firebase';
import { FOOTER_EN, FOOTER_ZH } from '@/lib/ai/config';
import { cn } from '@/lib/utils';

type Source = {
  knowledgeId: string;
  packageId: string;
  city: string;
  guideType: string;
  accessLevel: 'free' | 'paid';
  section: string;
  title: string;
  sourceLabel: string;
  updatedAt: string;
};

type ChatStatus = 'answered' | 'not_found' | 'clarification' | 'error';

type UiMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  status?: ChatStatus;
  sources?: Source[];
};

const STORAGE_LANG = 'ctg_language';

function packageIdFromPath(pathname: string): string | null {
  const m = pathname.match(/\/packages\/([a-z0-9-]+)/i);
  return m?.[1] ?? null;
}

function cityFromPackageSlug(slug: string | null): string | null {
  if (!slug) return null;
  if (slug.startsWith('ishowspeed-')) return slug.replace(/^ishowspeed-/, '');
  return slug;
}

export function AITravelAssistant() {
  const pathname = usePathname();
  const hide =
    pathname.startsWith('/login') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api');

  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [locale, setLocale] = useState('en');
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const idSeq = useRef(0);
  const localeReady = useRef(false);

  const nextId = (prefix: string) => {
    idSeq.current += 1;
    return `${prefix}-${idSeq.current}`;
  };

  const isZh = locale.toLowerCase().startsWith('zh');
  const currentPackageId = packageIdFromPath(pathname);
  const currentCity = cityFromPackageSlug(currentPackageId);

  const welcome = useMemo(
    () =>
      isZh
        ? '你好！我可以根据已收录的旅游方案回答行程、景点、住宿、美食和交通问题。'
        : 'Hi! I can answer questions about itineraries, attractions, hotels, food and transport using our published travel guides.',
    [isZh]
  );

  const placeholder = useMemo(
    () =>
      isZh
        ? '询问本方案的行程、景点或住宿……'
        : "Ask about this guide's itinerary, attractions or hotels…",
    [isZh]
  );

  const displayMessages = useMemo(
    () =>
      messages.length > 0
        ? messages
        : ([
            { id: 'welcome', role: 'assistant', content: welcome, status: 'answered' },
          ] as UiMessage[]),
    [messages, welcome]
  );

  useEffect(() => {
    if (localeReady.current) return;
    localeReady.current = true;
    const stored = window.localStorage.getItem(STORAGE_LANG);
    if (stored) {
      queueMicrotask(() => setLocale(stored));
    }
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    window.setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [displayMessages, loading, open]);

  if (hide) return null;

  async function sendMessage(retryContent?: string) {
    const content = (retryContent ?? input).trim();
    if (!content || loading) return;

    const history = displayMessages
      .filter((m) => m.id !== 'welcome')
      .slice(-6)
      .map((m) => ({ role: m.role, content: m.content }));

    const userMsg: UiMessage = {
      id: nextId('u'),
      role: 'user',
      content,
    };
    setMessages((prev) => {
      const base = prev.length > 0 ? prev : displayMessages;
      return [...base.filter((m) => m.id !== 'welcome'), userMsg].slice(-20);
    });
    setInput('');
    setLoading(true);

    try {
      const token = await auth.currentUser?.getIdToken().catch(() => null);
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;

      const response = await fetch('/api/ai-assistant/chat', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          message: content,
          currentPackageId,
          currentCity,
          pageUrl: window.location.href,
          locale,
          history,
        }),
        cache: 'no-store',
      });

      const payload = (await response.json().catch(() => null)) as {
        status?: ChatStatus;
        answer?: string;
        sources?: Source[];
      } | null;

      const status: ChatStatus =
        payload?.status === 'answered' ||
        payload?.status === 'not_found' ||
        payload?.status === 'clarification' ||
        payload?.status === 'error'
          ? payload.status
          : 'error';

      setMessages((prev) => [
        ...prev,
        {
          id: nextId('a'),
          role: 'assistant',
          content:
            payload?.answer ||
            (isZh
              ? '暂时无法连接AI助手，请稍后再试。'
              : 'The AI assistant is temporarily unavailable. Please try again later.'),
          status,
          sources: Array.isArray(payload?.sources) ? payload!.sources : [],
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: nextId('a'),
          role: 'assistant',
          content: isZh
            ? '暂时无法连接AI助手，请稍后再试。'
            : 'The AI assistant is temporarily unavailable. Please try again later.',
          status: 'error',
          sources: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void sendMessage();
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] flex justify-end p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:p-6">
      {!open && (
        <button
          type="button"
          data-no-translate
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/90"
          onClick={() => {
            setOpen(true);
            setMinimized(false);
          }}
          aria-label={isZh ? '打开 AI 旅行助手' : 'Open AI travel assistant'}
        >
          <MessageCircle className="h-5 w-5" />
          <span className="hidden sm:inline">{isZh ? 'AI 助手' : 'AI Assistant'}</span>
        </button>
      )}

      {open && (
        <div
          data-no-translate
          className={cn(
            'pointer-events-auto flex w-full flex-col overflow-hidden border border-stone-200 bg-white shadow-2xl dark:border-secondary-700 dark:bg-secondary-900',
            'max-h-[min(720px,calc(100dvh-5rem))] rounded-2xl sm:w-[400px]',
            'max-sm:fixed max-sm:inset-x-0 max-sm:bottom-0 max-sm:max-h-[min(92dvh,860px)] max-sm:rounded-b-none max-sm:rounded-t-2xl',
            minimized && 'max-h-14'
          )}
        >
          <div className="flex items-center justify-between border-b border-stone-200 px-4 py-3 dark:border-secondary-700">
            <div>
              <p className="text-sm font-bold text-secondary-900 dark:text-white">
                {isZh ? 'AI 旅行助手' : 'AI Travel Assistant'}
              </p>
              <p className="text-xs text-secondary-500">
                {isZh ? '仅基于本站已收录方案' : 'Based on published guides only'}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="rounded-lg p-2 text-secondary-500 hover:bg-stone-100 dark:hover:bg-secondary-800"
                onClick={() => setMinimized((v) => !v)}
                aria-label="Minimize"
              >
                <Minimize2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="rounded-lg p-2 text-secondary-500 hover:bg-stone-100 dark:hover:bg-secondary-800"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
                {displayMessages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'max-w-[92%] rounded-2xl px-3 py-2 text-sm leading-relaxed',
                      message.role === 'user'
                        ? 'ml-auto bg-primary text-white'
                        : 'bg-stone-100 text-secondary-900 dark:bg-secondary-800 dark:text-secondary-100'
                    )}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    {message.role === 'assistant' &&
                      message.status === 'answered' &&
                      message.sources &&
                      message.sources.length > 0 && (
                        <div className="mt-2 border-t border-stone-200/70 pt-2 text-xs text-secondary-600 dark:border-secondary-600 dark:text-secondary-300">
                          <p className="font-semibold">{isZh ? '来源：' : 'Sources:'}</p>
                          <ul className="mt-1 space-y-1">
                            {message.sources.map((source) => (
                              <li key={`${source.knowledgeId}-${source.section}`}>
                                · {source.sourceLabel} · {source.title}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    {message.role === 'assistant' && message.status === 'error' && (
                      <button
                        type="button"
                        className="mt-2 text-xs font-semibold underline"
                        onClick={() => {
                          const lastUser = [...displayMessages]
                            .reverse()
                            .find((m) => m.role === 'user');
                          if (lastUser) void sendMessage(lastUser.content);
                        }}
                      >
                        {isZh ? '重试' : 'Retry'}
                      </button>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="inline-flex items-center gap-2 rounded-2xl bg-stone-100 px-3 py-2 text-xs text-secondary-600 dark:bg-secondary-800">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    {isZh ? '正在检索方案知识…' : 'Searching guide knowledge…'}
                  </div>
                )}
              </div>

              <form onSubmit={onSubmit} className="border-t border-stone-200 p-3 dark:border-secondary-700">
                <div className="flex items-end gap-2">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        void sendMessage();
                      }
                    }}
                    rows={2}
                    placeholder={placeholder}
                    className="min-h-[64px] flex-1 resize-none rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm outline-none ring-primary focus:ring-2 dark:border-secondary-600 dark:bg-secondary-950"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white disabled:opacity-50"
                    aria-label="Send"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-2 text-[11px] leading-snug text-secondary-500">
                  {isZh ? FOOTER_ZH : FOOTER_EN}
                </p>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}

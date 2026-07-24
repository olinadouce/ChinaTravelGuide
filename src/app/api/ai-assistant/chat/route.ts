import { NextRequest, NextResponse } from 'next/server';

import {
  CLARIFICATION_EN,
  CLARIFICATION_ZH,
  ERROR_EN,
  ERROR_ZH,
  NOT_FOUND_EN,
  NOT_FOUND_ZH,
  getAiConfig,
} from '@/lib/ai/config';
import { getUserKnowledgeEntitlements } from '@/lib/ai/entitlements';
import {
  ensureVolatileDisclaimer,
  generateStructuredAnswer,
  validateModelAnswer,
  type HistoryMessage,
} from '@/lib/ai/generate';
import { enforceAiRateLimit } from '@/lib/ai/rate-limit';
import { searchKnowledge } from '@/lib/ai/search';
import { detectLanguage, resolveQueryScope } from '@/lib/ai/scope';
import { recordUnansweredQuestion } from '@/lib/ai/unanswered';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

type ChatBody = {
  message?: unknown;
  currentPackageId?: unknown;
  currentCity?: unknown;
  pageUrl?: unknown;
  locale?: unknown;
  history?: unknown;
  // Intentionally ignored if present (client must not control entitlements)
  userId?: unknown;
  isPaid?: unknown;
  isAdmin?: unknown;
  unlockedPackageIds?: unknown;
  accessLevel?: unknown;
};

function clientSafeError(lang: 'zh' | 'en') {
  return {
    status: 'error' as const,
    answer: lang === 'zh' ? ERROR_ZH : ERROR_EN,
    sources: [] as [],
  };
}

function notFound(lang: 'zh' | 'en') {
  return {
    status: 'not_found' as const,
    answer: lang === 'zh' ? NOT_FOUND_ZH : NOT_FOUND_EN,
    sources: [] as [],
  };
}

function parseHistory(raw: unknown, maxLen: number): HistoryMessage[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .slice(-6)
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const role = (item as any).role;
      const content = (item as any).content;
      if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') return null;
      const trimmed = content.trim().slice(0, maxLen);
      if (!trimmed) return null;
      return { role, content: trimmed } as HistoryMessage;
    })
    .filter((v): v is HistoryMessage => Boolean(v));
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

export async function POST(request: NextRequest) {
  const config = getAiConfig();
  let lang: 'zh' | 'en' = 'en';

  try {
    let body: ChatBody;
    try {
      body = (await request.json()) as ChatBody;
    } catch {
      return NextResponse.json(clientSafeError('en'), { status: 400 });
    }

    if (typeof body.message !== 'string') {
      return NextResponse.json(clientSafeError('en'), { status: 400 });
    }

    const message = body.message.trim();
    if (!message) {
      return NextResponse.json(clientSafeError('en'), { status: 400 });
    }
    if (message.length > config.maxInputLength) {
      return NextResponse.json(clientSafeError(detectLanguage(message)), { status: 400 });
    }

    lang = detectLanguage(message);

    if (
      (body.currentPackageId != null && typeof body.currentPackageId !== 'string') ||
      (body.currentCity != null && typeof body.currentCity !== 'string') ||
      (body.pageUrl != null && typeof body.pageUrl !== 'string') ||
      (body.locale != null && typeof body.locale !== 'string')
    ) {
      return NextResponse.json(clientSafeError(lang), { status: 400 });
    }

    const history = parseHistory(body.history, Math.min(500, config.maxInputLength));

    // Entitlements always from server session — never from client fields.
    const entitlements = await getUserKnowledgeEntitlements(
      request.headers.get('authorization')
    );

    const rate = await enforceAiRateLimit({
      userId: entitlements.userId,
      ip: getClientIp(request),
      isAuthenticated: entitlements.isAuthenticated,
    });
    if (!rate.allowed) {
      return NextResponse.json(clientSafeError(lang), {
        status: 429,
        headers: { 'Retry-After': String(rate.retryAfterSec) },
      });
    }

    const scope = resolveQueryScope({
      message,
      history,
      currentPackageId: body.currentPackageId,
      currentCity: body.currentCity,
      pageUrl: body.pageUrl,
    });

    if (scope.needsClarification) {
      return NextResponse.json({
        status: 'clarification',
        answer: lang === 'zh' ? CLARIFICATION_ZH : CLARIFICATION_EN,
        sources: [],
      });
    }

    if (!config.apiKey || !config.vectorStoreId) {
      return NextResponse.json(clientSafeError(lang), { status: 503 });
    }

    let chunks = await searchKnowledge({
      query: message,
      entitlements,
      packageId: scope.packageId,
      city: scope.city,
    });

    // If scoped search is empty, retry once without package/city narrowing
    // while still applying free/paid access filters.
    if (!chunks.length && (scope.packageId || scope.city)) {
      chunks = await searchKnowledge({
        query: message,
        entitlements,
      });
    }

    const topScore = chunks[0]?.score ?? null;

    if (!chunks.length) {
      await recordUnansweredQuestion({
        question: message,
        language: lang,
        detectedCity: scope.city,
        packageId: scope.packageId,
        userId: entitlements.userId,
        topRetrievalScore: topScore,
      });
      return NextResponse.json(notFound(lang));
    }

    const model = await generateStructuredAnswer({ message, history, chunks });

    if (model.needsClarification) {
      return NextResponse.json({
        status: 'clarification',
        answer:
          model.clarificationQuestion.trim() ||
          (lang === 'zh' ? CLARIFICATION_ZH : CLARIFICATION_EN),
        sources: [],
      });
    }

    const validated = validateModelAnswer(model, chunks);
    if (!validated.ok) {
      await recordUnansweredQuestion({
        question: message,
        language: lang,
        detectedCity: scope.city,
        packageId: scope.packageId,
        userId: entitlements.userId,
        topRetrievalScore: topScore,
      });
      return NextResponse.json(notFound(lang));
    }

    const answer = ensureVolatileDisclaimer(validated.answer, message);
    const sources = validated.sources.map((s) => ({
      knowledgeId: s.knowledgeId,
      packageId: s.packageId,
      city: s.city,
      guideType: s.guideType,
      accessLevel: s.accessLevel,
      section: s.section,
      title: s.title,
      sourceLabel: s.sourceLabel,
      updatedAt: s.updatedAt,
    }));

    return NextResponse.json({
      status: 'answered',
      answer,
      sources,
    });
  } catch (error) {
    console.error('[AI Assistant] chat failed:', error instanceof Error ? error.message : 'unknown');
    return NextResponse.json(clientSafeError(lang), { status: 503 });
  }
}

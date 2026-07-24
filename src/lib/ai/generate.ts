import OpenAI from 'openai';

import {
  DISCLAIMER_EN,
  DISCLAIMER_ZH,
  VOLATILE_HINT_RE,
  getAiConfig,
} from './config';
import { formatKnowledgeContext, type RetrievedChunk } from './search';
import { AI_ANSWER_SCHEMA, AI_SYSTEM_PROMPT } from './system-prompt';

export type ModelAnswer = {
  answerable: boolean;
  answer: string;
  supportingSourceKeys: string[];
  needsClarification: boolean;
  clarificationQuestion: string;
};

export type HistoryMessage = { role: 'user' | 'assistant'; content: string };

function getClient() {
  const { apiKey, requestTimeoutMs } = getAiConfig();
  if (!apiKey) throw new Error('OPENAI_API_KEY is not configured.');
  return new OpenAI({ apiKey, timeout: requestTimeoutMs, maxRetries: 1 });
}

function detectAnswerLanguage(message: string): 'zh' | 'en' {
  const cjk = (message.match(/[\u4e00-\u9fff]/g) || []).length;
  return cjk >= 2 ? 'zh' : 'en';
}

export function ensureVolatileDisclaimer(answer: string, message: string): string {
  const lang = detectAnswerLanguage(message);
  const disclaimer = lang === 'zh' ? DISCLAIMER_ZH : DISCLAIMER_EN;
  if (!VOLATILE_HINT_RE.test(answer) && !VOLATILE_HINT_RE.test(message)) {
    return answer;
  }
  if (answer.includes(disclaimer)) return answer;
  return `${answer.trim()}\n\n${disclaimer}`;
}

export async function generateStructuredAnswer(params: {
  message: string;
  history: HistoryMessage[];
  chunks: RetrievedChunk[];
}): Promise<ModelAnswer> {
  const config = getAiConfig();
  const client = getClient();
  const context = formatKnowledgeContext(params.chunks);

  const historyText = params.history
    .slice(-6)
    .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
    .join('\n');

  const input = [
    {
      role: 'developer' as const,
      content: AI_SYSTEM_PROMPT,
    },
    {
      role: 'user' as const,
      content: `CONVERSATION_CONTEXT:
${historyText || '(none)'}

USER_QUESTION:
${params.message}

KNOWLEDGE_CONTEXT:
${context}`,
    },
  ];

  const response = await client.responses.create({
    model: config.responseModel,
    input,
    text: {
      format: {
        type: 'json_schema',
        name: 'ai_travel_assistant_answer',
        strict: true,
        schema: AI_ANSWER_SCHEMA,
      },
    },
  });

  const text = response.output_text?.trim();
  if (!text) {
    return {
      answerable: false,
      answer: '',
      supportingSourceKeys: [],
      needsClarification: false,
      clarificationQuestion: '',
    };
  }

  let parsed: ModelAnswer;
  try {
    parsed = JSON.parse(text) as ModelAnswer;
  } catch {
    return {
      answerable: false,
      answer: '',
      supportingSourceKeys: [],
      needsClarification: false,
      clarificationQuestion: '',
    };
  }

  return {
    answerable: Boolean(parsed.answerable),
    answer: typeof parsed.answer === 'string' ? parsed.answer : '',
    supportingSourceKeys: Array.isArray(parsed.supportingSourceKeys)
      ? parsed.supportingSourceKeys.filter((v): v is string => typeof v === 'string')
      : [],
    needsClarification: Boolean(parsed.needsClarification),
    clarificationQuestion:
      typeof parsed.clarificationQuestion === 'string'
        ? parsed.clarificationQuestion
        : '',
  };
}

export function validateModelAnswer(
  model: ModelAnswer,
  chunks: RetrievedChunk[]
): { ok: true; sources: RetrievedChunk[]; answer: string } | { ok: false; reason: string } {
  if (model.needsClarification) {
    return { ok: false, reason: 'clarification' };
  }
  if (!model.answerable) return { ok: false, reason: 'not_answerable' };
  if (!model.answer.trim()) return { ok: false, reason: 'empty_answer' };
  if (!model.supportingSourceKeys.length) return { ok: false, reason: 'no_sources' };

  const byKey = new Map(chunks.map((c) => [c.sourceKey, c]));
  const sources: RetrievedChunk[] = [];
  for (const key of model.supportingSourceKeys) {
    const chunk = byKey.get(key);
    if (!chunk) return { ok: false, reason: 'invalid_source' };
    sources.push(chunk);
  }

  return { ok: true, sources, answer: model.answer.trim() };
}

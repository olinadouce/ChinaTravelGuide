/**
 * AI Travel Assistant — shared config (server + scripts).
 * All OpenAI model / threshold settings come from env, never hard-coded in call sites.
 */
export function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is not configured.`);
  return value;
}

export function getAiConfig() {
  return {
    apiKey: process.env.OPENAI_API_KEY?.trim() || '',
    vectorStoreId: process.env.OPENAI_VECTOR_STORE_ID?.trim() || '',
    responseModel: process.env.OPENAI_RESPONSE_MODEL?.trim() || 'gpt-4.1-mini',
    maxSearchResults: Number(process.env.OPENAI_MAX_SEARCH_RESULTS || 8),
    minRelevanceScore: Number(process.env.OPENAI_MIN_RELEVANCE_SCORE || 0.35),
    maxInputLength: Number(process.env.AI_ASSISTANT_MAX_INPUT_LENGTH || 1000),
    rateLimitPer10Min: Number(process.env.AI_ASSISTANT_RATE_LIMIT_PER_10_MINUTES || 20),
    anonymousRateLimitPer10Min: Number(
      process.env.AI_ASSISTANT_ANON_RATE_LIMIT_PER_10_MINUTES || 8
    ),
    requestTimeoutMs: Number(process.env.AI_ASSISTANT_REQUEST_TIMEOUT_MS || 45000),
    adminUids: (process.env.AI_ADMIN_UIDS || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    adminEmails: (process.env.AI_ADMIN_EMAILS || '')
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean),
  };
}

export const NOT_FOUND_ZH = '该问题还未收录';
export const NOT_FOUND_EN =
  'This question has not been added to our knowledge base yet.';

export const ERROR_ZH = '暂时无法连接AI助手，请稍后再试。';
export const ERROR_EN =
  'The AI assistant is temporarily unavailable. Please try again later.';

export const CLARIFICATION_ZH = '请问你想查询哪个景点或城市？';
export const CLARIFICATION_EN =
  'Which attraction or city would you like to ask about?';

export const DISCLAIMER_ZH =
  '以上票价、开放时间、行程安排及酒店等信息可能随时间变化，出行前请务必向景区、酒店或官方渠道再次确认。';
export const DISCLAIMER_EN =
  'Prices, opening hours, schedules and hotel details above may change over time. Please reconfirm with the attraction, hotel or official sources before travel.';

export const FOOTER_ZH =
  '回答仅基于本站已收录的方案内容，票价和开放时间出行前请再次确认。';
export const FOOTER_EN =
  'Answers are based only on our published guides. Reconfirm prices and opening hours before travel.';

export const VOLATILE_HINT_RE =
  /(票价|门票|开放时间|营业时间|酒店|住宿|房价|行程时间|游玩时长|风险|预约|场次|价格|price|ticket|admission|opening.?hour|hotel|schedule|risk|booking)/i;

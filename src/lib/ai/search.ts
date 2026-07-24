import OpenAI from 'openai';
import type { ComparisonFilter, CompoundFilter } from 'openai/resources/shared';

import { getAiConfig } from './config';
import {
  buildKnowledgeAccessFilter,
  type KnowledgeEntitlements,
  resolvePackageId,
} from './entitlements';

export type RetrievedChunk = {
  sourceKey: string;
  knowledgeId: string;
  packageId: string;
  city: string;
  guideType: string;
  accessLevel: 'free' | 'paid';
  section: string;
  title: string;
  sourceLabel: string;
  updatedAt: string;
  content: string;
  score: number;
};

function getClient() {
  const { apiKey } = getAiConfig();
  if (!apiKey) throw new Error('OPENAI_API_KEY is not configured.');
  return new OpenAI({ apiKey, timeout: getAiConfig().requestTimeoutMs, maxRetries: 1 });
}

function attrString(
  attributes: Record<string, string | number | boolean> | null | undefined,
  key: string
): string {
  const value = attributes?.[key];
  return value == null ? '' : String(value);
}

export function combineSearchFilters(
  entitlements: KnowledgeEntitlements,
  opts: { packageId?: string | null; city?: string | null }
): ComparisonFilter | CompoundFilter | undefined {
  const access = buildKnowledgeAccessFilter(entitlements);
  const extras: Array<ComparisonFilter | CompoundFilter> = [];
  const packageId = resolvePackageId(opts.packageId);
  if (packageId) {
    extras.push({ type: 'eq', key: 'package_id', value: packageId });
  }
  if (opts.city?.trim()) {
    extras.push({ type: 'eq', key: 'city', value: opts.city.trim().toLowerCase() });
  }

  if (!access && extras.length === 0) return undefined;
  if (!access) {
    return extras.length === 1 ? extras[0] : { type: 'and', filters: extras };
  }
  if (extras.length === 0) return access;
  return { type: 'and', filters: [access, ...extras] };
}

export async function searchKnowledge(params: {
  query: string;
  entitlements: KnowledgeEntitlements;
  packageId?: string | null;
  city?: string | null;
}): Promise<RetrievedChunk[]> {
  const config = getAiConfig();
  if (!config.vectorStoreId) throw new Error('OPENAI_VECTOR_STORE_ID is not configured.');

  const client = getClient();
  const filters = combineSearchFilters(params.entitlements, {
    packageId: params.packageId,
    city: params.city,
  });

  const page = await client.vectorStores.search(config.vectorStoreId, {
    query: params.query,
    max_num_results: Math.min(Math.max(config.maxSearchResults, 1), 50),
    filters,
    ranking_options: {
      ranker: 'auto',
      score_threshold: config.minRelevanceScore,
    },
  });

  const chunks: RetrievedChunk[] = [];
  let index = 1;
  for (const item of page.data) {
    const attributes = item.attributes || {};
    const accessLevelRaw = attrString(attributes, 'access_level');
    const accessLevel = accessLevelRaw === 'paid' ? 'paid' : 'free';
    const packageId = attrString(attributes, 'package_id');

    // Defense in depth: never return paid chunks the user cannot access.
    if (
      !params.entitlements.isAdmin &&
      accessLevel === 'paid' &&
      !params.entitlements.unlockedPackageIds.includes(packageId)
    ) {
      continue;
    }

    if (item.score < config.minRelevanceScore) continue;

    const content = (item.content || [])
      .map((c) => c.text || '')
      .join('\n')
      .trim();
    if (!content) continue;

    chunks.push({
      sourceKey: `SOURCE_${index}`,
      knowledgeId: attrString(attributes, 'knowledge_id') || item.file_id,
      packageId,
      city: attrString(attributes, 'city'),
      guideType: attrString(attributes, 'guide_type'),
      accessLevel,
      section: attrString(attributes, 'section'),
      title: attrString(attributes, 'title') || item.filename,
      sourceLabel: attrString(attributes, 'source_label') || item.filename,
      updatedAt: attrString(attributes, 'updated_at'),
      content,
      score: item.score,
    });
    index += 1;
  }

  // Prefer newest updatedAt when scores are close / conflicts.
  chunks.sort((a, b) => {
    if (Math.abs(a.score - b.score) > 0.05) return b.score - a.score;
    return (b.updatedAt || '').localeCompare(a.updatedAt || '');
  });

  return chunks.slice(0, 5).map((chunk, i) => ({
    ...chunk,
    sourceKey: `SOURCE_${i + 1}`,
  }));
}

export function formatKnowledgeContext(chunks: RetrievedChunk[]): string {
  return chunks
    .map(
      (chunk) =>
        `[${chunk.sourceKey}]
Title: ${chunk.title}
Package: ${chunk.packageId}
City: ${chunk.city}
Section: ${chunk.section}
Updated At: ${chunk.updatedAt}
Content:
${chunk.content}`
    )
    .join('\n\n');
}

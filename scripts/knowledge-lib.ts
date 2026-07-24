import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import matter from 'gray-matter';

import { getAllPackages } from '../src/data/packages';

export type KnowledgeFrontmatter = {
  knowledgeId: string;
  packageId: string;
  city: string;
  guideType: string;
  accessLevel: 'free' | 'paid';
  language: string;
  section: string;
  title: string;
  sourceLabel: string;
  version: string;
  updatedAt: string;
};

const REQUIRED = [
  'knowledgeId',
  'packageId',
  'city',
  'guideType',
  'accessLevel',
  'language',
  'section',
  'title',
  'sourceLabel',
  'version',
  'updatedAt',
] as const;

export type KnowledgeFile = {
  filePath: string;
  relativePath: string;
  frontmatter: KnowledgeFrontmatter;
  body: string;
  contentHash: string;
  raw: string;
};

export function knowledgeRoot(cwd = process.cwd()) {
  return path.join(cwd, 'knowledge');
}

export function listMarkdownFiles(root: string): string[] {
  const out: string[] = [];
  function walk(dir: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith('_') || entry.name === 'README.md') continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && entry.name.endsWith('.md')) out.push(full);
    }
  }
  if (fs.existsSync(root)) walk(root);
  return out.sort();
}

export function validateKnowledgeFile(
  filePath: string,
  root: string,
  validPackageIds: Set<string>
): { ok: true; file: KnowledgeFile } | { ok: false; errors: string[] } {
  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(raw);
  const errors: string[] = [];
  const data = parsed.data as Record<string, unknown>;

  for (const key of REQUIRED) {
    if (data[key] == null || String(data[key]).trim() === '') {
      errors.push(`missing frontmatter field: ${key}`);
    }
  }

  const accessLevel = String(data.accessLevel || '');
  if (accessLevel && accessLevel !== 'free' && accessLevel !== 'paid') {
    errors.push(`accessLevel must be free|paid, got: ${accessLevel}`);
  }

  const body = parsed.content.trim();
  if (!body) errors.push('empty markdown body');

  const packageId = String(data.packageId || '');
  if (packageId && !validPackageIds.has(packageId)) {
    errors.push(`packageId not found in site packages: ${packageId}`);
  }

  if (errors.length) {
    return {
      ok: false,
      errors: errors.map((e) => `${path.relative(root, filePath)}: ${e}`),
    };
  }

  const frontmatter: KnowledgeFrontmatter = {
    knowledgeId: String(data.knowledgeId),
    packageId,
    city: String(data.city),
    guideType: String(data.guideType),
    accessLevel: accessLevel as 'free' | 'paid',
    language: String(data.language),
    section: String(data.section),
    title: String(data.title),
    sourceLabel: String(data.sourceLabel),
    version: String(data.version),
    updatedAt: String(data.updatedAt),
  };

  const contentHash = crypto.createHash('sha256').update(raw).digest('hex');
  return {
    ok: true,
    file: {
      filePath,
      relativePath: path.relative(root, filePath),
      frontmatter,
      body,
      contentHash,
      raw,
    },
  };
}

export function loadAndValidateKnowledge(cwd = process.cwd()) {
  const root = knowledgeRoot(cwd);
  const validPackageIds = new Set(getAllPackages().map((p) => p.id));
  const files = listMarkdownFiles(root);
  const okFiles: KnowledgeFile[] = [];
  const errors: string[] = [];
  const seenIds = new Map<string, string>();

  for (const filePath of files) {
    const result = validateKnowledgeFile(filePath, root, validPackageIds);
    if (!result.ok) {
      errors.push(...result.errors);
      continue;
    }
    const id = result.file.frontmatter.knowledgeId;
    if (seenIds.has(id)) {
      errors.push(
        `duplicate knowledgeId ${id}: ${seenIds.get(id)} and ${result.file.relativePath}`
      );
      continue;
    }
    seenIds.set(id, result.file.relativePath);
    okFiles.push(result.file);
  }

  return { root, files: okFiles, errors };
}

export function toVectorAttributes(file: KnowledgeFile) {
  return {
    knowledge_id: file.frontmatter.knowledgeId,
    package_id: file.frontmatter.packageId,
    city: file.frontmatter.city,
    guide_type: file.frontmatter.guideType,
    access_level: file.frontmatter.accessLevel,
    language: file.frontmatter.language,
    section: file.frontmatter.section,
    title: file.frontmatter.title,
    source_label: file.frontmatter.sourceLabel,
    version: file.frontmatter.version,
    updated_at: file.frontmatter.updatedAt,
    content_hash: file.contentHash,
  };
}

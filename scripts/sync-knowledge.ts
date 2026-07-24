#!/usr/bin/env tsx
/**
 * Knowledge validate / sync / status CLI.
 * Run locally or in CI — never from Vercel request runtime.
 */
import fs from 'node:fs';
import path from 'node:path';
import OpenAI from 'openai';
import { toFile } from 'openai/uploads';

import {
  loadAndValidateKnowledge,
  toVectorAttributes,
  type KnowledgeFile,
} from './knowledge-lib';

function loadEnvFile() {
  const envPath = path.join(process.cwd(), '.env.local');
  const fallback = path.join(process.cwd(), '.env');
  const target = fs.existsSync(envPath) ? envPath : fallback;
  if (!fs.existsSync(target)) return;
  for (const line of fs.readFileSync(target, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx < 0) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

function getClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is required.');
  return new OpenAI({ apiKey });
}

function getVectorStoreId() {
  const id = process.env.OPENAI_VECTOR_STORE_ID;
  if (!id) throw new Error('OPENAI_VECTOR_STORE_ID is required.');
  return id;
}

async function cmdValidate() {
  const { files, errors } = loadAndValidateKnowledge();
  if (errors.length) {
    console.error('Knowledge validation failed:\n' + errors.join('\n'));
    process.exit(1);
  }
  console.log(`Validated ${files.length} knowledge markdown files.`);
}

async function listRemoteFiles(client: OpenAI, vectorStoreId: string) {
  const remote: Array<{
    id: string;
    attributes: Record<string, string | number | boolean> | null | undefined;
    status: string;
  }> = [];
  for await (const file of client.vectorStores.files.list(vectorStoreId)) {
    remote.push({
      id: file.id,
      attributes: file.attributes,
      status: file.status,
    });
  }
  return remote;
}

async function cmdSync(args: string[]) {
  const prune = args.includes('--prune');
  const { files, errors } = loadAndValidateKnowledge();
  if (errors.length) {
    console.error('Knowledge validation failed:\n' + errors.join('\n'));
    process.exit(1);
  }

  const client = getClient();
  const vectorStoreId = getVectorStoreId();
  const remote = await listRemoteFiles(client, vectorStoreId);
  const byKnowledgeId = new Map<string, (typeof remote)[number]>();
  for (const file of remote) {
    const kid = file.attributes?.knowledge_id;
    if (typeof kid === 'string') byKnowledgeId.set(kid, file);
  }

  let added = 0;
  let updated = 0;
  let skipped = 0;
  let failed = 0;
  let deleted = 0;
  const failures: string[] = [];

  for (const file of files) {
    const existing = byKnowledgeId.get(file.frontmatter.knowledgeId);
    const remoteHash = existing?.attributes?.content_hash;
    if (existing && remoteHash === file.contentHash) {
      skipped += 1;
      continue;
    }

    try {
      if (existing) {
        await client.vectorStores.files.delete(existing.id, {
          vector_store_id: vectorStoreId,
        });
        try {
          await client.files.delete(existing.id);
        } catch {
          // Vector store file id may differ from Files API id in some cases; ignore.
        }
      }

      const uploaded = await client.files.create({
        file: await toFile(Buffer.from(file.raw, 'utf8'), path.basename(file.filePath), {
          type: 'text/markdown',
        }),
        purpose: 'assistants',
      });

      const attached = await client.vectorStores.files.createAndPoll(vectorStoreId, {
        file_id: uploaded.id,
        attributes: toVectorAttributes(file),
      });

      if (attached.status !== 'completed') {
        throw new Error(`processing status=${attached.status}`);
      }

      if (existing) updated += 1;
      else added += 1;
      byKnowledgeId.set(file.frontmatter.knowledgeId, {
        id: attached.id,
        attributes: attached.attributes,
        status: attached.status,
      });
      console.log(`${existing ? 'UPDATED' : 'ADDED'} ${file.relativePath}`);
    } catch (error) {
      failed += 1;
      const message = error instanceof Error ? error.message : String(error);
      failures.push(`${file.relativePath}: ${message}`);
      console.error(`FAILED ${file.relativePath}: ${message}`);
    }
  }

  if (prune) {
    const localIds = new Set(files.map((f) => f.frontmatter.knowledgeId));
    for (const [knowledgeId, remoteFile] of byKnowledgeId) {
      if (localIds.has(knowledgeId)) continue;
      try {
        await client.vectorStores.files.delete(remoteFile.id, {
          vector_store_id: vectorStoreId,
        });
        deleted += 1;
        console.log(`DELETED remote knowledge_id=${knowledgeId}`);
      } catch (error) {
        failed += 1;
        failures.push(`prune ${knowledgeId}: ${String(error)}`);
      }
    }
  }

  console.log(
    JSON.stringify({ added, updated, skipped, failed, deleted, failures }, null, 2)
  );
  if (failed > 0) process.exit(1);
}

async function cmdStatus() {
  const { files, errors } = loadAndValidateKnowledge();
  if (errors.length) {
    console.error('Local validation errors:\n' + errors.join('\n'));
  }

  const client = getClient();
  const vectorStoreId = getVectorStoreId();
  const remote = await listRemoteFiles(client, vectorStoreId);

  const byPackage = new Map<string, number>();
  const byAccess = { free: 0, paid: 0, other: 0 };
  let inProgress = 0;
  let failedFiles = 0;
  const remoteHashes = new Map<string, string>();

  for (const file of remote) {
    const packageId = String(file.attributes?.package_id || 'unknown');
    byPackage.set(packageId, (byPackage.get(packageId) || 0) + 1);
    const access = String(file.attributes?.access_level || '');
    if (access === 'free') byAccess.free += 1;
    else if (access === 'paid') byAccess.paid += 1;
    else byAccess.other += 1;
    if (file.status === 'in_progress') inProgress += 1;
    if (file.status === 'failed') failedFiles += 1;
    const kid = file.attributes?.knowledge_id;
    const hash = file.attributes?.content_hash;
    if (typeof kid === 'string' && typeof hash === 'string') {
      remoteHashes.set(kid, hash);
    }
  }

  const localOnly: string[] = [];
  const changed: string[] = [];
  for (const file of files) {
    const remoteHash = remoteHashes.get(file.frontmatter.knowledgeId);
    if (!remoteHash) localOnly.push(file.frontmatter.knowledgeId);
    else if (remoteHash !== file.contentHash) changed.push(file.frontmatter.knowledgeId);
  }
  const remoteOnly = [...remoteHashes.keys()].filter(
    (id) => !files.some((f) => f.frontmatter.knowledgeId === id)
  );

  console.log(
    JSON.stringify(
      {
        localFiles: files.length,
        remoteFiles: remote.length,
        byPackage: Object.fromEntries(byPackage),
        byAccess,
        inProgress,
        failedFiles,
        localOnlyCount: localOnly.length,
        changedCount: changed.length,
        remoteOnlyCount: remoteOnly.length,
        localOnly: localOnly.slice(0, 20),
        changed: changed.slice(0, 20),
        remoteOnly: remoteOnly.slice(0, 20),
      },
      null,
      2
    )
  );
}

async function main() {
  loadEnvFile();
  const [cmd, ...rest] = process.argv.slice(2);
  if (cmd === 'validate') await cmdValidate();
  else if (cmd === 'sync') await cmdSync(rest);
  else if (cmd === 'status') await cmdStatus();
  else {
    console.log(`Usage:
  npx tsx scripts/sync-knowledge.ts validate
  npx tsx scripts/sync-knowledge.ts sync [--prune]
  npx tsx scripts/sync-knowledge.ts status`);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

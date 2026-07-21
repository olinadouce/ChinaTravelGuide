import { del, get, put } from '@vercel/blob';

import { ForumInputError } from './forum-service';

const PAID_GUIDES_STORE_ID = 'store_Qu89PDZ4WlNNieex';
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

const IMAGE_TYPES = {
  'image/jpeg': { extension: 'jpg', matches: (bytes: Uint8Array) => bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff },
  'image/png': { extension: 'png', matches: (bytes: Uint8Array) => bytes.slice(0, 8).every((value, index) => value === [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a][index]) },
  'image/webp': { extension: 'webp', matches: (bytes: Uint8Array) => text(bytes, 0, 4) === 'RIFF' && text(bytes, 8, 12) === 'WEBP' },
  'image/gif': { extension: 'gif', matches: (bytes: Uint8Array) => ['GIF87a', 'GIF89a'].includes(text(bytes, 0, 6)) },
} as const;

function text(bytes: Uint8Array, start: number, end: number) {
  return String.fromCharCode(...bytes.slice(start, end));
}

function credentials() {
  const oidcToken = process.env.VERCEL_OIDC_TOKEN;
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (oidcToken && process.env.VERCEL) {
    return { oidcToken, storeId: PAID_GUIDES_STORE_ID };
  }
  if (token) return { token };
  throw new Error('Private Blob storage is not configured.');
}

export async function uploadForumImage(uid: string, file: File): Promise<{
  pathname: string;
  proxyUrl: string;
}> {
  if (!file.size || file.size > MAX_IMAGE_BYTES) {
    throw new ForumInputError('Image must be smaller than 4 MB.');
  }
  const declaredType = file.type.toLowerCase() as keyof typeof IMAGE_TYPES;
  const type = IMAGE_TYPES[declaredType];
  if (!type) throw new ForumInputError('Use a JPEG, PNG, WebP, or GIF image.');

  const header = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  if (!type.matches(header)) throw new ForumInputError('The uploaded file is not a valid image.');

  const safeUid = uid.replace(/[^a-zA-Z0-9_-]/g, '_');
  const pathname = `forum-images/${safeUid}/${crypto.randomUUID()}.${type.extension}`;
  await put(pathname, file, {
    access: 'private',
    addRandomSuffix: false,
    contentType: declaredType,
    cacheControlMaxAge: 31_536_000,
    maximumSizeInBytes: MAX_IMAGE_BYTES,
    ...credentials(),
  });
  return {
    pathname,
    proxyUrl: `/api/forum/images/${pathname.split('/').map(encodeURIComponent).join('/')}`,
  };
}

export async function deleteForumImage(pathname: string) {
  if (!pathname.startsWith('forum-images/')) return;
  await del(pathname, credentials());
}

export async function readForumImage(pathname: string) {
  if (!pathname.startsWith('forum-images/') || pathname.includes('..')) return null;
  return get(pathname, { access: 'private', ...credentials() });
}

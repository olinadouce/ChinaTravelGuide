import { del, get, issueSignedToken, presignUrl, put } from '@vercel/blob';

import { ForumInputError } from './forum-service';

const PAID_GUIDES_STORE_ID = 'store_Qu89PDZ4WlNNieex';
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
export const MAX_FORUM_IMAGES = 9;
const UPLOAD_URL_LIFETIME_MS = 2 * 60 * 1000;

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

function safeUid(uid: string) {
  return uid.replace(/[^a-zA-Z0-9_-]/g, '_');
}

function imageType(contentType: string) {
  return IMAGE_TYPES[contentType.toLowerCase() as keyof typeof IMAGE_TYPES];
}

export function isOwnedForumImagePath(uid: string, pathname: string) {
  return pathname.startsWith(`forum-images/${safeUid(uid)}/`) && !pathname.includes('..');
}

/**
 * Issues a short-lived PUT URL for one exact private pathname. The browser
 * uploads directly to Blob so a nine-image post never crosses the serverless
 * request-body limit.
 */
export async function createForumImageUploadUrl(
  uid: string,
  input: { contentType: string; size: number }
) {
  const type = imageType(input.contentType);
  if (!type) throw new ForumInputError('Use a JPEG, PNG, WebP, or GIF image.');
  if (!input.size || input.size > MAX_IMAGE_BYTES) {
    throw new ForumInputError('Each image must be smaller than 4 MB.');
  }

  const pathname = `forum-images/${safeUid(uid)}/${crypto.randomUUID()}.${type.extension}`;
  const validUntil = Date.now() + UPLOAD_URL_LIFETIME_MS;
  const signedToken = await issueSignedToken({
    ...credentials(),
    pathname,
    operations: ['put'],
    allowedContentTypes: [input.contentType],
    maximumSizeInBytes: MAX_IMAGE_BYTES,
    validUntil,
  });
  const { presignedUrl } = await presignUrl(signedToken, {
    access: 'private',
    operation: 'put',
    pathname,
    allowedContentTypes: [input.contentType],
    maximumSizeInBytes: MAX_IMAGE_BYTES,
    addRandomSuffix: false,
    allowOverwrite: false,
    cacheControlMaxAge: 31_536_000,
    validUntil,
  });
  return { pathname, url: presignedUrl, expiresAt: validUntil };
}

/**
 * Direct uploads are treated as untrusted until post creation. Check that
 * every Blob belongs to this user and that its stored MIME type and magic
 * bytes describe a real supported image.
 */
export async function validateOwnedForumImages(uid: string, pathnames: unknown): Promise<string[]> {
  if (!Array.isArray(pathnames)) return [];
  if (pathnames.length > MAX_FORUM_IMAGES) {
    throw new ForumInputError(`Upload no more than ${MAX_FORUM_IMAGES} images.`);
  }

  return Promise.all(pathnames.map(async (value) => {
    if (typeof value !== 'string' || !isOwnedForumImagePath(uid, value)) {
      throw new ForumInputError('One of the uploaded images is invalid.');
    }
    const result = await get(value, { access: 'private', useCache: false, ...credentials() });
    if (!result || result.statusCode !== 200) {
      throw new ForumInputError('One of the uploaded images could not be found.');
    }
    const type = imageType(result.blob.contentType);
    if (!type || result.blob.size > MAX_IMAGE_BYTES) {
      await result.stream.cancel();
      throw new ForumInputError('One of the uploaded images is invalid.');
    }
    const reader = result.stream.getReader();
    const firstChunk = await reader.read();
    await reader.cancel();
    const header = firstChunk.value?.slice(0, 16) || new Uint8Array();
    if (!type.matches(header)) {
      throw new ForumInputError('One of the uploaded files is not a valid image.');
    }
    return `/api/forum/images/${value.split('/').map(encodeURIComponent).join('/')}`;
  }));
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

  const pathname = `forum-images/${safeUid(uid)}/${crypto.randomUUID()}.${type.extension}`;
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

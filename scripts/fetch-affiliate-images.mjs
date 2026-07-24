import { readFile, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import path from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataPath = path.join(projectRoot, 'src/data/affiliate-products.generated.json');
const fetchPageScript = path.join(projectRoot, 'scripts/fetch-page.ps1');
const products = JSON.parse(await readFile(dataPath, 'utf8'));
const execFileAsync = promisify(execFile);

const blockedImageTerms = [
  'logo',
  'favicon',
  'placeholder',
  'default-image',
  'default_image',
  'app-icon',
  'qrcode',
  'qr-code',
  'sprite',
  'avatar',
];

function decodeHtml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

function stringifyForRepository(value) {
  // This generated file historically uses PowerShell ConvertTo-Json's layout.
  // Preserve it so image refreshes do not rewrite every unrelated line.
  return JSON.stringify(value, null, 4)
    .replace(/^(\s*"[^"]+"): /gm, '$1:  ')
    .replaceAll('&', '\\u0026')
    .replaceAll("'", '\\u0027');
}

function normalizeImage(value, pageUrl) {
  if (typeof value !== 'string' || !value.trim()) return null;
  const decoded = decodeHtml(value.trim())
    .replaceAll('\\u002F', '/')
    .replaceAll('\\/', '/');

  try {
    const url = new URL(decoded, pageUrl);
    if (url.protocol !== 'https:') return null;
    const lower = url.href.toLowerCase();
    if (blockedImageTerms.some((term) => lower.includes(term))) return null;
    return url.href;
  } catch {
    return null;
  }
}

function readTagAttributes(tag) {
  const attributes = new Map();
  const pattern = /([:\w-]+)\s*=\s*(["'])(.*?)\2/gis;
  for (const match of tag.matchAll(pattern)) {
    attributes.set(match[1].toLowerCase(), decodeHtml(match[3]));
  }
  return attributes;
}

function collectStructuredImages(value, output = []) {
  if (!value) return output;
  if (Array.isArray(value)) {
    for (const item of value) collectStructuredImages(item, output);
    return output;
  }
  if (typeof value !== 'object') return output;

  for (const [key, item] of Object.entries(value)) {
    if (['image', 'imageurl', 'thumbnailurl', 'contenturl'].includes(key.toLowerCase())) {
      if (typeof item === 'string') output.push(item);
      else if (Array.isArray(item)) output.push(...item.filter((entry) => typeof entry === 'string'));
      else if (item && typeof item === 'object' && typeof item.url === 'string') output.push(item.url);
    }
    collectStructuredImages(item, output);
  }
  return output;
}

function extractImage(html, pageUrl) {
  const prioritized = [];
  const secondary = [];

  for (const tag of html.match(/<meta\b[^>]*>/gis) ?? []) {
    const attributes = readTagAttributes(tag);
    const key = (attributes.get('property') ?? attributes.get('name') ?? attributes.get('itemprop') ?? '').toLowerCase();
    const content = attributes.get('content');
    if (!content) continue;

    if (['og:image', 'og:image:secure_url', 'twitter:image', 'twitter:image:src'].includes(key)) {
      prioritized.push(content);
    } else if (['image', 'thumbnailurl', 'contenturl'].includes(key)) {
      secondary.push(content);
    }
  }

  for (const tag of html.match(/<link\b[^>]*>/gis) ?? []) {
    const attributes = readTagAttributes(tag);
    if ((attributes.get('rel') ?? '').toLowerCase().includes('image_src') && attributes.get('href')) {
      prioritized.push(attributes.get('href'));
    }
  }

  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      collectStructuredImages(JSON.parse(match[1]), secondary);
    } catch {
      // Some partner pages publish non-standard JSON-LD. Meta tags remain preferred.
    }
  }

  const embeddedPatterns = [
    /"(?:imageUrl|image_url|mainImage|coverImage|thumbnailUrl)"\s*:\s*"(https:[^"]+)"/gi,
    /"(https:\\?\/\\?\/[^"]+\.(?:jpe?g|png|webp)(?:\?[^"]*)?)"/gi,
  ];
  for (const pattern of embeddedPatterns) {
    for (const match of html.matchAll(pattern)) secondary.push(match[1]);
  }

  for (const candidate of [...prioritized, ...secondary]) {
    const image = normalizeImage(candidate, pageUrl);
    if (image) return image;
  }
  return null;
}

async function fetchProductImage(product) {
  const sourceUrl = new URL(product.affiliateUrl);

  // KKday protects storefront HTML with DataDome, but its product page uses
  // this public endpoint for reviews. IMAGE_DESC returns a real photo from the
  // linked product and avoids substituting a generic city image.
  if (sourceUrl.hostname === 'www.kkday.com') {
    const productId = sourceUrl.pathname.match(/\/product\/(\d+)/)?.[1];
    if (!productId) return { image: null, pageUrl: sourceUrl.href, bytes: 0 };

    const apiUrl = new URL('https://www.kkday.com/api/_nuxt/cpath/fetch-product-comments-v2');
    apiUrl.searchParams.set('page', '1');
    apiUrl.searchParams.set('sort', 'IMAGE_DESC');
    apiUrl.searchParams.set('prodId', productId);

    const response = await fetch(apiUrl, {
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36',
        accept: 'application/json',
      },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const body = await response.text();
    const payload = JSON.parse(body);
    const comments = payload?.data?.comments ?? [];
    const reviewImage = comments
      .flatMap((comment) => comment?.images ?? [])
      .map((image) => image?.url)
      .find(Boolean);

    if (reviewImage) {
      return {
        image: normalizeImage(reviewImage, sourceUrl.href),
        pageUrl: sourceUrl.href,
        bytes: body.length,
      };
    }

    // New products may not have photo reviews yet. The Hong Kong storefront is
    // publicly indexable through Google Translate and exposes the official
    // Open Graph product image.
    const translatedPath = sourceUrl.pathname.replace(/^\/zh-cn\//, '/zh-hk/');
    const translatedUrl = new URL(`https://www-kkday-com.translate.goog${translatedPath}`);
    translatedUrl.searchParams.set('_x_tr_sl', 'auto');
    translatedUrl.searchParams.set('_x_tr_tl', 'en');
    translatedUrl.searchParams.set('_x_tr_hl', 'en');
    const { stdout } = await execFileAsync(
      'powershell.exe',
      ['-NoProfile', '-File', fetchPageScript, translatedUrl.href],
      { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024, timeout: 45_000 },
    );

    return {
      image: extractImage(stdout, sourceUrl.href),
      pageUrl: sourceUrl.href,
      bytes: stdout.length,
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);
  try {
    const response = await fetch(sourceUrl, {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36',
        accept: 'text/html,application/xhtml+xml',
        'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.7',
      },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    return {
      image: extractImage(html, response.url),
      pageUrl: response.url,
      bytes: html.length,
    };
  } finally {
    clearTimeout(timeout);
  }
}

const missing = products.filter((product) => !product.image);
const results = [];
const concurrency = missing.some((product) => product.provider === 'KKday') ? 1 : 4;
let cursor = 0;

async function worker() {
  while (cursor < missing.length) {
    const index = cursor++;
    const product = missing[index];
    try {
      const result = await fetchProductImage(product);
      if (result.image) product.image = result.image;
      results.push({
        id: product.id,
        provider: product.provider,
        status: result.image ? 'found' : 'missing',
        image: result.image,
        pageUrl: result.pageUrl,
        bytes: result.bytes,
      });
      console.log(`[${index + 1}/${missing.length}] ${result.image ? 'FOUND' : 'MISS '} ${product.id}`);
    } catch (error) {
      results.push({
        id: product.id,
        provider: product.provider,
        status: 'error',
        error: error instanceof Error ? error.message : String(error),
      });
      console.log(`[${index + 1}/${missing.length}] ERROR ${product.id}: ${error instanceof Error ? error.message : error}`);
    }
  }
}

await Promise.all(Array.from({ length: concurrency }, () => worker()));
await writeFile(dataPath, stringifyForRepository(products), 'utf8');

const summary = results.reduce((counts, result) => {
  counts[result.status] = (counts[result.status] ?? 0) + 1;
  return counts;
}, {});
console.log('Summary:', JSON.stringify(summary));

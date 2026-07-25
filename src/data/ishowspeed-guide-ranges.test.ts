import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

const GUIDE_ROOT = path.join(process.cwd(), 'packet');
const RANGE_PATTERN = /\d[\d:,.]*\s*(?:\u2013|-)\s*[\d:,.]*\+?/g;

const guides = [
  ['Beijing', 'beijing'],
  ['Chengdu', 'chengdu'],
  ['Chongqing', 'chongqing'],
  ['Hong_Kong', 'hong-kong'],
  ['Shanghai', 'shanghai'],
  ['Shenzhen', 'shenzhen'],
] as const;

function listFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(entryPath) : [entryPath];
  });
}

function visibleNumericRanges(html: string): string[] {
  const text = html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&ndash;|&#8211;|&#x2013;/gi, '\u2013')
    .replace(/\s+/g, ' ');

  return [...text.matchAll(RANGE_PATTERN)].map((match) => match[0]);
}

describe('IShowSpeed free guide numeric ranges', () => {
  const sourceFiles = listFiles(GUIDE_ROOT);

  it.each(guides)(
    'keeps the %s guide aligned with its original HTML',
    (sourceCity, publicSlug) => {
      const sourceName = `IShowSpeed_${sourceCity}_Free_Guide_Final.html`;
      const sourcePath = sourceFiles.find(
        (filePath) => path.basename(filePath) === sourceName
      );

      expect(sourcePath, `Missing original guide: ${sourceName}`).toBeDefined();

      const publicPath = path.join(
        process.cwd(),
        'public',
        'ishowspeed',
        publicSlug,
        'free.html'
      );

      expect(
        visibleNumericRanges(readFileSync(publicPath, 'utf8'))
      ).toEqual(
        visibleNumericRanges(readFileSync(sourcePath!, 'utf8'))
      );
    }
  );
});

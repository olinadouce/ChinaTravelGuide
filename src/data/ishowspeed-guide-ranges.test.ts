import { readFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

const RANGE_PATTERN = /\d[\d:,.]*\s*(?:\u2013|-)\s*[\d:,.]*\+?/g;

const expectedRanges = {
  beijing: ['10–35', '1.5–2', '1.5–2'],
  chengdu: ['10–30', '30–60'],
  chongqing: ['10–35'],
  'hong-kong': ['10–45', '15–50'],
  shanghai: ['10–30', '20–45'],
  shenzhen: [
    '10–35',
    '10:00–11:00',
    '11:00–12:30',
    '60–120',
    '13:00–15:00',
    '15:30–17:30',
    '17:30–18:30',
    '60–150',
    '18:30–21:00',
    '100–220',
    '70–160',
    '120–300',
    '500–1,000+',
    '40–120',
  ],
} as const;

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
  it.each(Object.entries(expectedRanges))(
    'keeps the published %s guide ranges stable',
    (publicSlug, expected) => {
      const publicPath = path.join(
        process.cwd(),
        'public',
        'ishowspeed',
        publicSlug,
        'free.html'
      );

      expect(visibleNumericRanges(readFileSync(publicPath, 'utf8'))).toEqual(
        expected
      );
    }
  );
});

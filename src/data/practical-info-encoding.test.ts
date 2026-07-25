import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import { practicalGuides } from './content';

const mojibakePattern = /(?:鈥|锟|�)/u;
const practicalInfoSources = [
  'src/app/practical-info/page.tsx',
  'src/components/sections/TravelInfo.tsx',
];

describe('practical information text encoding', () => {
  it('does not contain known mojibake in guide data or display components', () => {
    const displayText = [
      JSON.stringify(practicalGuides),
      ...practicalInfoSources.map((source) =>
        readFileSync(resolve(process.cwd(), source), 'utf8')
      ),
    ].join('\n');

    expect(displayText).not.toMatch(mojibakePattern);
  });
});

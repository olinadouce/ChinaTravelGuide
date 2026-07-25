import { describe, expect, it } from 'vitest';

import { getAllPackages, getAllThemes } from './index';

const mojibakePattern = /[路鈥锛銆�]/u;

describe('package display text encoding', () => {
  it('does not contain known mojibake characters', () => {
    const displayData = JSON.stringify({
      themes: getAllThemes(),
      packages: getAllPackages(),
    });

    expect(displayData).not.toMatch(mojibakePattern);
  });
});

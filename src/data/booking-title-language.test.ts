import { describe, expect, it } from 'vitest';

import products from './affiliate-products.generated.json';

const chineseCharacterPattern = /[\p{Script=Han}]/u;
const mojibakePattern = /(?:Â|â|鈥|锟|�)/u;

describe('Book product titles', () => {
  it('uses readable English titles for every affiliate product', () => {
    expect(products.length).toBeGreaterThan(0);

    for (const product of products) {
      expect(product.title.trim(), `${product.id} has an empty title`).not.toBe('');
      expect(product.title, `${product.id} still contains Chinese characters`).not.toMatch(
        chineseCharacterPattern
      );
      expect(product.title, `${product.id} contains mojibake`).not.toMatch(
        mojibakePattern
      );
      expect(product.title, `${product.id} does not contain English text`).toMatch(
        /[A-Za-z]/
      );
    }
  });
});

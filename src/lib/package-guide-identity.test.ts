import { describe, expect, it } from 'vitest';

import { getPackageGuideIdentity } from './package-guide-identity';

describe('getPackageGuideIdentity', () => {
  it('keeps the canonical IShowSpeed slug for points claims', () => {
    expect(
      getPackageGuideIdentity({
        slug: 'ishowspeed-beijing',
        themeId: 'ishowspeed',
      })
    ).toEqual({
      assetSlug: 'beijing',
      rewardSlug: 'ishowspeed-beijing',
    });
  });

  it('uses the package slug for both values in regular themes', () => {
    expect(
      getPackageGuideIdentity({
        slug: 'guilin-yangshuo-longji',
        themeId: 'themed',
      })
    ).toEqual({
      assetSlug: 'guilin-yangshuo-longji',
      rewardSlug: 'guilin-yangshuo-longji',
    });
  });
});

interface PackageGuideIdentityInput {
  slug: string;
  themeId: string;
}

/**
 * IShowSpeed assets are stored under short city folders such as
 * /ishowspeed/beijing, while points validation uses the canonical package
 * slug (ishowspeed-beijing). Keep both identifiers explicit so a file-system
 * path can never be submitted as the guide identifier for a reward claim.
 */
export function getPackageGuideIdentity(pkg: PackageGuideIdentityInput) {
  return {
    assetSlug:
      pkg.themeId === 'ishowspeed' ? pkg.slug.replace(/^ishowspeed-/, '') : pkg.slug,
    rewardSlug: pkg.slug,
  };
}

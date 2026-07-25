'use client';

import { useEffect } from 'react';
import { trackAnalyticsEvent } from '@/components/analytics/FirebaseAnalytics';

export function PackageAnalytics({
  packageId,
  packageSlug,
  packageName,
  theme,
}: {
  packageId: string;
  packageSlug: string;
  packageName: string;
  theme: string;
}) {
  useEffect(() => {
    trackAnalyticsEvent('view_package', {
      package_id: packageId,
      package_slug: packageSlug,
      package_name: packageName,
      theme,
    });
  }, [packageId, packageName, packageSlug, theme]);

  return null;
}

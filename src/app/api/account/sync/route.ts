import { NextRequest, NextResponse } from 'next/server';

import { NO_STORE_HEADERS, withAuthenticatedUser } from '@/lib/server/api-route';
import { syncPointsProfile } from '@/lib/server/points-service';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  return withAuthenticatedUser(
    request,
    {
      logLabel: '[Points] Profile sync failed:',
      failureMessage:
        'Points service is not configured or temporarily unavailable.',
    },
    async (identity) => {
      const profile = await syncPointsProfile({
        uid: identity.uid,
        email: identity.email ?? null,
        displayName:
          identity.name || identity.email?.split('@')[0] || 'Traveler',
        photoURL: identity.picture ?? null,
      });
      return NextResponse.json({ profile }, { headers: NO_STORE_HEADERS });
    }
  );
}

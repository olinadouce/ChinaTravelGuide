import { NextRequest, NextResponse } from 'next/server';

import { NO_STORE_HEADERS, withAuthenticatedUser } from '@/lib/server/api-route';
import { unlockPackage } from '@/lib/server/points-service';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  return withAuthenticatedUser(
    request,
    {
      logLabel: '[Points] Unlock failed:',
      failureMessage: 'Guide unlock is temporarily unavailable.',
    },
    async (identity) => {
      const body = (await request.json()) as { packageId?: string };
      if (!body.packageId) {
        return NextResponse.json(
          { error: 'Package ID is required.' },
          { status: 400 }
        );
      }

      const result = await unlockPackage(identity.uid, body.packageId);
      if (!result.ok) {
        return NextResponse.json({ error: result.reason }, { status: 409 });
      }
      return NextResponse.json(result, { headers: NO_STORE_HEADERS });
    }
  );
}

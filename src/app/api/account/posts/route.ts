import { NextRequest, NextResponse } from 'next/server';

import { NO_STORE_HEADERS, withAuthenticatedUser } from '@/lib/server/api-route';
import { listMyForumActivity } from '@/lib/server/forum-service';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  return withAuthenticatedUser(
    request,
    {
      logLabel: '[Forum] Failed to load member activity:',
      failureMessage: 'Your forum activity is temporarily unavailable.',
    },
    async (identity) => {
      const activity = await listMyForumActivity(identity.uid);
      return NextResponse.json(activity, { headers: NO_STORE_HEADERS });
    }
  );
}

import { NextRequest, NextResponse } from 'next/server';

import { NO_STORE_HEADERS, withAuthenticatedUser } from '@/lib/server/api-route';
import { markForumNotificationsRead } from '@/lib/server/forum-service';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  return withAuthenticatedUser(
    request,
    {
      logLabel: '[Forum] Failed to mark notifications read:',
      failureMessage: 'Notifications could not be updated.',
    },
    async (identity) => {
      const marked = await markForumNotificationsRead(identity.uid);
      return NextResponse.json(
        { ok: true, marked },
        { headers: NO_STORE_HEADERS }
      );
    }
  );
}

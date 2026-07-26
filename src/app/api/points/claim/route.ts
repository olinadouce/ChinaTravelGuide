import { NextRequest, NextResponse } from 'next/server';

import type { PointsActionType } from '@/lib/points-rules';
import { NO_STORE_HEADERS, withAuthenticatedUser } from '@/lib/server/api-route';
import { claimPoints } from '@/lib/server/points-service';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  return withAuthenticatedUser(
    request,
    {
      logLabel: '[Points] Claim failed:',
      failureMessage: 'Points claim is temporarily unavailable.',
    },
    async (identity) => {
      const body = (await request.json()) as {
        actionType?: PointsActionType;
        city?: string;
        evidence?: {
          readSeconds?: number;
          scrollPercent?: number;
          wordDownloaded?: boolean;
        };
      };
      if (!body.actionType) {
        return NextResponse.json(
          { error: 'Action type is required.' },
          { status: 400 }
        );
      }

      const result = await claimPoints(identity.uid, {
        actionType: body.actionType,
        city: body.city,
        evidence: body.evidence,
      });
      if (!result.ok) {
        return NextResponse.json({ error: result.reason }, { status: 409 });
      }
      return NextResponse.json(result, { headers: NO_STORE_HEADERS });
    }
  );
}

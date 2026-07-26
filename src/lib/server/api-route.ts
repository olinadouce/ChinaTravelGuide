import type { DecodedIdToken } from 'firebase-admin/auth';
import { NextResponse } from 'next/server';

import { verifyRequestUser } from './firebase-admin';

export const NO_STORE_HEADERS = { 'Cache-Control': 'no-store' } as const;

type AuthenticatedRouteOptions = {
  logLabel: string;
  failureMessage: string;
};

/**
 * Runs the common security boundary used by authenticated API routes.
 *
 * The browser sends a Firebase ID token. This function verifies it with the
 * Admin SDK before any business callback runs, then converts unexpected
 * infrastructure failures into a stable public response without exposing
 * internal Firebase details.
 */
export async function withAuthenticatedUser(
  request: Request,
  options: AuthenticatedRouteOptions,
  handler: (identity: DecodedIdToken) => Promise<Response>
): Promise<Response> {
  try {
    const identity = await verifyRequestUser(
      request.headers.get('authorization')
    );
    if (!identity) {
      return NextResponse.json(
        { error: 'Valid sign-in is required.' },
        { status: 401 }
      );
    }
    return await handler(identity);
  } catch (error) {
    console.error(options.logLabel, error);
    return NextResponse.json(
      { error: options.failureMessage },
      { status: 503 }
    );
  }
}

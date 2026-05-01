import { NextResponse } from 'next/server';
import { getHomePayload } from '@/lib/content';

export function GET() {
  return NextResponse.json(getHomePayload());
}

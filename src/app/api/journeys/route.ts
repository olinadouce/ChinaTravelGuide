import { NextRequest, NextResponse } from 'next/server';
import { getJourneys } from '@/lib/content';

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get('theme') ?? undefined;
  const difficulty = searchParams.get('difficulty') ?? undefined;

  return NextResponse.json(getJourneys(theme, difficulty));
}

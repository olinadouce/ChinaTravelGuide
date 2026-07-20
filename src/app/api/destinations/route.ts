import { NextRequest, NextResponse } from 'next/server';
import { getDestinations } from '@/lib/content';

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') ?? undefined;
  const region = searchParams.get('region') ?? undefined;

  return NextResponse.json(getDestinations(q, region));
}

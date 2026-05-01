import { NextResponse } from 'next/server';
import { getJourneyBySlug } from '@/lib/content';

export function GET(_: Request, { params }: { params: { slug: string } }) {
  const journey = getJourneyBySlug(params.slug);

  if (!journey) {
    return NextResponse.json({ message: 'Journey not found' }, { status: 404 });
  }

  return NextResponse.json(journey);
}

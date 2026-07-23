import { NextResponse } from 'next/server';
import { getJourneyBySlug } from '@/lib/content';

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const journey = getJourneyBySlug(slug);

  if (!journey) {
    return NextResponse.json({ message: 'Journey not found' }, { status: 404 });
  }

  return NextResponse.json(journey);
}

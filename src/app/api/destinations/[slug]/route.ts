import { NextResponse } from 'next/server';
import { getDestinationBySlug } from '@/lib/content';

export function GET(_: Request, { params }: { params: { slug: string } }) {
  const destination = getDestinationBySlug(params.slug);

  if (!destination) {
    return NextResponse.json({ message: 'Destination not found' }, { status: 404 });
  }

  return NextResponse.json(destination);
}

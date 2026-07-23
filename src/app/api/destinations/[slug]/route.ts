import { NextResponse } from 'next/server';
import { getDestinationBySlug } from '@/lib/content';

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    return NextResponse.json({ message: 'Destination not found' }, { status: 404 });
  }

  return NextResponse.json(destination);
}

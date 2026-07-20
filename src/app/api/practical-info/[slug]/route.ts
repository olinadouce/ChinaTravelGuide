import { NextResponse } from 'next/server';
import { getGuideBySlug } from '@/lib/content';

export function GET(_: Request, { params }: { params: { slug: string } }) {
  const guide = getGuideBySlug(params.slug);

  if (!guide) {
    return NextResponse.json({ message: 'Guide not found' }, { status: 404 });
  }

  return NextResponse.json(guide);
}

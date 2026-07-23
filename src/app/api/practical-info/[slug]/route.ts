import { NextResponse } from 'next/server';
import { getGuideBySlug } from '@/lib/content';

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return NextResponse.json({ message: 'Guide not found' }, { status: 404 });
  }

  return NextResponse.json(guide);
}

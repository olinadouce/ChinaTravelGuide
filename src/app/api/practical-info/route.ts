import { NextResponse } from 'next/server';
import { practicalGuides } from '@/data/content';

export function GET() {
  return NextResponse.json(practicalGuides);
}

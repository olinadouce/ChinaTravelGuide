import { NextResponse } from 'next/server';
import { travelTools } from '@/data/content';

export function GET() {
  return NextResponse.json(travelTools);
}

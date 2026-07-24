import { NextRequest, NextResponse } from 'next/server';

import { getUserKnowledgeEntitlements } from '@/lib/ai/entitlements';
import {
  listUnansweredQuestions,
  updateUnansweredStatus,
  type UnansweredStatus,
} from '@/lib/ai/unanswered';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const STATUSES: UnansweredStatus[] = ['unreviewed', 'planned', 'added', 'ignored'];

async function requireAdmin(request: NextRequest) {
  const entitlements = await getUserKnowledgeEntitlements(
    request.headers.get('authorization')
  );
  if (!entitlements.isAuthenticated || !entitlements.isAdmin) {
    return null;
  }
  return entitlements;
}

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Admin access required.' }, { status: 403 });
  }

  const city = request.nextUrl.searchParams.get('city') || undefined;
  const status = request.nextUrl.searchParams.get('status') as UnansweredStatus | null;
  const rows = await listUnansweredQuestions({
    city,
    status: status && STATUSES.includes(status) ? status : undefined,
  });

  return NextResponse.json(
    {
      items: rows.map((row: any) => ({
        id: row.id,
        question: row.question,
        language: row.language,
        detectedCity: row.detectedCity,
        packageId: row.packageId,
        occurrenceCount: row.occurrenceCount,
        status: row.status,
        topRetrievalScore: row.topRetrievalScore ?? null,
      })),
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

export async function PATCH(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Admin access required.' }, { status: 403 });
  }

  const body = (await request.json().catch(() => null)) as {
    id?: string;
    status?: UnansweredStatus;
  } | null;

  if (!body?.id || !body.status || !STATUSES.includes(body.status)) {
    return NextResponse.json({ error: 'id and valid status are required.' }, { status: 400 });
  }

  await updateUnansweredStatus(body.id, body.status);
  return NextResponse.json({ ok: true });
}

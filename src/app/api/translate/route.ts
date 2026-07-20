import { NextResponse } from 'next/server';

const GOOGLE_TRANSLATE_ENDPOINT = 'https://translation.googleapis.com/language/translate/v2';
const MAX_TEXTS_PER_REQUEST = 128;
const MAX_TEXT_LENGTH = 5000;

interface TranslateRequestBody {
  texts?: unknown;
  target?: unknown;
  source?: unknown;
}

export async function POST(request: Request) {
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Google Translate API key is not configured.' },
      { status: 503 }
    );
  }

  let body: TranslateRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const target = typeof body.target === 'string' ? body.target.trim() : '';
  const source = typeof body.source === 'string' ? body.source.trim() : 'en';
  const texts = Array.isArray(body.texts)
    ? body.texts.filter((text): text is string => typeof text === 'string')
    : [];

  if (!target) {
    return NextResponse.json({ error: 'Target language is required.' }, { status: 400 });
  }
  if (texts.length === 0) {
    return NextResponse.json({ translations: [] });
  }
  if (texts.length > MAX_TEXTS_PER_REQUEST) {
    return NextResponse.json(
      { error: `Translate up to ${MAX_TEXTS_PER_REQUEST} text segments per request.` },
      { status: 400 }
    );
  }
  if (texts.some((text) => text.length > MAX_TEXT_LENGTH)) {
    return NextResponse.json(
      { error: `Each text segment must be under ${MAX_TEXT_LENGTH} characters.` },
      { status: 400 }
    );
  }

  const params = new URLSearchParams();
  params.set('key', apiKey);
  params.set('target', target);
  params.set('source', source || 'en');
  params.set('format', 'text');
  texts.forEach((text) => params.append('q', text));

  const response = await fetch(GOOGLE_TRANSLATE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: params.toString(),
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    return NextResponse.json(
      { error: data?.error?.message ?? 'Google Translate request failed.' },
      { status: response.status }
    );
  }

  const translations = data?.data?.translations?.map((item: { translatedText?: string }) => item.translatedText ?? '') ?? [];
  return NextResponse.json({ translations });
}

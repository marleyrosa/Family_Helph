import { NextResponse } from 'next/server';
import { searchRAGKnowledge, INITIAL_RAG_DOCUMENTS } from '../../../lib/rag-kb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const query = body.query || '';

    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    const results = searchRAGKnowledge(query, 3);
    const sources = results.length > 0 ? results : [INITIAL_RAG_DOCUMENTS[0]];

    return NextResponse.json({
      success: true,
      query,
      results: sources
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

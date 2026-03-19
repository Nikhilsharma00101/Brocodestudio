/* eslint-disable @typescript-eslint/no-explicit-any */
import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import { BROCODE_KNOWLEDGE } from '@/lib/ai-knowledge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log(`[Chat API] Processing ${messages?.length} messages`);

    const apiKey = process.env.GROQ_API_KEY_LOCAL?.trim();
    
    if (!apiKey) {
      console.error('[Chat API] GROQ_API_KEY_LOCAL is not defined');
      return new Response(JSON.stringify({ error: 'AI Key Missing' }), { status: 500 });
    }

    const groq = createGroq({
      apiKey: apiKey,
    });

    const result = streamText({
      model: groq('llama-3.3-70b-versatile'),
      system: BROCODE_KNOWLEDGE,
      messages: (messages as any[]).map((m: any) => {
        let content = '';
        if (typeof m.content === 'string') {
          content = m.content;
        } else if (m.content?.text) {
          content = m.content.text;
        } else if (Array.isArray(m.parts)) {
          content = m.parts.map((p: any) => p.text || (p.type === 'text' ? p.text : '')).join('');
        } else if (Array.isArray(m.content)) {
          content = m.content.map((p: any) => p.text || (typeof p === 'string' ? p : '')).join('');
        }
        return { 
          role: m.role || 'user', 
          content 
        };
      }),
    });

    return result.toTextStreamResponse();
  } catch (error: unknown) {
    const err = error as { statusCode?: number; status?: number; message?: string; responseBody?: any };
    if (err.statusCode === 429 || err.status === 429) {
      console.error('[Chat API] RATE LIMIT EXHAUSTED:', err.message);
      return new Response(JSON.stringify({ 
        error: 'Rate limit exhausted. Please try again later.',
        isRateLimit: true
      }), { status: 429 });
    }
    
    console.error('[Chat API] Error:', error);
    return new Response(JSON.stringify({ 
      error: err.message || 'Internal Server Error',
      details: err.responseBody || undefined 
    }), {
      status: err.statusCode || err.status || 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

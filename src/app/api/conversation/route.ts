import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const audio = formData.get('audio');
  if (!audio || typeof audio === 'string') {
    return new Response(JSON.stringify({ error: 'No audio file uploaded' }), { status: 400 });
  }

  // Convert Blob to Buffer
  const arrayBuffer = await audio.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Hugging Face API token (add to .env.local as HUGGINGFACE_API_TOKEN)
  const HF_TOKEN = process.env.HUGGINGFACE_API_TOKEN || '';

  // 1. Transcribe audio using Hugging Face Whisper
  let transcript = '';
  try {
    const sttRes = await fetch('https://api-inference.huggingface.co/models/openai/whisper-base', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        'Content-Type': 'audio/mpeg',
      },
      body: buffer,
    });
    const sttData = await sttRes.json();
    transcript = sttData.text || '';
  } catch (e) {
    return new Response(JSON.stringify({ error: 'STT failed' }), { status: 500 });
  }

  // 2. Diarization (call to external Python service, placeholder)
  // You must run a local/remote Python service for diarization and call it here
  let diarization = '[Diarization service integration required]';
  // Example:
  // const diarizationRes = await fetch('http://localhost:5001/diarize', { method: 'POST', body: buffer });
  // diarization = await diarizationRes.text();

  // 3. Summarize transcript using Hugging Face BART
  let summary = '';
  try {
    const sumRes = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: transcript }),
    });
    const sumData = await sumRes.json();
    summary = sumData[0]?.summary_text || '';
  } catch (e) {
    summary = '[Summarization failed]';
  }

  return new Response(
    JSON.stringify({ transcript, diarization, summary }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

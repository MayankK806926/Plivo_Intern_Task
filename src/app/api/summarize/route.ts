import { NextRequest } from 'next/server';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import fetch from 'node-fetch';
import cheerio from 'cheerio';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file');
  const url = formData.get('url');
  if (!file && !url) {
    return new Response(JSON.stringify({ error: 'No file or URL provided' }), { status: 400 });
  }

  let text = '';
  try {
    if (file && typeof file !== 'string') {
      const name = file.name || '';
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      if (name.endsWith('.pdf')) {
        const data = await pdf(buffer);
        text = data.text;
      } else if (name.endsWith('.doc') || name.endsWith('.docx')) {
        const { value } = await mammoth.extractRawText({ buffer });
        text = value;
      }
    } else if (url && typeof url === 'string') {
      const html = await fetch(url).then(res => res.text());
      const $ = cheerio.load(html);
      text = $('body').text();
    }
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to extract text' }), { status: 500 });
  }

  // Hugging Face API token (add to .env.local as HUGGINGFACE_API_TOKEN)
  const HF_TOKEN = process.env.HUGGINGFACE_API_TOKEN || '';

  // Summarize with BART via Hugging Face API
  let summary = '';
  try {
    const sumRes = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: text }),
    });
    const sumData = await sumRes.json();
    summary = sumData[0]?.summary_text || '[No summary returned]';
  } catch (e) {
    summary = '[Summarization failed]';
  }

  return new Response(
    JSON.stringify({ summary }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const image = formData.get('image');
  if (!image || typeof image === 'string') {
    return new Response(JSON.stringify({ error: 'No image file uploaded' }), { status: 400 });
  }

  // Convert Blob to Buffer
  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Hugging Face API token (add to .env.local as HUGGINGFACE_API_TOKEN)
  const HF_TOKEN = process.env.HUGGINGFACE_API_TOKEN || '';

  // Call BLIP (Hugging Face) for image captioning
  let description = '';
  try {
    const res = await fetch('https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        'Content-Type': 'image/jpeg', // works for most images
      },
      body: buffer,
    });
    const data = await res.json();
    description = data[0]?.generated_text || '[No description returned]';
  } catch (e) {
    description = '[Image captioning failed]';
  }

  return new Response(
    JSON.stringify({ description }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

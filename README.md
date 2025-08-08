# AI Playground – Plivo Intern Task

A free-to-use, full-stack AI playground web app for audio, image, and document analysis. Built with Next.js, Tailwind CSS, and Hugging Face APIs. Includes a simple credential-based login.

## Features

- **Credential-based Login**: Only users with the correct email and password can access the playground.
- **Audio Analysis**: Transcribe audio using Hugging Face Whisper API.
- **Image Analysis**: Generate captions for images using Hugging Face BLIP API.
- **Document Summarization**: Summarize uploaded documents (PDF, DOCX, TXT) or URLs using Hugging Face BART API.
- **Modern UI**: Built with Tailwind CSS for a clean, responsive interface.
- **No server-side authentication**: Login is managed client-side for demo purposes.

## Demo Credentials

- **Email:** abciitian@gmail.com
- **Password:** abciitian

## Getting Started

### 1. Clone the repository
```sh
git clone https://github.com/MayankK806926/Plivo_Intern_Task.git
cd Plivo_Intern_Task
```

### 2. Install dependencies
```sh
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the root directory and add your Hugging Face API key:
```
HUGGINGFACE_API_KEY=your_huggingface_api_key
```

### 4. Run the development server
```sh
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) to use the app.

## Deployment
You can deploy this app to Vercel, Netlify, or any platform that supports Next.js. Make sure to set the `HUGGINGFACE_API_KEY` environment variable in your deployment settings.

## Project Structure
```
src/
  app/
    (auth)/login/page.tsx      # Login form (client-only)
    page.tsx                   # Main app entry, login logic
    api/                       # API routes for audio, image, summarize
  components/                  # UI components
  ...
```

## Tech Stack
- Next.js (App Router, TypeScript)
- Tailwind CSS
- Hugging Face APIs (Whisper, BLIP, BART)
- pdf-parse, mammoth, node-fetch, cheerio (for document/URL extraction)

## License
This project is for educational/demo purposes only.

---

**Made with ❤️ for the Plivo Internship Task**

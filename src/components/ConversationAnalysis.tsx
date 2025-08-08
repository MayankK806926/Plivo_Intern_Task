import * as React from 'react';

type Result = {
  transcript: string;
  diarization: string;
  summary: string;
};

export default function ConversationAnalysis() {
  const [audio, setAudio] = React.useState<File | null>(null);
  const [result, setResult] = React.useState<Result | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!audio) return;
    setLoading(true);
    setError(null);
    setResult(null);
    const formData = new FormData();
    formData.append('audio', audio);
    try {
      const res = await fetch('/api/conversation', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to analyze audio');
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-2 font-medium">Upload Audio File</label>
        <input
          type="file"
          accept="audio/*"
          onChange={e => setAudio(e.target.files?.[0] || null)}
          className="block w-full border rounded px-3 py-2"
          title="Upload audio file"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        disabled={!audio || loading}
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
      {error && <div className="text-red-600">{error}</div>}
      {result && (
        <div className="space-y-4 mt-6">
          <div>
            <h3 className="font-semibold mb-1">Transcript</h3>
            <div className="bg-gray-100 p-3 rounded whitespace-pre-wrap text-sm">{result.transcript}</div>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Diarization</h3>
            <div className="bg-gray-100 p-3 rounded whitespace-pre-wrap text-sm">{result.diarization}</div>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Summary</h3>
            <div className="bg-gray-100 p-3 rounded whitespace-pre-wrap text-sm">{result.summary}</div>
          </div>
        </div>
      )}
    </form>
  );
}

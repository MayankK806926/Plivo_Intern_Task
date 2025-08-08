import * as React from 'react';

export default function DocumentSummarization() {
  const [file, setFile] = React.useState<File | null>(null);
  const [url, setUrl] = React.useState('');
  const [summary, setSummary] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSummary(null);
    const formData = new FormData();
    if (file) formData.append('file', file);
    if (url) formData.append('url', url);
    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to summarize');
      const data = await res.json();
      setSummary(data.summary);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-2 font-medium">Upload PDF/DOC or Enter URL</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={e => setFile(e.target.files?.[0] || null)}
          className="block w-full border rounded px-3 py-2 mb-2"
          title="Upload PDF or DOC file"
        />
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={e => setUrl(e.target.value)}
          className="block w-full border rounded px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        disabled={(!file && !url) || loading}
      >
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>
      {error && <div className="text-red-600">{error}</div>}
      {summary && (
        <div className="space-y-4 mt-6">
          <div>
            <h3 className="font-semibold mb-1">Summary</h3>
            <div className="bg-gray-100 p-3 rounded whitespace-pre-wrap text-sm">{summary}</div>
          </div>
        </div>
      )}
    </form>
  );
}

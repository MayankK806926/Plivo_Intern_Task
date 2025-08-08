import * as React from 'react';

export default function ImageAnalysis() {
  const [image, setImage] = React.useState<File | null>(null);
  const [description, setDescription] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;
    setLoading(true);
    setError(null);
    setDescription(null);
    const formData = new FormData();
    formData.append('image', image);
    try {
      const res = await fetch('/api/image', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to analyze image');
      const data = await res.json();
      setDescription(data.description);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-2 font-medium">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={e => setImage(e.target.files?.[0] || null)}
          className="block w-full border rounded px-3 py-2"
          title="Upload image file"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        disabled={!image || loading}
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
      {error && <div className="text-red-600">{error}</div>}
      {description && (
        <div className="space-y-4 mt-6">
          <div>
            <h3 className="font-semibold mb-1">Description</h3>
            <div className="bg-gray-100 p-3 rounded whitespace-pre-wrap text-sm">{description}</div>
          </div>
        </div>
      )}
    </form>
  );
}

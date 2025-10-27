"use client";
import React, { useState } from 'react';

export default function RateButtonPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null);

  const sendRequest = async () => {
    setLoading(true);
    setResult(null);
    setStatus(null);
    try {
      const res = await fetch('/api/rate-test');
      const text = await res.text();
      setStatus(res.status);
      setResult(text);
    } catch (err) {
      setResult(err instanceof Error ? err.message : String(err));
      setStatus(null);
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Rate Test — Single Request</h1>
      <p className="mb-4">Click the button to send one request to <code>/api/rate-test</code>.</p>

      <button
        className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-60"
        onClick={sendRequest}
        disabled={loading}
      >
        {loading ? 'Sending…' : 'Send Request'}
      </button>

      <div className="mt-4">
        <div><strong>Status:</strong> {status ?? '—'}</div>
        <div className="mt-2"><strong>Body:</strong></div>
        <pre className="mt-1 p-2 bg-gray-50 rounded max-w-full whitespace-pre-wrap">{result ?? '—'}</pre>
      </div>
    </div>
  );
}

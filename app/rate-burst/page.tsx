"use client";
import React, { useRef, useState } from 'react';

const TOTAL_REQUESTS = 60;
const DELAY_MS = 25;

export default function RateBurstPage() {
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [recent, setRecent] = useState<string[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  const startBurst = async () => {
    if (running) return;
    setRunning(true);
    setCompleted(0);
    setCounts({});
    setRecent([]);
    abortRef.current = new AbortController();

    for (let i = 0; i < TOTAL_REQUESTS; i++) {
      if (abortRef.current?.signal.aborted) break;
      try {
        const res = await fetch('/api/rate-test', { signal: abortRef.current.signal });
        const text = await res.text();
        const status = String(res.status);
        setCounts(prev => ({ ...prev, [status]: (prev[status] || 0) + 1 }));
        setRecent(prev => [`#${i + 1} ${status} ${text}`].concat(prev).slice(0, 20));
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        setCounts(prev => ({ ...prev, ERR: (prev['ERR'] || 0) + 1 }));
        setRecent(prev => [`#${i + 1} ERR ${msg}`].concat(prev).slice(0, 20));
      }
      setCompleted(i + 1);
      // spacing between requests
      await new Promise(r => setTimeout(r, DELAY_MS));
    }

    setRunning(false);
  };

  const stopBurst = () => {
    abortRef.current?.abort();
    setRunning(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Rate Burst Tester</h1>
      <p className="mb-4">This page will send {TOTAL_REQUESTS} requests to <code>/api/rate-test</code> with {DELAY_MS}ms between requests.</p>

      <div className="flex gap-2 mb-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
          onClick={startBurst}
          disabled={running}
        >
          Start Burst
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-60"
          onClick={stopBurst}
          disabled={!running}
        >
          Stop
        </button>
      </div>

      <div className="mb-4">
        <div>Progress: {completed} / {TOTAL_REQUESTS}</div>
        <div className="mt-2">
          <strong>Status counts:</strong>
          <div className="mt-1">
            {Object.keys(counts).length === 0 && <span> none yet</span>}
            <ul>
              {Object.entries(counts).map(([k, v]) => (
                <li key={k}>{k}: {v}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div>
        <strong>Recent responses (latest 20):</strong>
        <div className="mt-2 max-h-64 overflow-auto bg-gray-50 p-2 rounded">
          {recent.length === 0 && <div className="text-sm text-gray-500">No responses yet</div>}
          <ul>
            {recent.map((r, idx) => (
              <li key={idx} className="text-sm font-mono">{r}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

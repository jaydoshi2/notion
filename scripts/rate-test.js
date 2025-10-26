// Node 18+ script to hammer an endpoint and count status codes.
// Usage: node scripts\rate-test.js <url> <totalRequests> <concurrency>
// Example: node scripts\rate-test.js "https://your-deployment.vercel.app/api/rate-test" 500 50

const url = process.argv[2] || 'https://your-deployment.vercel.app/api/rate-test';
const total = parseInt(process.argv[3] || '500', 10);
const concurrency = parseInt(process.argv[4] || '50', 10);

async function doRequest(i) {
  try {
    const res = await fetch(url, { method: 'GET' });
    // Try to capture some headers (if any)
    const headers = {};
    for (const [k, v] of res.headers) headers[k] = v;
    return { status: res.status, ok: res.ok, headers };
  } catch (err) {
    return { status: 0, error: String(err && err.message ? err.message : err) };
  }
}

async function run() {
  let completed = 0;
  const counts = {};
  function record(s) { counts[s] = (counts[s] || 0) + 1; }

  while (completed < total) {
    const batch = Math.min(concurrency, total - completed);
    const promises = [];
    for (let i = 0; i < batch; i++) {
      promises.push(doRequest(completed + i + 1));
    }
    const results = await Promise.all(promises);
    results.forEach(r => {
      record(r.status || 'ERR');
    });
    completed += batch;
    process.stdout.write(`Completed ${completed}/${total}\r`);
  }

  console.log('\nResults:');
  console.table(counts);
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});

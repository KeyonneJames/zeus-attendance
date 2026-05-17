// this file handles the attendance api route
// 'GET' gets the recent attendance rows from supabase
// 'POST' adds a new check in or check out row
// the supabase key stays in .env and used as variables so it is not in the frontend

// creating the base and variables for connecting to supabase
const SUPABASE_URL = process.env.SUPABASE_URL ?? '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
const REST_BASE = `${SUPABASE_URL}/rest/v1`;

const supabaseHeaders = (extras = {}) => ({
  apikey: SUPABASE_SERVICE_ROLE_KEY,
  Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
  'Content-Type': 'application/json',
  ...extras,
});

// small check for missing credentials
const missingCreds = () => !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY;

// async function to get recent attendance records from supabase
async function listAttendance(req, res) {
  const limit = Math.max(1, Math.min(500, Number(req.query?.limit) || 200));
  try {
    const url = `${REST_BASE}/attendance?select=*&order=created_at.desc&limit=${limit}`;
    const upstream = await fetch(url, { headers: supabaseHeaders() });

    if (!upstream.ok) {
      const body = await upstream.text();
      return res.status(upstream.status).json({ error: body || `HTTP ${upstream.status}` });
    }
    const rows = await upstream.json();
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// async function to insert a new attendance record
// expects a json body with name, action (check_in or check_out), and optional verifiedAt timestamp
async function insertAttendance(req, res) {
  const { name, action, verifiedAt } = req.body ?? {};

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'name is required' });
  }
  if (action !== 'check_in' && action !== 'check_out') {
    return res.status(400).json({ error: "action must be 'check_in' or 'check_out'" });
  }
  const verified = verifiedAt ?? new Date().toISOString();

  try {
    const upstream = await fetch(`${REST_BASE}/attendance`, {
      method: 'POST',
      headers: supabaseHeaders({ Prefer: 'return=representation' }),
      body: JSON.stringify([
        { user_name: name.trim(), action, verified_at: verified },
      ]),
    });

    if (!upstream.ok) {
      const body = await upstream.text();
      return res.status(upstream.status).json({ error: body || `HTTP ${upstream.status}` });
    }
    const inserted = await upstream.json();
    return res.status(201).json(inserted[0] ?? null);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// main handler for the attendance api route
export default async function handler(req, res) {
  if (missingCreds()) {
    return res.status(500).json({
      error:
        'Supabase env variables missing: make sure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in your environment',
    });
  }

  // route the request to the function based on the method
  if (req.method === 'GET') return listAttendance(req, res);
  if (req.method === 'POST') return insertAttendance(req, res);

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Method not allowed' });
}

// All data calls live here. The frontend never talks to Supabase or WorldTime
// directly — every request goes to our own backend, which is:
//   • /api/* serverless functions on Vercel in production
//   • the same handlers, mounted by dev-api.js, in local development
//
// Frontend uses relative URLs so it works in both environments with zero
// configuration.

const API_BASE = ''; // relative — Vite proxies /api → :4000 in dev

async function request(path, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers ?? {}),
      },
    });

    const text = await res.text();
    const data = text ? safeJson(text) : null;

    if (!res.ok) {
      return {
        ok: false,
        error: data?.error || text || `HTTP ${res.status}`,
      };
    }
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

const safeJson = (text) => {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

/* -------------------------------------------------------------------------- */
/*  Attendance                                                                */
/* -------------------------------------------------------------------------- */

/**
 * POST /api/attendance — insert one check-in or check-out row.
 */
export async function recordAttendance({ name, action, verifiedAt }) {
  const result = await request('/api/attendance', {
    method: 'POST',
    body: JSON.stringify({ name, action, verifiedAt }),
  });
  return result;
}

/**
 * GET /api/attendance — list recent rows for the dashboard.
 */
export async function fetchAttendance({ limit = 200 } = {}) {
  const result = await request(`/api/attendance?limit=${limit}`);
  return {
    ok: result.ok,
    rows: Array.isArray(result.data) ? result.data : [],
    error: result.error,
  };
}

/* -------------------------------------------------------------------------- */
/*  Verified time                                                             */
/* -------------------------------------------------------------------------- */

/**
 * GET /api/time — backend proxies WorldTime API and returns { datetime, source }.
 */
export async function fetchVerifiedNow() {
  const result = await request('/api/time');
  if (!result.ok || !result.data?.datetime) {
    return { date: new Date(), source: 'local' };
  }
  return {
    date: new Date(result.data.datetime),
    source: result.data.source ?? 'backend',
  };
}

// all the frontend api calls are in this file
// the frontend calls my own api routes instead of calling supabase or worldtime directly
// this helps keep the backend logic in one place

const API_BASE = '';

// helper async function to call the api routes and handles errors like if the database is down or worltime isnt working, it returns
// status and error messages
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

//post request to /api/attendance with name, action and verifiedAt to record attendance and send to database
export async function recordAttendance({ name, action, verifiedAt }) {
  const result = await request('/api/attendance', {
    method: 'POST',
    body: JSON.stringify({ name, action, verifiedAt }),
  });
  return result;
}

// for the dashboard, we fetch the attendance records from the database 
export async function fetchAttendance({ limit = 200 } = {}) {
  const result = await request(`/api/attendance?limit=${limit}`);
  return {
    ok: result.ok,
    rows: Array.isArray(result.data) ? result.data : [],
    error: result.error,
  };
}

// function to get the current time from the time api route and if it fails, it'll just return the local time
export async function fetchVerifiedNow() {
  const result = await request('/api/time');
  if (!result.ok || !result.data?.datetime) { // if the api call fails, go to local time
    return { date: new Date(), source: 'local' };
  }
  return {
    date: new Date(result.data.datetime),
    source: result.data.source ?? 'backend',
  };
}

// gets the current time from the world time api
// if that api fails, try timeapi.io
// if both fail, then use the servers local time because the main focus is for functionality

// this file handles the /api/time route, which returns the current time in ISO format
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // based on your ip, should return the current time in ISO format like 2026-05-17T23:59:59.999Z
    const upstream = await fetch('https://worldtimeapi.org/api/ip', {
      cache: 'no-store',
    });
    if (upstream.ok) {
      const data = await upstream.json();
      return res.status(200).json({ // return 200 status with the datetime and source of the time if the response is ok
        datetime: data.datetime,
        source: 'worldtimeapi',
      });
    }
    // if the response is not ok, we will try the backup source instead of failing
  } catch {
    // fall through to backup source
  }

  try {
    const fallback = await fetch(
      'https://timeapi.io/api/Time/current/zone?timeZone=UTC',
      { cache: 'no-store' },
    );
    if (fallback.ok) {
      const data = await fallback.json();
      return res.status(200).json({
        datetime: `${data.dateTime}Z`,
        source: 'timeapi',
      });
    }
    // if the response is not ok, we will fall through to local time
  } catch {
    // fall through to local
  }

  return res.status(200).json({
    datetime: new Date().toISOString(),
    source: 'server-local',
  });
}

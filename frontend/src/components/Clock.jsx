import { useEffect, useRef, useState } from 'react';
import { fetchVerifiedNow } from '../lib/api.js';

const formatTime = (date) =>
  date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

const formatDate = (date) =>
  date.toLocaleDateString([], {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

// verifys the time from the time API once, then use the computers clock to keep counting so we dont call the api 
// every second, also makes sure the the time is synced every minute in the worst case that a computer clock is off. 
function Clock({ onReady }) {
  const [now, setNow] = useState(new Date());
  const [source, setSource] = useState('local');
  const baseRef = useRef({ verified: new Date(), localAtSync: Date.now() });

  const sync = async () => {
    const { date, source: src } = await fetchVerifiedNow();
    baseRef.current = { verified: date, localAtSync: Date.now() };
    setNow(date);
    setSource(src);
  };

  useEffect(() => {
    sync();
    const tick = setInterval(() => {
      const drift = Date.now() - baseRef.current.localAtSync;
      setNow(new Date(baseRef.current.verified.getTime() + drift));
    }, 1000);
    const resync = setInterval(sync, 60000);

    if (onReady) {
      onReady(() => {
        const drift = Date.now() - baseRef.current.localAtSync;
        return new Date(baseRef.current.verified.getTime() + drift);
      });
    }

    return () => {
      clearInterval(tick);
      clearInterval(resync);
    };
  }, []);

  return (
    <div className="clock">
      <div className="clock-time" aria-live="polite">
        {formatTime(now)}
      </div>
      <div className="clock-date">{formatDate(now)}</div>
      <div className="clock-source">
        {source === 'local'
          ? 'Local time (backend unreachable)'
          : source === 'worldtimeapi'
            ? 'Verified via WorldTime API'
            : source === 'timeapi'
              ? 'Verified via TimeAPI'
              : 'Verified via backend'}
      </div>
    </div>
  );
}

export default Clock;

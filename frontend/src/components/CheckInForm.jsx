import { useState } from 'react';
import { recordAttendance } from '../lib/api.js';

// form for checking in and out, includes a name field, buttons for check in and out, and feedback messages
// using reacts use state hook to manage the state of the form on mount and when a user interacts
function CheckInForm({ getVerifiedNow }) {
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const submit = async (action) => {
    const trimmed = name.trim();
    if (!trimmed) {
      setFeedback({
        kind: 'error',
        text: 'Please enter your name before checking in or out.',
      });
      return;
    }

    setBusy(true);
    setFeedback(null);

    const verifiedAt = getVerifiedNow
      ? getVerifiedNow().toISOString()
      : new Date().toISOString();

    const result = await recordAttendance({
      name: trimmed,
      action,
      verifiedAt,
    });

    setBusy(false);

    if (!result.ok) {
      setFeedback({
        kind: 'error',
        text: `Could not save attendance: ${result.error}`,
      });
      return;
    }

    const verb = action === 'check_in' ? 'checked in' : 'checked out';
    const stamp = new Date(verifiedAt).toLocaleTimeString();
    setFeedback({
      kind: 'success',
      text: `${trimmed} ${verb} at ${stamp}.`,
    });
  };

  return (
    <div className="checkin">
      <label htmlFor="zeus-name" className="checkin-label"> Your name </label>
      <input id="zeus-name" className="checkin-input" type="text" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />

      <div className="checkin-buttons">
        <button type="button" className="btn btn-primary" disabled={busy} onClick={() => submit('check_in')}>
          {busy ? 'Saving…' : 'Check In'}
        </button>

        <button type="button" className="btn btn-secondary" disabled={busy} onClick={() => submit('check_out')}>
          {busy ? 'Saving…' : 'Check Out'}
        </button>
      </div>

      {feedback && (
        <div
          role="status"
          className={`checkin-feedback checkin-feedback-${feedback.kind}`}
        >
          {feedback.text}
        </div>
      )}
    </div>
  );
}

export default CheckInForm;

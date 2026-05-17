
import 'dotenv/config';
import express from 'express';
import timeHandler from './api/time.js';
import attendanceHandler from './api/attendance.js';

// very small express server to run the api routes locally during development
const app = express();
app.use(express.json());

const PORT = Number(process.env.DEV_API_PORT) || 4000;

// small adapter so the same api files can work in express locally
// and also work when deployed on vercel
function vercelAdapter(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (err) {
      console.error('[dev-api] handler error:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: err.message });
      }
    }
  };
}

app.all('/api/time', vercelAdapter(timeHandler));
app.all('/api/attendance', vercelAdapter(attendanceHandler));
app.get('/', (_req, res) => {
  res.json({
    name: 'zeus-dev-api',
    endpoints: ['GET /api/time', 'GET /api/attendance', 'POST /api/attendance'],
  });
});

// start the server
app.listen(PORT, () => {
  console.log(`[zeus-dev-api] listening on http://localhost:${PORT}`);
});

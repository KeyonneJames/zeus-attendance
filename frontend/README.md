# Zeus — Dynamic Attendance Tracker

Zeus is a web-based attendance system that replaces paper sign-in sheets.
Users enter their name, see a live WorldTime-synced clock, and tap **Check In**
or **Check Out**. Each action is saved to a Supabase database with the user
name, verified timestamp, and action type. A dashboard page visualizes the
records with Chart.js.

## Architecture

```
┌────────────────────┐    fetch /api/*    ┌────────────────────────┐    fetch    ┌──────────────┐
│   React frontend   │ ─────────────────► │ Vercel serverless      │ ──────────► │   Supabase   │
│   (Vite, /src)     │                    │ functions (/api/*.js)  │             │   Database   │
└────────────────────┘                    └──────────┬─────────────┘             └──────────────┘
                                                     │
                                                     └─ fetch ──► WorldTime API
```

- **Frontend** (`/src`): React 19 + Vite, never talks to Supabase directly.
- **Backend** (`/api`): Vercel serverless functions you wrote. They hold the
  Supabase `service_role` key (server-side only) and proxy all data calls.
- **Local dev**: a small Express runner (`dev-api.js`) mounts the same
  handlers on `http://localhost:4000` so `vite dev` can proxy `/api/*` to it.

## The 3 backend endpoints

| Method | URL | Purpose | Used by |
|---|---|---|---|
| `GET`  | `/api/time` | External — proxies WorldTime API | `Clock` component |
| `GET`  | `/api/attendance` | Read — lists Supabase rows | `Dashboard` page |
| `POST` | `/api/attendance` | Write — inserts a check-in/out | `CheckInForm` component |

## JS libraries on the frontend

| Library | Purpose |
|---|---|
| `react-router-dom` | Client-side navigation between pages |
| `chart.js` + `react-chartjs-2` | Daily attendance bar chart on the dashboard |

## Pages

| Route | Page | Purpose |
|---|---|---|
| `/` | Home | Welcome, live clock, name input, check-in/out |
| `/dashboard` | Dashboard | Chart + searchable table of attendance records |
| `/about` | About | The problem, the solution, the scope |
| `/help` | Help | How to start, log in, check in/out |
| `/login` | Login | Stub for future admin login |

## Getting started

```bash
npm install
npm run dev
```

`npm run dev` runs **two processes** in parallel:

- `api`  — the local serverless function runner on `http://localhost:4000`
- `vite` — the React frontend on `http://localhost:5173` (proxies `/api/*` → 4000)

Open <http://localhost:5173>. That's it.

### Environment variables

The repo includes a working `.env`. If you need to set up your own:

```env
SUPABASE_URL=https://YOUR-PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR-SERVICE-ROLE-KEY
DEV_API_PORT=4000
```

> ⚠️ These do **not** start with `VITE_`, so Vite will not expose them to the
> browser bundle — exactly what we want. The frontend uses only the relative
> URL `/api/*` and never sees the service_role key.

### Supabase table

```sql
create table attendance (
  id uuid primary key default gen_random_uuid(),
  user_name text not null,
  action text not null check (action in ('check_in', 'check_out')),
  verified_at timestamptz not null,
  created_at timestamptz not null default now()
);
```

## Deploying to Vercel

1. Push this folder (`client/final_project`) to GitHub.
2. Import the repo in Vercel → it auto-detects Vite.
3. In Vercel → Project Settings → **Environment Variables**, add:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy.

The included `vercel.json` rewrites all non-`/api` paths to `/` so the React
Router routes (`/dashboard`, `/about`, etc.) survive a hard refresh. The
`/api/*` files are deployed as serverless functions automatically.

## Project layout

```
client/final_project/
├── api/                    # Vercel serverless functions (the backend)
│   ├── time.js             #   GET  /api/time
│   └── attendance.js       #   GET + POST /api/attendance
├── dev-api.js              # Local-only Express runner for /api/*
├── src/
│   ├── main.jsx            # router entry
│   ├── App.jsx             # layout shell
│   ├── index.css           # design tokens + resets
│   ├── lib/
│   │   └── api.js          # all frontend fetch() calls
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Clock.jsx       # uses /api/time
│   │   └── CheckInForm.jsx # uses POST /api/attendance
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx   # uses GET /api/attendance + Chart.js
│   │   ├── About.jsx
│   │   ├── Help.jsx
│   │   └── Login.jsx
│   └── styles/             # App, Navbar, Home, Content, Dashboard
├── .env                    # server-side secrets (gitignored)
├── vite.config.js          # proxies /api → :4000 in dev
├── vercel.json             # SPA rewrites + leaves /api alone
└── package.json
```

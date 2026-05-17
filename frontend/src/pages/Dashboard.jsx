import { useEffect, useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { fetchAttendance } from '../lib/api.js';
import '../styles/Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const dayKey = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
  });
};

// builds daily check in and check out counts for the last "day count" days (7) including today
function buildDailyStats(rows, dayCount = 7) {
  const today = new Date();
  const days = [];
  for (let i = dayCount - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push(dayKey(d.toISOString()));
  }

  const buckets = Object.fromEntries(days.map((d) => [d, { in: 0, out: 0 }]));
  rows.forEach((r) => {
    const key = dayKey(r.verified_at ?? r.created_at);
    if (!buckets[key]) return;
    if (r.action === 'check_in') buckets[key].in += 1;
    if (r.action === 'check_out') buckets[key].out += 1;
  });

  return {
    labels: days,
    checkIns: days.map((d) => buckets[d].in),
    checkOuts: days.map((d) => buckets[d].out),
  };
}

// build dashboard with a chart of recent check ins and check outs, also includes a searchable table of attendance records. 
function Dashboard() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  const load = async () => {
    setLoading(true);
    setError(null);
    const result = await fetchAttendance({ limit: 200 });
    if (!result.ok) {
      setError(result.error);
      setRows([]);
    } else {
      setRows(result.rows);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return rows;
    const q = query.trim().toLowerCase();
    return rows.filter((r) => r.user_name?.toLowerCase().includes(q));
  }, [rows, query]);

  const stats = useMemo(() => buildDailyStats(rows), [rows]);

  const chartData = {
    labels: stats.labels,
    datasets: [
      {
        label: 'Check-ins',
        data: stats.checkIns,
        backgroundColor: '#1e7dd8',
        borderRadius: 6,
      },
      {
        label: 'Check-outs',
        data: stats.checkOuts,
        backgroundColor: '#4ea6f0',
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: false },
    },
    scales: {
      y: { beginAtZero: true, ticks: { precision: 0 } },
    },
  };

  return (
    <section className="dashboard">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Attendance Dashboard</h1>
            <p className="dashboard-subtitle">
              Records of check ins and check outs for the last 7 days
            </p>
          </div>
          <button className="btn btn-secondary" onClick={load} disabled={loading}>
            {loading ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>

        {error && (
          <div className="dashboard-banner dashboard-banner-error">
            Could not load records: {error}
          </div>
        )}

        <div className="dashboard-chart-wrap">
          <Bar data={chartData} options={chartOptions} />
        </div>

        <div className="dashboard-toolbar">
          <input
            type="search"
            className="dashboard-search"
            placeholder="Search by name…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="dashboard-count">
            {filtered.length} {filtered.length === 1 ? 'record' : 'records'}
          </span>
        </div>

        <div className="dashboard-table-wrap">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Action</th>
                <th>Verified at</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={3} className="dashboard-empty">Loading…</td>
                </tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={3} className="dashboard-empty">
                    No attendance records yet. Head to the home page and check in!
                  </td>
                </tr>
              )}
              {!loading &&
                filtered.map((row) => (
                  <tr key={row.id}>
                    <td>{row.user_name}</td>
                    <td>
                      <span
                        className={`pill pill-${row.action === 'check_in' ? 'in' : 'out'}`}
                      >
                        {row.action === 'check_in' ? 'Check in' : 'Check out'}
                      </span>
                    </td>
                    <td>{new Date(row.verified_at).toLocaleString()}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;

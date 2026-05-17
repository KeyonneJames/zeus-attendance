import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import './styles/App.css';

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Zeus Systems</p>
      </footer>
    </div>
  );
}

export default App;

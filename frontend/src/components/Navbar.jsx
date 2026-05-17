import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';
import sunLogo from '/src/assets/sun.png'

function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="navbar-brand" end>
      <img src={sunLogo} alt="Zeus" className="navbar-zeus-logo"/>
      <span className="navbar-brand-text">Zeus</span>
      </NavLink>

      <nav className="navbar-links">
        <NavLink to="/dashboard" className="navbar-link">
          Dashboard
        </NavLink>
        <NavLink to="/about" className="navbar-link">
          About Us
        </NavLink>
        <NavLink to="/login" className="navbar-link">
          Login
        </NavLink>
        <NavLink to="/help" className="navbar-link">
          Help
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;

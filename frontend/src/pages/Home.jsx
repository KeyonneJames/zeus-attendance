import { useRef } from 'react';
import Clock from '../components/Clock.jsx';
import CheckInForm from '../components/CheckInForm.jsx';
import '../styles/Home.css';
import sunLogo from '/src/assets/sun.png';

function Home() {
  const verifiedGetterRef = useRef(null);

  return (
    <section className="home">
      <div className="home-card">
        <img src={sunLogo} alt="zeus sun logo" className="home-logo" />
        <h1 className="home-welcome">Welcome to Zeus</h1>

        {/* Clock display and check in/out buttons */}
        <Clock
          onReady={(getter) => {
            verifiedGetterRef.current = getter;
          }}
        />

        <CheckInForm
          getVerifiedNow={() =>
            verifiedGetterRef.current
              ? verifiedGetterRef.current()
              : new Date()
          }
        />
      </div>
    </section>
  );
}

export default Home;

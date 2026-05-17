import '../styles/Content.css';

function Help() {
  return (
    <section className="content-page">
      <div className="content-card">
        <h1 className="content-title">Help</h1>

        <div className="content-section">
          <h2>To start</h2>
          <p>
            Open Zeus in any web browser. No download or install is
            required. The home screen is where everything happens.
          </p>
        </div>

        <div className="content-section">
          <h2>Login</h2>
          <p>
            For day to day check ins, you do not need an account: just type your
            name in the name field on the home page and click check in.
            The Login screen is for future organization administrators who will export attendance records from their group.
          </p>
        </div>

        <div className="content-section">
          <h2>Check in / out</h2>
          <ol className="content-steps">
            <li>Type your full name in the input field on the home page.</li>
            <li>
              Look at the live clock to confirm the current verified time.
            </li>
            <li>
              Click <strong>Check In</strong> when you arrive, or
              <strong> Check Out</strong> when you're leaving.
            </li>
            <li>
              You will see an instant confirmation message with the exact
              timestamp that was saved to the database.
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Help;

import '../styles/Content.css';

function About() {
  return (
    <section className="content-page">
      <div className="content-card">
        <h1 className="content-title">About Zeus</h1>

        <div className="content-section">
          <h2>Difficulty keeping up with attendance?</h2>
          <p>
            Workplaces, daycares, and classrooms still rely on paper
            sign in sheets every day. Pages get lost, ink gets smudged,
            and nobody can find the binder when it's time to count up hours or
            check who was actually present last Tuesday.
          </p>
          <p>
            Manually tracking this info can take hours on hours of searching each week and
            when records get lost. People are affected in ways like missed paychecks, compliance issues or confused parents.
          </p>
        </div>

        <div className="content-section">
          <h2>What we do?</h2>
          <p>
            Zeus replaces the outdated paper trail with a clean digital check in system. Every
            entry is stamped with a verified time from the WorldTime API and
            stored in a Supabase database, so the record is always stampled with no errors.
          </p>
          <p>
            The interface is intentionally minimal. A name field, a check in
            button, a check out button, and a clock.
          </p>
        </div>

        <div className="content-section">
          <h2>Scope</h2>
          <p>
            Zeus is designed for any setting where someone needs to know who
            was where, and when like daycares taking daily attendance, hourly workplaces logging shift
            starts and event organizers checking in attendees.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;

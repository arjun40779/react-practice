import { Link } from "react-router";

const apps = [
  {
    href: "/counter",
    icon: "±",
    name: "Counter",
    description: "Keep a running count, with undo and redo built in.",
    action: "Open counter",
  },
  {
    href: "/todo",
    icon: "✓",
    name: "Todo list",
    description: "Capture tasks, track progress, and stay organized.",
    action: "Open todo list",
  },
  {
    href: "/tabs",
    icon: "↔",
    name: "Tabs",
    description: "Switch between related sections with accessible controls.",
    action: "Open tabs",
  },
];

const HomePage = () => (
  <main className="home-page">
    <section className="home-content" aria-labelledby="home-title">
      <header className="home-header">
        <p className="eyebrow">YOUR SPACE</p>
        <h1 id="home-title">A little space for useful things.</h1>
        <p className="home-description">
          Choose an app and pick up where you left off.
        </p>
      </header>
      <ul className="app-grid">
        {apps.map((app) => (
          <li key={app.href}>
            <Link className="app-card" to={app.href}>
              <span className="app-icon" aria-hidden="true">
                {app.icon}
              </span>
              <span className="app-card-content">
                <span className="app-name">{app.name}</span>
                <span className="app-description">{app.description}</span>
                <span className="app-action">
                  {app.action} <span aria-hidden="true">→</span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  </main>
);

export default HomePage;

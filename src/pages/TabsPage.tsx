import { useState } from "react";
import { Link } from "react-router";
import Tabs from "../components/Tabs/Tabs";

const tabItems = [
  {
    label: "Overview",
    value: "overview",
    content: (
      <>
        <h2>One clear view</h2>
        <p>
          Tabs organize related information into focused sections without
          sending you to a different page.
        </p>
      </>
    ),
  },
  {
    label: "Details",
    value: "details",
    content: (
      <>
        <h2>Details when you need them</h2>
        <p>
          Keep supporting information close by, while leaving the main view
          uncluttered.
        </p>
      </>
    ),
  },
  {
    label: "Resources",
    value: "resources",
    content: (
      <>
        <h2>Useful resources</h2>
        <p>
          Group links, references, or next steps in their own section so they
          are easy to find.
        </p>
      </>
    ),
  },
];

const TabsPage = () => {
  const [activeTab, setActiveTab] = useState(tabItems[0].value);

  return (
    <main className="tabs-page">
      <section className="tabs-card" aria-labelledby="tabs-title">
        <Link className="back-link" to="/">
          <span aria-hidden="true">←</span> All apps
        </Link>
        <header className="tabs-header">
          <p className="eyebrow">FOCUSED CONTENT</p>
          <h1 id="tabs-title">Everything in its place.</h1>
          <p className="todo-description">
            Switch sections to explore a simple controlled tabs component.
          </p>
        </header>
        <Tabs items={tabItems} value={activeTab} onChange={setActiveTab} />
        <p className="tabs-footnote">
          Use the arrow keys, Home, or End to move between tabs.
        </p>
      </section>
    </main>
  );
};

export default TabsPage;

import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import CodeBlock from "@theme/CodeBlock";
import { HeroCalendarPreview } from "../components/examples";

const featureCards = [
  {
    title: "Booking-aware behavior",
    body: "Protect past dates, reservations, and blocked intervals without re-implementing date math in every app.",
  },
  {
    title: "Customizable internals",
    body: "Tweak styles with classNames or replace the calendar parts that matter to your product.",
  },
  {
    title: "Two display modes",
    body: "Use the monthly calendar for direct selection or switch to the virtualized scrollable view for longer timelines.",
  },
];

const docCards = [
  {
    title: "Getting Started",
    href: "/docs/getting-started",
    copy: "Install the package, pull in styles, and mount your first booking flow.",
  },
  {
    title: "Examples",
    href: "/docs/calendar",
    copy: "Work through live demos for monthly, range, scrollable, themed, and overridden calendars.",
  },
  {
    title: "API Reference",
    href: "/docs/api-reference",
    copy: "Scan the exported props, types, and utilities before integrating the component deeply.",
  },
];

export default function Home() {
  return (
    <Layout
      title="Interactive docs"
      description="Interactive GitHub Pages documentation for React Booking Calendar."
    >
      <main className="landing-shell">
        <section className="landing-hero">
          <div className="landing-hero__copy">
            <span className="landing-eyebrow">GitHub Pages docs</span>
            <h1>Booking flows need more than a date picker.</h1>
            <p>
              React Booking Calendar gives you selection logic, reservation
              protection, and extensible calendar parts in a package that is
              small enough to ship and flexible enough to brand.
            </p>

            <div className="landing-actions">
              <Link className="button button--primary button--lg" to="/docs/intro">
                Open docs
              </Link>
              <Link
                className="button button--secondary button--lg"
                href="https://github.com/demark-pro/react-booking-calendar"
              >
                View repository
              </Link>
            </div>

            <div className="landing-install">
              <span>Install</span>
              <CodeBlock language="bash">
                {"npm install @demark-pro/react-booking-calendar"}
              </CodeBlock>
            </div>
          </div>

          <div className="landing-hero__preview">
            <div className="landing-preview-card">
              <div className="landing-preview-card__header">
                <strong>Live package preview</strong>
                <span>Rendered with the local package dependency</span>
              </div>
              <HeroCalendarPreview />
            </div>
          </div>
        </section>

        <section className="landing-band">
          <div className="landing-band__header">
            <span className="landing-eyebrow">Why teams use it</span>
            <h2>Opinionated enough for booking logic, open enough for product teams.</h2>
          </div>

          <div className="landing-grid">
            {featureCards.map((card) => (
              <article key={card.title} className="landing-card">
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-band">
          <div className="landing-band__header">
            <span className="landing-eyebrow">Map the docs</span>
            <h2>Start with the quick path, then dive into the edges.</h2>
          </div>

          <div className="landing-grid landing-grid--docs">
            {docCards.map((card) => (
              <Link
                key={card.title}
                className={clsx("landing-card", "landing-card--link")}
                to={card.href}
              >
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}

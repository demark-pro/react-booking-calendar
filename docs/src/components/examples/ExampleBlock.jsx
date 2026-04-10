import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import CodeBlock from "@theme/CodeBlock";
import clsx from "clsx";
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";

export function ExampleBlock({
  title,
  description,
  code,
  children,
  className,
  language = "tsx",
}) {
  return (
    <section className={clsx("docs-example", className)}>
      <div className="docs-example__header">
        <div>
          <h3>{title}</h3>
          {description ? <p>{description}</p> : null}
        </div>
        <span className="docs-example__badge">Live example</span>
      </div>

      <div className="docs-example__grid">
        <div className="docs-example__preview">
          <BrowserOnly
            fallback={
              <div className="docs-example__loading">
                Loading interactive preview...
              </div>
            }
          >
            {() => <div className="docs-example__canvas">{children}</div>}
          </BrowserOnly>
        </div>

        <div className="docs-example__code">
          <CodeBlock language={language}>{code.trim()}</CodeBlock>
        </div>
      </div>
    </section>
  );
}

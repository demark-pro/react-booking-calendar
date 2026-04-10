import React, { useState } from "react";
import { Calendar } from "@demark-pro/react-booking-calendar";
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";
import { ExampleBlock } from "./ExampleBlock";
import { basicCalendarCode } from "./example-snippets";
import { basicReservations, formatSelection, relativeDate } from "./demo-data";

function BasicCalendarDemo({ compact = false }) {
  const [selected, setSelected] = useState([relativeDate(1), null]);

  return (
    <div className="docs-demo__calendar-stack">
      <div className={compact ? "docs-demo__calendar-compact" : "docs-demo__calendar-frame"}>
        <Calendar
          selected={selected}
          reserved={basicReservations}
          onChange={setSelected}
          options={{ weekStartsOn: 1 }}
        />
      </div>

      <div className="docs-demo__meta">
        <div>
          <span className="docs-demo__label">Selection</span>
          <strong>{formatSelection(selected)}</strong>
        </div>
        <div>
          <span className="docs-demo__label">Reservations</span>
          <strong>{basicReservations.length} protected stays</strong>
        </div>
      </div>
    </div>
  );
}

export function BasicCalendarExample() {
  return (
    <ExampleBlock
      title="Basic calendar"
      description="A minimal monthly booking view with protected reservations and controlled selection."
      code={basicCalendarCode}
    >
      <BasicCalendarDemo />
    </ExampleBlock>
  );
}

export function HeroCalendarPreview() {
  return <BasicCalendarDemo compact />;
}

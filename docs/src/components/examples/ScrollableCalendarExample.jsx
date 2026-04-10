import React, { useState } from "react";
import { ScrollableCalendar } from "@demark-pro/react-booking-calendar";
import { ExampleBlock } from "./ExampleBlock";
import { scrollableCalendarCode } from "./example-snippets";
import {
  formatSelection,
  relativeDate,
  scrollReservations,
} from "./demo-data";

function ScrollableCalendarDemo() {
  const [selected, setSelected] = useState([null, null]);

  return (
    <div className="docs-demo__calendar-stack">
      <div className="docs-demo__scrollable-shell">
        <ScrollableCalendar
          startMonth={relativeDate(0)}
          monthsCount={6}
          colHeight={56}
          initialScroll={relativeDate(28)}
          selected={selected}
          reserved={scrollReservations}
          onChange={setSelected}
          options={{ weekStartsOn: 1 }}
        />
      </div>

      <div className="docs-demo__meta">
        <div>
          <span className="docs-demo__label">Viewport</span>
          <strong>6 months, virtualized</strong>
        </div>
        <div>
          <span className="docs-demo__label">Selection</span>
          <strong>{formatSelection(selected)}</strong>
        </div>
      </div>
    </div>
  );
}

export function ScrollableCalendarExample() {
  return (
    <ExampleBlock
      title="Scrollable calendar"
      description="Use the virtualized view for long availability timelines while keeping selection logic identical."
      code={scrollableCalendarCode}
    >
      <ScrollableCalendarDemo />
    </ExampleBlock>
  );
}

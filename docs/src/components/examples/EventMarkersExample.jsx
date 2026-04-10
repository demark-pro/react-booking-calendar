import React, { useState } from "react";
import clsx from "clsx";
import { Calendar } from "@demark-pro/react-booking-calendar";
import { ExampleBlock } from "./ExampleBlock";
import { eventMarkersCode } from "./example-snippets";
import {
  eventLegend,
  eventMarkersByDay,
  formatSelection,
  relativeDate,
} from "./demo-data";

const dayKey = (value) => {
  const date = new Date(value);
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

function EventDayContent({
  children,
  date,
  state,
  innerProps,
  getClassNames,
}) {
  const { className = "", ...restInnerProps } = innerProps ?? {};
  const markers = eventMarkersByDay[dayKey(date)] ?? [];

  return (
    <div
      className={clsx(
        getClassNames("DayContent", className),
        "docs-demo__event-day-content"
      )}
      {...restInnerProps}
    >
      <span className="docs-demo__event-day-number">{children}</span>
      <span className="docs-demo__event-markers">
        {state.isSameMonth
          ? markers.slice(0, 3).map((marker, index) => (
              <span
                key={`${marker.label}-${index}`}
                className="docs-demo__event-marker"
                style={{ backgroundColor: marker.color }}
                title={marker.label}
              />
            ))
          : null}
      </span>
    </div>
  );
}

function EventMarkersDemo() {
  const [selected, setSelected] = useState([relativeDate(3), null]);

  return (
    <div className="docs-demo__calendar-stack">
      <div className="docs-demo__calendar-frame">
        <Calendar
          selected={selected}
          onChange={setSelected}
          options={{ weekStartsOn: 1 }}
          components={{
            DayContent: EventDayContent,
          }}
        />
      </div>

      <div className="docs-demo__meta">
        <div>
          <span className="docs-demo__label">Pattern</span>
          <strong>Markers rendered under the day number via `DayContent`</strong>
        </div>
        <div>
          <span className="docs-demo__label">Selection</span>
          <strong>{formatSelection(selected)}</strong>
        </div>
      </div>

      <div className="docs-demo__legend">
        {eventLegend.map((item) => (
          <span key={item.label} className="docs-demo__legend-item">
            <span
              className="docs-demo__legend-dot"
              style={{ backgroundColor: item.color }}
            />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function EventMarkersExample() {
  return (
    <ExampleBlock
      title="Events calendar with markers"
      description="A custom `DayContent` override can keep the default selection behavior and still render event dots under each date."
      code={eventMarkersCode}
    >
      <EventMarkersDemo />
    </ExampleBlock>
  );
}

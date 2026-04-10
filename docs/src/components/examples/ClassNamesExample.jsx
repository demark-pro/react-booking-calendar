import React, { useState } from "react";
import { Calendar } from "@demark-pro/react-booking-calendar";
import { ExampleBlock } from "./ExampleBlock";
import { classNamesCode } from "./example-snippets";
import {
  formatSelection,
  styledReservations,
  relativeDate,
} from "./demo-data";

const sunriseClassNames = {
  CalendarContainer: "booking-demo booking-demo--sunrise",
  MonthContent: "booking-demo__month",
  MonthArrowBack: "booking-demo__arrow",
  MonthArrowNext: "booking-demo__arrow",
  WeekContent: "booking-demo__weekday",
  DayContainer: "booking-demo__day",
  DayContent: "booking-demo__day-content",
  DaySelection: "booking-demo__selection",
  DayReservation: "booking-demo__reservation",
  DayToday: "booking-demo__today",
};

function ClassNamesDemo() {
  const [selected, setSelected] = useState([relativeDate(2), relativeDate(4)]);

  return (
    <div className="docs-demo__calendar-stack">
      <div className="docs-demo__calendar-frame">
        <Calendar
          range
          selected={selected}
          reserved={styledReservations}
          classNames={sunriseClassNames}
          onChange={setSelected}
          options={{ weekStartsOn: 1 }}
        />
      </div>

      <div className="docs-demo__meta">
        <div>
          <span className="docs-demo__label">Theme</span>
          <strong>Custom classes on top of default `calendar__*` hooks</strong>
        </div>
        <div>
          <span className="docs-demo__label">Selection</span>
          <strong>{formatSelection(selected)}</strong>
        </div>
      </div>
    </div>
  );
}

export function ClassNamesExample() {
  return (
    <ExampleBlock
      title="Styling with classNames"
      description="Layer your own classes onto the internal parts without replacing components."
      code={classNamesCode}
    >
      <ClassNamesDemo />
    </ExampleBlock>
  );
}

import React, { useState } from "react";
import { Calendar } from "@demark-pro/react-booking-calendar";
import { ExampleBlock } from "./ExampleBlock";
import { dateTimeBookingCode } from "./example-snippets";
import {
  formatDateTime,
  formatSelectionWithTime,
  timedReservations,
} from "./demo-data";

const initialSelection = [
  timedReservations[0].endDate,
  timedReservations[1].startDate,
];

function DateTimeBookingDemo() {
  const [selected, setSelected] = useState(initialSelection);

  return (
    <div className="docs-demo__calendar-stack">
      <div className="docs-demo__calendar-frame">
        <Calendar
          range
          selected={selected}
          reserved={timedReservations}
          onChange={setSelected}
          options={{ weekStartsOn: 1 }}
        />
      </div>

      <div className="docs-demo__meta">
        <div>
          <span className="docs-demo__label">Selected stay</span>
          <strong>{formatSelectionWithTime(selected)}</strong>
        </div>
        <div>
          <span className="docs-demo__label">Available gap</span>
          <strong>
            {formatDateTime(timedReservations[0].endDate)} ->{" "}
            {formatDateTime(timedReservations[1].startDate)}
          </strong>
        </div>
      </div>

      <div className="docs-demo__time-list">
        {timedReservations.map((item, index) => (
          <div key={index} className="docs-demo__time-card">
            <span className="docs-demo__label">Reservation {index + 1}</span>
            <strong>{formatDateTime(item.startDate)}</strong>
            <span>to</span>
            <strong>{formatDateTime(item.endDate)}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DateTimeBookingExample() {
  return (
    <ExampleBlock
      title="Date and time booking values"
      description="`reserved` and `selected` accept full `Date` values, so the calendar can preserve check-in and check-out times."
      code={dateTimeBookingCode}
    >
      <DateTimeBookingDemo />
    </ExampleBlock>
  );
}

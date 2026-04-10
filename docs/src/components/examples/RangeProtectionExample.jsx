import React, { useState } from "react";
import { Calendar } from "@demark-pro/react-booking-calendar";
import { ExampleBlock } from "./ExampleBlock";
import { rangeProtectionCode } from "./example-snippets";
import {
  formatSelection,
  overbookLabels,
  rangeReservations,
} from "./demo-data";

function RangeProtectionDemo() {
  const [selected, setSelected] = useState([null, null]);
  const [message, setMessage] = useState(null);

  return (
    <div className="docs-demo__calendar-stack">
      <div className="docs-demo__calendar-frame">
        <Calendar
          range
          selected={selected}
          reserved={rangeReservations}
          onChange={(nextValue) => {
            setSelected(nextValue);
            setMessage(null);
          }}
          onOverbook={(_date, overbookType) => {
            setMessage(overbookLabels[overbookType] ?? overbookType);
          }}
          options={{ weekStartsOn: 1 }}
        />
      </div>

      <div className="docs-demo__meta">
        <div>
          <span className="docs-demo__label">Selected stay</span>
          <strong>{formatSelection(selected)}</strong>
        </div>
        <div>
          <span className="docs-demo__label">Guard rails</span>
          <strong>{message ?? "Try clicking a reserved or invalid date"}</strong>
        </div>
      </div>

      <button
        type="button"
        className="docs-demo__button"
        onClick={() => {
          setSelected([null, null]);
          setMessage(null);
        }}
      >
        Reset selection
      </button>
    </div>
  );
}

export function RangeProtectionExample() {
  return (
    <ExampleBlock
      title="Range selection with protection"
      description="The range flow waits for two valid dates and reports why blocked clicks were rejected."
      code={rangeProtectionCode}
    >
      <RangeProtectionDemo />
    </ExampleBlock>
  );
}

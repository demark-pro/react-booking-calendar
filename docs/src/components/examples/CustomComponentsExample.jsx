import React, { useState } from "react";
import clsx from "clsx";
import { Calendar } from "@demark-pro/react-booking-calendar";
import { ExampleBlock } from "./ExampleBlock";
import { customComponentsCode } from "./example-snippets";
import {
  formatSelection,
  relativeDate,
  styledReservations,
} from "./demo-data";

function DemoMonthContent({
  month,
  year,
  options,
  innerProps,
  getClassNames,
}) {
  const { className = "", ...restInnerProps } = innerProps ?? {};

  return (
    <div
      className={clsx(
        getClassNames("MonthContent", className),
        "docs-demo__month-pill"
      )}
      {...restInnerProps}
    >
      <span>
        {new Date(year, month).toLocaleDateString(options?.locale, {
          month: "short",
          calendar: "gregory",
        })}
      </span>
      <strong>
        {new Intl.NumberFormat(options?.locale, {
          useGrouping: false,
        }).format(year)}
      </strong>
    </div>
  );
}

function DemoDaySelection({ state, innerProps, getClassNames }) {
  const { className = "", ...restInnerProps } = innerProps ?? {};

  if (!state.isSelected && !state.isSelectedStart && !state.isSelectedEnd) {
    return null;
  }

  let label = "Stay";
  if (state.isSelectedStart) label = "Start";
  if (state.isSelectedEnd) label = "End";

  return (
    <div
      className={clsx(
        getClassNames("DaySelection", className),
        "docs-demo__selection-pill"
      )}
      {...restInnerProps}
    >
      {label}
    </div>
  );
}

function CustomComponentsDemo() {
  const [selected, setSelected] = useState([relativeDate(1), relativeDate(4)]);

  return (
    <div className="docs-demo__calendar-stack">
      <div className="docs-demo__calendar-frame">
        <Calendar
          range
          selected={selected}
          reserved={styledReservations}
          onChange={setSelected}
          options={{ weekStartsOn: 1 }}
          components={{
            MonthContent: DemoMonthContent,
            DaySelection: DemoDaySelection,
          }}
        />
      </div>

      <div className="docs-demo__meta">
        <div>
          <span className="docs-demo__label">Overrides</span>
          <strong>MonthContent + DaySelection</strong>
        </div>
        <div>
          <span className="docs-demo__label">Selection</span>
          <strong>{formatSelection(selected)}</strong>
        </div>
      </div>
    </div>
  );
}

export function CustomComponentsExample() {
  return (
    <ExampleBlock
      title="Custom component overrides"
      description="Swap only the internal pieces you need while keeping the booking logic and state model intact."
      code={customComponentsCode}
    >
      <CustomComponentsDemo />
    </ExampleBlock>
  );
}

export const basicCalendarCode = String.raw`import { useState } from "react";
import { Calendar } from "@demark-pro/react-booking-calendar";
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";

const reserved = [
  {
    startDate: new Date(2030, 4, 12, 14, 0),
    endDate: new Date(2030, 4, 14, 10, 0),
  },
  {
    startDate: new Date(2030, 4, 18, 14, 0),
    endDate: new Date(2030, 4, 20, 10, 0),
  },
];

export function BookingCalendar() {
  const [selected, setSelected] = useState([null, null]);

  return (
    <Calendar
      selected={selected}
      reserved={reserved}
      onChange={setSelected}
      options={{ weekStartsOn: 1 }}
    />
  );
}`;

export const rangeProtectionCode = String.raw`import { useState } from "react";
import { Calendar } from "@demark-pro/react-booking-calendar";

export function RangeCalendar() {
  const [selected, setSelected] = useState([null, null]);
  const [message, setMessage] = useState(null);

  return (
    <Calendar
      range
      selected={selected}
      reserved={reserved}
      onChange={(nextValue) => {
        setSelected(nextValue);
        setMessage(null);
      }}
      onOverbook={(_date, overbookType) => {
        setMessage(overbookType);
      }}
    />
  );
}`;

export const scrollableCalendarCode = String.raw`import { useState } from "react";
import { ScrollableCalendar } from "@demark-pro/react-booking-calendar";

export function AvailabilityTimeline() {
  const [selected, setSelected] = useState([null, null]);

  return (
    <div style={{ height: 360 }}>
      <ScrollableCalendar
        startMonth={new Date()}
        monthsCount={6}
        colHeight={56}
        initialScroll={new Date(Date.now() + 1000 * 60 * 60 * 24 * 28)}
        selected={selected}
        reserved={reserved}
        onChange={setSelected}
      />
    </div>
  );
}`;

export const classNamesCode = String.raw`const classNames = {
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

<Calendar
  range
  selected={selected}
  reserved={reserved}
  classNames={classNames}
  onChange={setSelected}
/>;
`;

export const customComponentsCode = String.raw`import {
  Calendar,
  DaySelectionProps,
  MonthContentProps,
} from "@demark-pro/react-booking-calendar";

const MonthContent = ({
  month,
  year,
  options,
  innerProps,
  getClassNames,
}: MonthContentProps) => {
  const { className = "", ...restInnerProps } = innerProps ?? {};

  return (
    <div
      className={getClassNames("MonthContent", className)}
      {...restInnerProps}
    >
      {new Date(year, month).toLocaleDateString(options?.locale, {
        month: "short",
      })}
      <strong>{year}</strong>
    </div>
  );
};

const DaySelection = ({
  state,
  innerProps,
  getClassNames,
}: DaySelectionProps) => {
  const { className = "", ...restInnerProps } = innerProps ?? {};

  if (!state.isSelected && !state.isSelectedStart && !state.isSelectedEnd) {
    return null;
  }

  return (
    <div
      className={getClassNames("DaySelection", className)}
      {...restInnerProps}
    >
      {state.isSelectedStart ? "Start" : state.isSelectedEnd ? "End" : "Stay"}
    </div>
  );
};

<Calendar
  range
  selected={selected}
  reserved={reserved}
  onChange={setSelected}
  components={{
    MonthContent,
    DaySelection,
  }}
/>;
`;

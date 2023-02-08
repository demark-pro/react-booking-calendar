/// <reference lib="es2017.object" />

import BookingCalendar from "@demark-pro/react-booking-calendar";
import { parse, format, addDays } from "date-fns";
import { useState } from "react";
import "./styles.css";

export type BookingCalendarProps = {
  selectedStart: Date | number | null;
  selectedEnd: Date | number | null;
  isStart?: boolean;
  dateOfStartMonth?: Date | number;
  numOfMonths?: number;
  overscanWeekCount?: number;
  colHeight?: number;
  reserved?: Array<Reserved>;
  disabled?: boolean;
  scrollToDate?: Date | number | null;
  rangeMode?: boolean;
  onOverbook?: (e: Date, errorType: string) => void;
  onChange?: (e: Date) => void;
  onChangeRange?: (e: [Date | number, Date | number]) => void;
  className?: string;
};

interface Reserved {
  startDate: Date | number;
  endDate: Date | number;
}

const dateFormat = "yyyy-MM-dd";
const reserved: Reserved[] = [
  { startDate: addDays(new Date(), 7), endDate: addDays(new Date(), 17) },
  { startDate: addDays(new Date(), 35), endDate: addDays(new Date(), 48) },
];

function Example() {
  const [calendarProps, setCalendarProps] = useState<BookingCalendarProps>({
    selectedStart: null,
    selectedEnd: null,
    isStart: true,
    dateOfStartMonth: new Date(),
    numOfMonths: 12,
    scrollToDate: null,
    rangeMode: true,
    disabled: false,
  });

  const [titles, setTitles] = useState({
    dayFooterStart: "check-in",
    dayFooterEnd: "exit",
    reservedFooter: "booked",
  });

  const changeProps = (key: string, value: any) => {
    setCalendarProps({ ...calendarProps, [key]: value });
  };

  const changeTitles = (key: string, value: any) => {
    setTitles({ ...titles, [key]: value });
  };

  const handleChange = (e: Date | number) => {
    const isStart = calendarProps.isStart;
    setCalendarProps({
      ...calendarProps,
      [isStart ? "selectedStart" : "selectedEnd"]: e,
    });
  };

  const handleChangeRange = (e: (Date | number)[]) => {
    setCalendarProps({
      ...calendarProps,
      selectedStart: e[0],
      selectedEnd: e[1],
    });
  };

  return (
    <div className="App">
      <h1>React booking calendar</h1>
      <div className="row-main">
        <div className="col">
          <h3>Options</h3>

          <div className="options">
            <div className="row">
              <span>selectedStart</span>
              <span>
                <input
                  type="date"
                  value={
                    calendarProps.selectedStart
                      ? format(calendarProps.selectedStart, dateFormat)
                      : ""
                  }
                  onChange={(e) =>
                    changeProps(
                      "selectedStart",
                      parse(e.target.value, dateFormat, new Date())
                    )
                  }
                />
              </span>
            </div>
            <div className="row">
              <span>selectedEnd</span>
              <span>
                <input
                  type="date"
                  value={
                    calendarProps.selectedEnd
                      ? format(calendarProps.selectedEnd, dateFormat)
                      : ""
                  }
                  onChange={(e) =>
                    changeProps(
                      "selectedEnd",
                      parse(e.target.value, dateFormat, new Date())
                    )
                  }
                />
              </span>
            </div>

            <div className="row">
              <span>isStart</span>
              <span>
                <input
                  type="checkbox"
                  checked={calendarProps.isStart}
                  onChange={() =>
                    changeProps("isStart", !calendarProps.isStart)
                  }
                  disabled={calendarProps.rangeMode}
                />
              </span>
            </div>

            <div className="row">
              <span>scrollToDate</span>
              <span>
                <input
                  type="date"
                  value={
                    calendarProps.scrollToDate
                      ? format(calendarProps.scrollToDate, dateFormat)
                      : ""
                  }
                  onChange={(e) =>
                    changeProps(
                      "scrollToDate",
                      parse(e.target.value, dateFormat, new Date())
                    )
                  }
                />
              </span>
            </div>

            <div className="row">
              <span>dateOfStartMonth</span>
              <span>
                <input
                  type="date"
                  value={
                    calendarProps.dateOfStartMonth
                      ? format(calendarProps.dateOfStartMonth, dateFormat)
                      : ""
                  }
                  onChange={(e) =>
                    changeProps(
                      "dateOfStartMonth",
                      parse(e.target.value, dateFormat, new Date())
                    )
                  }
                />
              </span>
            </div>

            <div className="row">
              <span>numOfMonths</span>
              <span>
                <input
                  type="number"
                  value={calendarProps.numOfMonths}
                  onChange={(e) =>
                    changeProps(
                      "numOfMonths",
                      +e.target.value > 500 ? 500 : +e.target.value
                    )
                  }
                />
              </span>
            </div>

            <div className="row">
              <span>rangeMode</span>
              <span>
                <input
                  type="checkbox"
                  checked={calendarProps.rangeMode}
                  onChange={() =>
                    changeProps("rangeMode", !calendarProps.rangeMode)
                  }
                />
              </span>
            </div>

            <div className="row">
              <span>disabled</span>
              <span>
                <input
                  type="checkbox"
                  checked={calendarProps.disabled}
                  onChange={() =>
                    changeProps("disabled", !calendarProps.disabled)
                  }
                />
              </span>
            </div>

            <div className="row">
              <span>titles</span>
              <span>
                {Object.entries(titles).map(([key, val]) => (
                  <label key={key}>
                    {key}:
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => changeTitles(key, e.target.value)}
                    />
                  </label>
                ))}
              </span>
            </div>
          </div>
        </div>
        <div className="col" style={{ maxWidth: 380 }}>
          <h3>Result</h3>

          <div className="calendar">
            <BookingCalendar
              reserved={reserved}
              onChange={handleChange}
              onChangeRange={handleChangeRange}
              onOverbook={(day, errorType) => alert(errorType)}
              titles={titles}
              {...calendarProps}
            />
          </div>
          <button
            onClick={() =>
              setCalendarProps({
                ...calendarProps,
                selectedStart: null,
                selectedEnd: null,
              })
            }
            style={{ marginTop: 15 }}
          >
            reset selections
          </button>
        </div>
      </div>
    </div>
  );
}

export default Example;

import { ReactNode } from "react";
import { DayContent } from "../src/components/DayContent";
import { DayReservation } from "../src/components/DayReservation";
import { DaySelection } from "../src/components/DaySelection";
import { DayToday } from "../src/components/DayToday";
import { MonthArrowBack } from "../src/components/MonthArrowBack";
import { MonthArrowNext } from "../src/components/MonthArrowNext";
import { MonthContent } from "../src/components/MonthContent";
import { WeekContent } from "../src/components/WeekContent";
import {
  CalendarContainer,
  DayContainer,
  DaysContainer,
  MonthContainer,
  WeekContainer,
} from "../src/components/containers";
import { cn } from "../src/helpers";
import { CalendarDayState, CommonProps } from "../src/types";

const getClassNames: CommonProps["getClassNames"] = (name, classes) =>
  ["base", name, classes].filter(Boolean).join(" ");

const commonProps: CommonProps = {
  selected: [null, null],
  reserved: [],
  disabled: false,
  protection: true,
  range: false,
  isStart: true,
  options: {},
  getClassNames,
};

const dayState: CalendarDayState = {
  isSelected: true,
  isReserved: true,
  isToday: true,
};

describe("custom class merging", () => {
  it("ignores non-string values when composing class names", () => {
    expect(cn("base", false, undefined, null, "custom")).toBe("base custom");
    expect(cn("base", (() => "bad") as unknown as string, "custom")).toBe(
      "base custom"
    );
  });

  it.each([
    [
      "CalendarContainer",
      () =>
        CalendarContainer({
          ...commonProps,
          innerProps: { className: "custom-class" },
          children: null,
        }),
    ],
    [
      "MonthContainer",
      () =>
        MonthContainer({
          ...commonProps,
          innerProps: { className: "custom-class" },
          children: null,
        }),
    ],
    [
      "WeekContainer",
      () =>
        WeekContainer({
          ...commonProps,
          innerProps: { className: "custom-class" },
          children: null,
        }),
    ],
    [
      "DaysContainer",
      () =>
        DaysContainer({
          ...commonProps,
          innerProps: { className: "custom-class" },
          children: null,
        }),
    ],
    [
      "DayContainer",
      () =>
        DayContainer({
          ...commonProps,
          date: new Date(2030, 3, 10),
          state: dayState,
          innerProps: {
            className: "custom-class",
            onClick: jest.fn(),
          },
          children: null,
        }),
    ],
    [
      "MonthArrowBack",
      () =>
        MonthArrowBack({
          ...commonProps,
          innerProps: { className: "custom-class", onClick: jest.fn() },
        }),
    ],
    [
      "MonthArrowNext",
      () =>
        MonthArrowNext({
          ...commonProps,
          innerProps: { className: "custom-class", onClick: jest.fn() },
        }),
    ],
    [
      "MonthContent",
      () =>
        MonthContent({
          ...commonProps,
          month: 3,
          year: 2030,
          innerProps: { className: "custom-class" },
        }),
    ],
    [
      "WeekContent",
      () =>
        WeekContent({
          ...commonProps,
          day: 2,
          innerProps: { className: "custom-class" },
        }),
    ],
    [
      "DayContent",
      () =>
        DayContent({
          ...commonProps,
          date: new Date(2030, 3, 10),
          state: dayState,
          innerProps: { className: "custom-class" },
          children: "10" as ReactNode,
        }),
    ],
    [
      "DaySelection",
      () =>
        DaySelection({
          ...commonProps,
          date: new Date(2030, 3, 10),
          state: dayState,
          innerProps: { className: "custom-class" },
        }),
    ],
    [
      "DayReservation",
      () =>
        DayReservation({
          ...commonProps,
          date: new Date(2030, 3, 10),
          state: dayState,
          innerProps: { className: "custom-class" },
        }),
    ],
    [
      "DayToday",
      () =>
        DayToday({
          ...commonProps,
          date: new Date(2030, 3, 10),
          state: dayState,
          innerProps: { className: "custom-class" },
        }),
    ],
  ])("%s preserves generated and custom classes", (_name, renderComponent) => {
    const element = renderComponent() as { props: { className: string } };

    expect(element.props.className).toContain("base");
    expect(element.props.className).toContain("custom-class");
  });
});

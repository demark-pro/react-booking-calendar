jest.mock("react", () => {
  const actual = jest.requireActual("react");

  return {
    ...actual,
    useEffect: jest.fn(),
    useState: jest.fn(),
  };
});

jest.mock("react-virtualized-auto-sizer", () => ({
  __esModule: true,
  default: ({ children }: { children: (size: { height: number; width: number }) => unknown }) =>
    children({ height: 320, width: 350 }),
}));

jest.mock("react-window", () => ({
  FixedSizeGrid: ({
    columnCount,
    rowCount,
    itemData,
    children,
  }: {
    columnCount: number;
    rowCount: number;
    itemData: unknown;
    children: { type?: (props: unknown) => unknown } | ((props: unknown) => unknown);
  }) => {
    const Cell = "type" in children ? children.type : children;
    const cells = [];

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
        cells.push(
          Cell({
            columnIndex,
            rowIndex,
            style: {},
            data: itemData,
          })
        );
      }
    }

    return cells;
  },
  areEqual: () => false,
}));

import * as React from "react";
import { Calendar } from "../src/calendar";
import { ScrollableCalendar } from "../src/scrollable-calendar";
import { DayContainer } from "../src/components/containers";
import { MonthArrowBack } from "../src/components/MonthArrowBack";
import { MonthArrowNext } from "../src/components/MonthArrowNext";
import { MonthContent } from "../src/components/MonthContent";
import { CalendarDayState, CommonProps } from "../src/types";

const mockedUseState = React.useState as jest.Mock;

const getClassNames: CommonProps["getClassNames"] = (name, classes) =>
  [name, classes].filter(Boolean).join(" ");

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

const emptyDayState: CalendarDayState = {};

const formatGregorianDate = (
  date: Date,
  locale: Intl.LocalesArgument,
  format: Intl.DateTimeFormatOptions
) => date.toLocaleDateString(locale, { ...format, calendar: "gregory" });

const formatLocaleNumber = (value: number, locale: Intl.LocalesArgument) =>
  new Intl.NumberFormat(locale, { useGrouping: false }).format(value);

const getCalendarDayContent = (element: any, date: Date) => {
  const rootChildren = React.Children.toArray(element.props.children);
  const daysContainer = rootChildren[2] as any;
  const dayElements = React.Children.toArray(daysContainer.props.children) as any[];
  const dayElement = dayElements.find(
    (child) =>
      child.props.date.getFullYear() === date.getFullYear() &&
      child.props.date.getMonth() === date.getMonth() &&
      child.props.date.getDate() === date.getDate()
  );
  const dayChildren = React.Children.toArray(dayElement.props.children) as any[];

  return dayChildren[0].props.children;
};

const getScrollableDayContent = (element: any, date: Date) => {
  const rootChildren = React.Children.toArray(element.props.children);
  const daysContainer = rootChildren[1] as any;
  const autoSizer = React.Children.only(daysContainer.props.children) as any;
  const gridElement = autoSizer.type(autoSizer.props) as any;
  const fixedSizeGrid = gridElement.type(gridElement.props) as any;
  const cells = fixedSizeGrid.type(fixedSizeGrid.props) as any[];
  const dayElement = cells.find(
    (child) =>
      child?.props?.date &&
      child.props.date.getFullYear() === date.getFullYear() &&
      child.props.date.getMonth() === date.getMonth() &&
      child.props.date.getDate() === date.getDate()
  );
  const dayChildren = React.Children.toArray(
    (React.Children.only(dayElement.props.children) as any).props.children
  ) as any[];

  return dayChildren[0].props.children;
};

const renderCalendar = (
  props: Record<string, unknown>,
  monthState: [number, jest.Mock] = [3, jest.fn()],
  yearState: [number, jest.Mock] = [2030, jest.fn()]
) => {
  mockedUseState.mockReset();
  mockedUseState
    .mockImplementationOnce(() => monthState)
    .mockImplementationOnce(() => yearState);

  return Calendar(props as any);
};

describe("localization", () => {
  it("keeps built-in month labels on the Gregorian calendar and localizes the year digits", () => {
    const locale = "fa-IR";
    const element = MonthContent({
      ...commonProps,
      options: { locale },
      month: 3,
      year: 2030,
      innerProps: {},
    }) as any;

    const children = React.Children.toArray(element.props.children) as any[];

    expect(children[0].props.children).toBe(
      formatGregorianDate(new Date(2030, 3, 1), locale, { month: "long" })
    );
    expect(children[1].props.children).toBe(formatLocaleNumber(2030, locale));
  });

  it("localizes day container aria labels without switching away from the Gregorian calendar", () => {
    const locale = "fa-IR";
    const date = new Date(2030, 3, 1);
    const element = DayContainer({
      ...commonProps,
      options: { locale },
      date,
      state: emptyDayState,
      innerProps: { onClick: jest.fn() },
      children: null,
    }) as any;

    expect(element.props["aria-label"]).toBe(
      formatGregorianDate(date, locale, {})
    );
  });

  it("uses localized target month labels for the default navigation buttons", () => {
    const locale = "ar-EG";
    const backButton = MonthArrowBack({
      ...commonProps,
      options: { locale },
      month: 3,
      year: 2030,
      innerProps: { onClick: jest.fn() },
    }) as any;
    const nextButton = MonthArrowNext({
      ...commonProps,
      options: { locale },
      month: 3,
      year: 2030,
      innerProps: { onClick: jest.fn() },
    }) as any;

    expect(backButton.props["aria-label"]).toBe(
      formatGregorianDate(new Date(2030, 2, 1), locale, {
        month: "long",
        year: "numeric",
      })
    );
    expect(nextButton.props["aria-label"]).toBe(
      formatGregorianDate(new Date(2030, 4, 1), locale, {
        month: "long",
        year: "numeric",
      })
    );
  });

  it("renders localized day numbers in Calendar", () => {
    const locale = "ar-EG";
    const element = renderCalendar({ options: { locale } });

    expect(getCalendarDayContent(element, new Date(2030, 3, 1))).toBe(
      formatLocaleNumber(1, locale)
    );
  });

  it("renders localized day numbers in ScrollableCalendar", () => {
    const locale = "ar-EG";
    const element = ScrollableCalendar({
      options: { locale },
      startMonth: new Date(2030, 3, 1),
      monthsCount: 1,
    } as any);

    expect(getScrollableDayContent(element, new Date(2030, 3, 1))).toBe(
      formatLocaleNumber(1, locale)
    );
  });
});

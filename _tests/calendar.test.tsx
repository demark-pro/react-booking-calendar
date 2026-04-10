jest.mock("react", () => {
  const actual = jest.requireActual("react");

  return {
    ...actual,
    useEffect: jest.fn(),
    useState: jest.fn(),
  };
});

import * as React from "react";
import { Calendar } from "../src/calendar";

const mockedUseState = React.useState as jest.Mock;

const getMonthElements = (element: any) => {
  const rootChildren = React.Children.toArray(element.props.children);
  const monthContainer = rootChildren[0] as any;

  return React.Children.toArray(monthContainer.props.children) as any[];
};

const renderCalendar = (
  props: Record<string, unknown>,
  monthState: [number, jest.Mock] = [11, jest.fn()],
  yearState: [number, jest.Mock] = [2030, jest.fn()]
) => {
  mockedUseState.mockReset();
  mockedUseState
    .mockImplementationOnce(() => monthState)
    .mockImplementationOnce(() => yearState);

  return {
    element: Calendar(props as any),
    setActiveMonth: monthState[1],
    setActiveYear: yearState[1],
  };
};

describe("Calendar month navigation", () => {
  it("notifies about a year rollover even when onMonthChange is omitted", () => {
    const onYearChange = jest.fn();
    const { element } = renderCalendar({ year: 2030, onYearChange });

    const monthArrowNext = getMonthElements(element)[2];
    monthArrowNext.props.innerProps.onClick();

    expect(onYearChange).toHaveBeenCalledWith(2031);
  });

  it("does not render an impossible month and year combination in partial controlled mode", () => {
    const firstRender = renderCalendar({ year: 2030 });
    const monthArrowNext = getMonthElements(firstRender.element)[2];

    monthArrowNext.props.innerProps.onClick();

    expect(firstRender.setActiveMonth).toHaveBeenCalledWith(0);
    expect(firstRender.setActiveYear).toHaveBeenCalledWith(2031);

    const secondRender = renderCalendar(
      { year: 2030 },
      [0, firstRender.setActiveMonth],
      [2031, firstRender.setActiveYear]
    );

    const monthContent = getMonthElements(secondRender.element)[1];

    expect([monthContent.props.month, monthContent.props.year]).not.toEqual([
      0,
      2030,
    ]);
  });
});

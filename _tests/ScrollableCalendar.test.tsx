import React from "react";
import { render } from "@testing-library/react";
import { ScrollableCalendar } from "index";

describe("ScrollableCalendar", () => {
  test("renders the ScrollableCalendar component", () => {
    render(<ScrollableCalendar selected={[new Date(), null]} />);
  });
});

test("snapshot - ScrollableCalendar", () => {
  const { container } = render(<ScrollableCalendar selected={[]} />);
  expect(container).toMatchSnapshot();
});

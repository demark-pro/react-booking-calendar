import React from "react";
import { render } from "@testing-library/react";
import { InfiniteCalendar } from "..";

describe("InfiniteCalendar", () => {
  test("renders the InfiniteCalendar component", () => {
    render(<InfiniteCalendar selected={[new Date(), null]} />);
  });
});

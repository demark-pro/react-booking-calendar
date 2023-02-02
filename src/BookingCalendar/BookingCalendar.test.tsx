import React from "react";
import { render } from "@testing-library/react";

import BookingCalendar from "./BookingCalendar";

describe("BookingCalendar", () => {
  test("renders the BookingCalendar component", () => {
    render(<BookingCalendar selectedStart={new Date()} selectedEnd={null} />);
  });
});

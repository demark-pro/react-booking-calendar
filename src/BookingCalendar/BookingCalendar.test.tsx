import React from "react";
import { render } from "@testing-library/react";

import BookingCalendar from "./BookingCalendar";

jest.mock('./BookingCalendar.module.css', () => '')
describe("BookingCalendar", () => {
  test("renders the BookingCalendar component", () => {
    render(<BookingCalendar selectedStart={new Date()} selectedEnd={null} />);
  });
});

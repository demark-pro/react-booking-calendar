import React from "react";
import { render } from "@testing-library/react";

import InfiniteCalendar from "../InfiniteCalendar";

jest.mock("./InfiniteCalendar.module.css", () => "");
describe("InfiniteCalendar", () => {
  test("renders the InfiniteCalendar component", () => {
    render(<InfiniteCalendar selected={[new Date(), null]} />);
  });
});

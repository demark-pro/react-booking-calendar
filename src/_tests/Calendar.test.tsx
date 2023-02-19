import React from "react";
import { render } from "@testing-library/react";
import { Calendar } from "..";

describe("Calendar", () => {
  test("renders the Calendar component", () => {
    render(<Calendar selected={[new Date(), null]} />);
  });
});

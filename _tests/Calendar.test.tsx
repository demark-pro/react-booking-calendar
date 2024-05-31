import React from "react";
import { render } from "@testing-library/react";
import { Calendar } from "index";

describe("Calendar", () => {
  test("renders the Calendar component", () => {
    render(<Calendar selected={[new Date(), null]} />);
  });
});

test("snapshot - Calendar", () => {
  const { container } = render(<Calendar selected={[]} />);
  expect(container).toMatchSnapshot();
});

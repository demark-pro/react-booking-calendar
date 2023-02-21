import React from "react";
import { render } from "@testing-library/react";
import { Calendar } from "../index";
import { createSerializer } from "@emotion/jest";

expect.addSnapshotSerializer(createSerializer());

describe("Calendar", () => {
  test("renders the Calendar component", () => {
    render(<Calendar selected={[new Date(), null]} />);
  });
});

test("snapshot - Calendar", () => {
  const { container } = render(
    <Calendar selected={[]} classNamePrefix="calendar" />
  );
  expect(container).toMatchSnapshot();
});

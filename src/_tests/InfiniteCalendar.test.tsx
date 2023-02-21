import React from "react";
import { render } from "@testing-library/react";
import { InfiniteCalendar } from "../index";
import { createSerializer } from "@emotion/jest";

expect.addSnapshotSerializer(createSerializer());

describe("InfiniteCalendar", () => {
  test("renders the InfiniteCalendar component", () => {
    render(<InfiniteCalendar selected={[new Date(), null]} />);
  });
});

test("snapshot - InfiniteCalendar", () => {
  const { container } = render(
    <InfiniteCalendar selected={[]} classNamePrefix="infinite-calendar" />
  );
  expect(container).toMatchSnapshot();
});

import { getDayState } from "../src/helpers";
import { CalendarReserved, CommonProps } from "../src/types";
import { getProtectedInterval } from "../src/utils/get-protected-interval";

const createCommonProps = (
  reserved: CalendarReserved[],
  selected: CommonProps["selected"] = [null, null]
): CommonProps => ({
  selected,
  reserved,
  disabled: false,
  protection: true,
  range: false,
  isStart: true,
  options: {},
  getClassNames: () => "",
});

describe("getProtectedInterval", () => {
  it("blocks selecting an occupied day even when another reservation does not overlap", () => {
    const date = new Date(2030, 3, 15);
    const reserved: CalendarReserved[] = [
      {
        startDate: new Date(2030, 3, 15, 0, 0, 0),
        endDate: new Date(2030, 3, 16, 0, 0, 0),
      },
      {
        startDate: new Date(2030, 3, 20, 0, 0, 0),
        endDate: new Date(2030, 3, 21, 0, 0, 0),
      },
    ];

    const state = getDayState({
      day: {
        date,
        monthStartDate: new Date(2030, 3, 1),
      },
      reserved,
    });

    const result = getProtectedInterval(date, state, createCommonProps(reserved));

    expect(state.isReserved).toBe(true);
    expect(result).toEqual({
      overbookType: "BOOKED",
      interval: null,
    });
  });
});

import { getDayState } from "../src/helpers";

describe("getDayState", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it("uses the computed day state inside disabled callbacks", () => {
    const state = getDayState({
      day: {
        date: new Date(2030, 3, 10),
        monthStartDate: new Date(2030, 3, 1),
      },
      disabled: (_date, currentState) => !currentState.isSameMonth,
    });

    expect(state.isSameMonth).toBe(true);
    expect(state.isDisabled).toBe(false);
  });

  it("does not mark today as past after midnight", () => {
    jest.useFakeTimers().setSystemTime(new Date(2030, 3, 10, 14, 0, 0));

    const state = getDayState({
      day: {
        date: new Date(2030, 3, 10),
        monthStartDate: new Date(2030, 3, 1),
      },
    });

    expect(state.isToday).toBe(true);
    expect(state.isPast).toBe(false);
  });
});

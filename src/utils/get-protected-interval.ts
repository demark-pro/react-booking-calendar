import {
  CalendarDayState,
  CalendarSelected,
  CommonProps,
  OverbookTypes,
} from "types";
import { getProtectedTime } from "./get-protected-time";
import {
  isBefore,
  isBetweenInterval,
  isSameDay,
  startOfDay,
} from "./date.utils";

export type GetProtectedIntervalReturn = {
  interval: CalendarSelected[] | null;
  overbookType: OverbookTypes | null;
};

export function getProtectedInterval(
  date: Date,
  state: CalendarDayState,
  commonProps: CommonProps
): GetProtectedIntervalReturn {
  const { selected, reserved, range } = commonProps;

  const validate = validateBooking(date, state, commonProps);
  if (validate) return validate;

  const [startDate, endDate] = selected;
  const isStart = range ? !startDate : commonProps.isStart;
  const freeTime = getProtectedTime(date, reserved);

  const newStart = isStart
    ? isSameDay(date, new Date())
      ? new Date()
      : freeTime.startDate
    : startDate;
  const newEnd = !isStart ? freeTime.endDate : endDate;

  const interval = [newStart || null, newEnd || null];

  return { overbookType: null, interval };
}

const validateBooking = (
  date: Date,
  state: CalendarDayState,
  commonProps: CommonProps
): GetProtectedIntervalReturn | null => {
  const { selected, reserved, range } = commonProps;
  const [startDate, endDate] = selected;
  const isStart = range ? !startDate : commonProps.isStart;

  const interval = [getProtectedTime(date, reserved).startDate];

  // if "PAST"
  if (state.isPast) return { overbookType: "PAST", interval: null };

  // if reserved between
  if (state.isReserved) return { overbookType: "BOOKED", interval: null };

  // if selected length 0 or 2 then set selected date
  if (range && ((!startDate && !endDate) || (startDate && endDate))) {
    return { overbookType: null, interval };
  }

  if (isStart) {
    // if selected start date after end date
    if (endDate && isBefore(endDate, date)) {
      return {
        overbookType: "AFTER_END",
        interval: range ? interval : null,
      };
    }
  } else {
    // if selected end date before start date
    if (startDate && isBefore(date, startDate)) {
      return {
        overbookType: "BEFORE_START",
        interval: range ? interval : null,
      };
    }
  }

  const isReservedBetween =
    startDate &&
    reserved.find((r) =>
      isBetweenInterval(r.startDate, r.endDate, startDate, startOfDay(date))
    );
  // if booked beetwen start date and current date
  if (isReservedBetween) {
    return {
      overbookType: "BOOKED_BETWEEN",
      interval: range || isStart ? interval : null,
    };
  }

  return null;
};

import isBefore from "date-fns/isBefore";
import startOfDay from "date-fns/startOfDay";
import { isBetweenInterval } from "../helpers";
import { DayState, Reserved, Selected, VarinatType } from "../types";
import { getTimeOfSelected } from "./getTimeOfSelected";

export const PAST = "PAST";
export const BOOKED = "BOOKED";
export const BEFORE_START = "BEFORE_START";
export const AFTER_END = "AFTER_END";
export const BOOKED_BETWEEN = "BOOKED_BETWEEN";

export interface CheckOberbookingProps {
  date: Date;
  selected: Array<Date | number | null>;
  reserved: Reserved[];
  isStart: boolean;
  state: DayState;
  range: boolean;
  variant: VarinatType;
}

type CheckOberbookingType = {
  errorType: string | null;
  newSelected: Selected[] | null;
};

export function checkOberbooking(
  props: CheckOberbookingProps
): CheckOberbookingType {
  const { date, selected, reserved, state, range, variant } = props;
  const [startDate, endDate] = selected;

  console.log(state)

  const isStart = range ? !startDate : props.isStart;

  if (state.isDisabled) return { errorType: "DISABLED", newSelected: null };

  if (variant !== "events") {
    if (state.isPast) {
      return { errorType: PAST, newSelected: null };
    }

    if (state.isReserved) {
      return { errorType: BOOKED, newSelected: null };
    }

    if (range) {
      if ((!startDate && !endDate) || (startDate && endDate)) {
        return {
          errorType: null,
          newSelected: [getTimeOfSelected(date, reserved, startDate)],
        };
      }
    }

    if (!isStart && startDate && isBefore(date, startDate)) {
      return {
        errorType: BEFORE_START,
        newSelected: range
          ? [getTimeOfSelected(date, reserved, startDate)]
          : null,
      };
    }

    if (isStart && endDate && isBefore(endDate, date)) {
      return {
        errorType: AFTER_END,
        newSelected: range
          ? [getTimeOfSelected(date, reserved, startDate)]
          : null,
      };
    }

    const isReservedBetween =
      startDate &&
      !!reserved.find((r) =>
        isBetweenInterval(r.startDate, r.endDate, startDate, startOfDay(date))
      );
    if (isReservedBetween) {
      return {
        errorType: BOOKED_BETWEEN,
        newSelected: range
          ? [getTimeOfSelected(date, reserved, startDate)]
          : null,
      };
    }
  }

  const timeOfSelected = getTimeOfSelected(date, reserved, startDate);

  const newStart = isStart ? timeOfSelected : startDate;
  const newEnd = !isStart ? timeOfSelected : endDate;

  const newSelected = [newStart || null, newEnd || null];

  return { errorType: null, newSelected };
}

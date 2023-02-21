import { isToday } from "date-fns";
import isBefore from "date-fns/isBefore";
import startOfDay from "date-fns/startOfDay";
import { isBetweenInterval } from "../helpers";
import { DayState, Reserved, Selected, VarinatType } from "../types";
import { getFreeTimeOfDate } from "./getFreeTimeOfDate";

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

const validateBooking = (
  props: CheckOberbookingProps
): CheckOberbookingType | null => {
  const { date, selected, reserved, state, range } = props;
  const [startDate, endDate] = selected;
  const isStart = range ? !startDate : props.isStart;

  const newSelected = [getFreeTimeOfDate(date, reserved).startDate];

  // if past
  if (state.isPast) return { errorType: PAST, newSelected: null };

  // if reserved between
  if (state.isReserved) return { errorType: BOOKED, newSelected: null };

  // if selected length 0 or 2 then set selected date
  if (range && ((!startDate && !endDate) || (startDate && endDate))) {
    return { errorType: null, newSelected };
  }

  if (isStart) {
    // if selected start date after end date
    if (endDate && isBefore(endDate, date)) {
      return { errorType: AFTER_END, newSelected: range ? newSelected : null };
    }
  } else {
    // if selected end date before start date
    if (startDate && isBefore(date, startDate)) {
      return {
        errorType: BEFORE_START,
        newSelected: range ? newSelected : null,
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
      errorType: BOOKED_BETWEEN,
      newSelected: range || isStart ? newSelected : null,
    };
  }

  return null;
};

const validateEvents = (
  props: CheckOberbookingProps
): CheckOberbookingType | null => {
  return null;
};

const validateVariants = {
  booking: validateBooking,
  events: validateEvents,
};

export function checkOberbooking(
  props: CheckOberbookingProps
): CheckOberbookingType {
  const { date, selected, reserved, state, range, variant } = props;
  if (state.isDisabled) return { errorType: "DISABLED", newSelected: null };

  const validate = validateVariants[variant](props);
  if (validate) return validate;

  const [startDate, endDate] = selected;
  const isStart = range ? !startDate : props.isStart;
  const freeTime = getFreeTimeOfDate(date, reserved);

  const newStart = isStart
    ? isToday(date)
      ? new Date()
      : freeTime.startDate
    : startDate;
  const newEnd = !isStart ? freeTime.endDate : endDate;

  const newSelected = [newStart || null, newEnd || null];

  return { errorType: null, newSelected };
}

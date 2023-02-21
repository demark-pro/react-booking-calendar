import isSameDay from "date-fns/isSameDay";
import isBefore from "date-fns/isBefore";
import isAfter from "date-fns/isAfter";
import isEqual from "date-fns/isEqual";
import startOfDay from "date-fns/startOfDay";
import endOfDay from "date-fns/endOfDay";
import addMonths from "date-fns/addMonths";
import startOfMonth from "date-fns/startOfMonth";
import isSameYear from "date-fns/isSameYear";
import endOfMonth from "date-fns/endOfMonth";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import addDays from "date-fns/addDays";
import isSameMonth from "date-fns/isSameMonth";
import {
  Day,
  DayState,
  DaysProps,
  Reserved,
  Selected,
  CommonPropsType,
  DisabledFuncType,
  VarinatType,
} from "./types";
import { StylesProps } from "./styles";

// ==============================
// isBetween
// ==============================

export const isBetween = (
  date: Date | number,
  from: Date | number,
  to: Date | number,
  inclusivity: string = "()"
) => {
  const isBeforeSome = inclusivity[0] === "{",
    isAfterSome = inclusivity[1] === "}",
    isBeforeEqual = inclusivity[0] === "[",
    isAfterEqual = inclusivity[1] === "]";

  if (isBeforeSome || isAfterSome) {
    return (
      (isBeforeSome
        ? isSameDay(from, date) || isBefore(from, date)
        : isBefore(from, date)) &&
      (isAfterSome
        ? isSameDay(to, date) || isAfter(to, date)
        : isAfter(to, date))
    );
  }

  return (
    (isBeforeEqual
      ? isEqual(from, date) || isBefore(from, date)
      : isBefore(from, date)) &&
    (isAfterEqual ? isEqual(to, date) || isAfter(to, date) : isAfter(to, date))
  );
};

// ==============================
// isBetweenInterval
// ==============================

export const isBetweenInterval = (
  startDate: Date | number,
  endDate: Date | number,
  from: Date | number,
  to: Date | number,
  inclusivity: string = "()"
) => {
  return (
    isBetween(startDate, from, to, inclusivity) ||
    isBetween(endDate, from, to, inclusivity)
  );
};

// ==============================
// getSelectedDates
// ==============================

export const getSelectedDates = (
  selected: (Date | number | null | undefined)[]
) =>
  selected
    .map((s) => (s ? new Date(s) : null))
    .concat(Array.from({ length: 2 - selected.length }, () => null));

// ==============================
// createDays
// ==============================

export const createDays = ({
  dateOfStartMonth,
  numOfMonths,
  dateFnsOptions,
  isInfinte = true,
}: DaysProps): Day[] => {
  let days: Day[] = [];

  let rowIndex = 0;
  for (let i in Array.from({ length: numOfMonths })) {
    const currentMonth = addMonths(dateOfStartMonth, +i);
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const weekStart = startOfWeek(monthStart, dateFnsOptions);
    const weekEnd = endOfWeek(monthEnd, dateFnsOptions);

    if (isInfinte) {
      days = [
        ...days,
        ...Array.from({ length: 7 }).map((i) => ({
          date: addDays(weekEnd, 1),
          monthStartDate: monthStart,
          rowIndex: -1,
        })),
      ];
      rowIndex++;
    }

    let day = weekStart;
    while (day <= weekEnd) {
      const cloneDay = day;
      days.push({
        date: cloneDay,
        monthStartDate: monthStart,
        rowIndex:
          isInfinte && isSameMonth(cloneDay, monthStart) ? rowIndex : -1,
      });

      if (
        isInfinte &&
        isSameDay(cloneDay, endOfWeek(cloneDay, dateFnsOptions))
      ) {
        rowIndex = rowIndex + 1;
      }

      day = addDays(cloneDay, 1);
    }
  }

  return days;
};

// ==============================
// getDayState
// ==============================

interface DayStateProps {
  day: Day;
  keys?: stateKeyType[];
  selected?: Selected[];
  reserved?: Reserved[];
  disabled?: boolean | DisabledFuncType;
}

type stateKeyType = keyof typeof dayStateValues;

const dayStateValues = {
  isSameYear: (d: Date, m: Date, s: Selected[], r: Reserved[]) =>
    isSameYear(d, new Date()),
  isSameMonth: (d: Date, m: Date, s: Selected[], r: Reserved[]) =>
    isSameMonth(d, m),
  isStartMonth: (d: Date, m: Date, s: Selected[], r: Reserved[]) =>
    isSameDay(d, m),
  isPast: (d: Date, m: Date, s: Selected[], r: Reserved[]) =>
    isBefore(d, startOfDay(new Date())),
  isToday: (d: Date, m: Date, s: Selected[], r: Reserved[]) =>
    isSameDay(d, new Date()),
  isSelectedStart: (d: Date, m: Date, s: Selected[], r: Reserved[]) =>
    s[0] ? isSameDay(d, s[0]) : false,
  isSelectedEnd: (d: Date, m: Date, s: Selected[], r: Reserved[]) =>
    s[1] ? isSameDay(d, s[1]) : false,
  isSelected: (d: Date, m: Date, s: Selected[], r: Reserved[]) =>
    !!(s[0] && s[1] && isBetween(d, s[0], s[1], "{}")),
  isReserved: (d: Date, m: Date, s: Selected[], r: Reserved[]) =>
    !!r.find(
      (e) =>
        isBetween(endOfDay(d), e.startDate, e.endDate, "[]") &&
        isBetween(startOfDay(d), e.startDate, e.endDate, "[]")
    ),
};

export const getDayState = ({
  day,
  keys,
  selected = [],
  reserved = [],
  disabled = false,
}: DayStateProps): DayState => {
  const { date, monthStartDate } = day;

  let state: DayState = {};

  const stateKeys = keys?.length ? keys : Object.keys(dayStateValues);

  for (const key of stateKeys) {
    state = {
      ...state,
      [key]: dayStateValues[key as stateKeyType](
        date,
        monthStartDate,
        selected,
        reserved
      ),
    };
  }

  return {
    ...state,
    isDisabled: typeof disabled === "function" ? disabled(date, state) : false,
  };
};

// ==============================
// getStyleProps
// ==============================

export const getStyleProps = <Key extends keyof StylesProps>(
  props: any,
  name: Key,
  commonProps: CommonPropsType
) => {
  const { getClassNames, getStyles } = commonProps;

  return {
    css: getStyles(props, name),
    className: getClassNames(name),
  };
};

// ==============================
// isClickable
// ==============================

export const isClickable = (
  { isDisabled, isPast, isReserved }: DayState,
  variant: VarinatType = "booking"
): boolean => {
  if (isDisabled) return false;

  if (variant === "events") return true;

  if (isPast) return false;
  if (isReserved) return false;

  return true;
};

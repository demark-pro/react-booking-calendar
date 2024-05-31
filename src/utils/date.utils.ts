import { CalendarDate, CalendarOptions } from "../types";

const toDate = (value: CalendarDate) => new Date(value);

export function formatDate(
  date: CalendarDate,
  format: Intl.DateTimeFormatOptions,
  options?: CalendarOptions
) {
  const _date = toDate(date);
  return _date.toLocaleDateString(options?.locale, format);
}

export function addDays(date: CalendarDate, amount: number): Date {
  const _date = toDate(date);
  if (!amount) return _date;

  _date.setDate(_date.getDate() + amount);
  return _date;
}

export function addMonths(date: CalendarDate, amount: number): Date {
  const _date = toDate(date);

  if (!amount) return _date;

  const dayOfMonth = _date.getDate();

  const endOfDesiredMonth = _date;
  endOfDesiredMonth.setMonth(_date.getMonth() + amount + 1, 0);
  const daysInMonth = endOfDesiredMonth.getDate();
  if (dayOfMonth >= daysInMonth) {
    return endOfDesiredMonth;
  } else {
    _date.setFullYear(
      endOfDesiredMonth.getFullYear(),
      endOfDesiredMonth.getMonth(),
      dayOfMonth
    );
    return _date;
  }
}

export function startOfDay(date: CalendarDate): Date {
  const _date = toDate(date);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

export function endOfDay(date: CalendarDate): Date {
  const _date = toDate(date);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

export function isSameDay(
  dateLeft: CalendarDate,
  dateRight: CalendarDate
): boolean {
  const dateLeftStartOfDay = startOfDay(dateLeft);
  const dateRightStartOfDay = startOfDay(dateRight);

  return +dateLeftStartOfDay === +dateRightStartOfDay;
}

export function isSameMonth(
  dateLeft: CalendarDate,
  dateRight: CalendarDate
): boolean {
  const _dateLeft = toDate(dateLeft);
  const _dateRight = toDate(dateRight);
  return (
    _dateLeft.getFullYear() === _dateRight.getFullYear() &&
    _dateLeft.getMonth() === _dateRight.getMonth()
  );
}

export function isSameYear(
  dateLeft: CalendarDate,
  dateRight: CalendarDate
): boolean {
  const _dateLeft = toDate(dateLeft);
  const _dateRight = toDate(dateRight);
  return _dateLeft.getFullYear() === _dateRight.getFullYear();
}

export function isWeekend(date: CalendarDate): boolean {
  const day = toDate(date).getDay();
  return day === 0 || day === 6;
}

export function isBefore(
  date: CalendarDate,
  dateToCompare: CalendarDate
): boolean {
  const _date = toDate(date);
  const _dateToCompare = toDate(dateToCompare);
  return +_date < +_dateToCompare;
}

export function isAfter(
  date: CalendarDate,
  dateToCompare: CalendarDate
): boolean {
  const _date = toDate(date);
  const _dateToCompare = toDate(dateToCompare);
  return _date.getTime() > _dateToCompare.getTime();
}

export function isEqual(
  leftDate: CalendarDate,
  rightDate: CalendarDate
): boolean {
  const _dateLeft = toDate(leftDate);
  const _dateRight = toDate(rightDate);
  return +_dateLeft === +_dateRight;
}

export function startOfWeek(
  date: CalendarDate,
  options?: CalendarOptions
): Date {
  const weekStartsOn = options?.weekStartsOn ?? 0;

  const _date = toDate(date);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

export function endOfWeek(date: CalendarDate, options?: CalendarOptions): Date {
  const weekStartsOn = options?.weekStartsOn ?? 0;

  const _date = toDate(date);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);

  _date.setDate(_date.getDate() + diff);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

export function startOfMonth(date: CalendarDate): Date {
  const _date = toDate(date);
  _date.setDate(1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

export function endOfMonth(date: CalendarDate): Date {
  const _date = toDate(date);
  const month = _date.getMonth();
  _date.setFullYear(_date.getFullYear(), month + 1, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

export function diffDays(leftDate: CalendarDate, rightDate: CalendarDate) {
  const _leftDate = toDate(leftDate);
  const _rightDate = toDate(rightDate);

  return Math.round(
    (_leftDate.getTime() - _rightDate.getTime()) / (1000 * 60 * 60 * 24)
  );
}

export const isBetween = (
  date: CalendarDate,
  from: CalendarDate,
  to: CalendarDate,
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

export const isBetweenInterval = (
  startDate: CalendarDate,
  endDate: CalendarDate,
  from: CalendarDate,
  to: CalendarDate,
  inclusivity: string = "()"
) => {
  return (
    isBetween(startDate, from, to, inclusivity) ||
    isBetween(endDate, from, to, inclusivity)
  );
};

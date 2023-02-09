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
import format from "date-fns/format";
import isSameMonth from "date-fns/isSameMonth";

import { Reserved, DayInfo, DaysProps } from "./types";
import { getReservedInfoOfDate } from "./utils/getReservedInfoOfDate";

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

export const createDays = ({
  dateOfStartMonth,
  numOfMonths,
  reserved,
}: DaysProps): DayInfo[] => {
  let days: DayInfo[] = [];
  for (let i in Array.from({ length: numOfMonths })) {
    const currentMonth = addMonths(dateOfStartMonth, +i);
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const weekStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    days = [
      ...days,
      ...Array.from({ length: 7 }).map((i) => ({
        date: addDays(weekEnd, 1),
        isSameMonth: false,
      })),
    ];

    let day = weekStart;
    while (day <= weekEnd) {
      const cloneDay = day;

      // prettier-ignore
      const reservedStart = getReservedInfoOfDate(startOfDay(cloneDay), reserved, true);
      const reservedEnd = getReservedInfoOfDate(endOfDay(cloneDay), reserved);
      const isReserved = !!reserved.find(
        (d) =>
          isBetween(endOfDay(cloneDay), d.startDate, d.endDate, "[]") &&
          isBetween(startOfDay(cloneDay), d.startDate, d.endDate, "[]")
      );
      const isToday = isSameDay(cloneDay, new Date());
      const isPast = isBefore(cloneDay, new Date());

      const dayObj = {
        date: cloneDay,
        text: format(cloneDay, "d"),
        isStartMonth: isSameDay(cloneDay, monthStart),
        isSameMonth: isSameMonth(cloneDay, monthStart),
        isSameYear: isSameYear(cloneDay, new Date()),
        reservedStart: reservedStart.reserved ? reservedStart.startDate : null,
        reservedEnd: reservedEnd.reserved ? reservedEnd.endDate : null,
        isReserved,
        isPast,
        isToday,
      };

      // push
      days.push(dayObj);
      day = addDays(cloneDay, 1);
    }
  }

  return days;
};

import {
  isSameDay,
  isBefore,
  isAfter,
  isEqual,
  isSameMonth,
  startOfDay,
  endOfDay,
  isSameYear,
  addMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  getDay,
} from "date-fns";

import { Reserved, DayInfo, getReservedInfoOfDate } from "./BookingCalendar/BookingCalendar";

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

export const createDays = (
  startMonth: Date | number,
  numOfMonth: number,
  reserved: Array<Reserved>
): DayInfo[] => {
  let days: DayInfo[] = [];
  for (let i in Array.from({ length: numOfMonth })) {
    const currentMonth = addMonths(startMonth, +i);
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const weekStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    days = [
      ...days,
      ...Array.from({ length: 7 }).map((i) => ({
        day: addDays(weekEnd, 1),
        monthStart,
      })),
    ];

    let day = weekStart;
    while (day <= weekEnd) {
      const cloneDay = day;

      // prettier-ignore
      const reservedStart = getReservedInfoOfDate(startOfDay(cloneDay), reserved, true);
      const reservedEnd = getReservedInfoOfDate(endOfDay(cloneDay), reserved);

      days.push({
        day: cloneDay,
        monthStart,
        isWeekend: getDay(cloneDay) > 4,
        isCurrentMonth: isSameMonth(cloneDay, monthStart),
        isCurrentYear: isSameYear(new Date(), monthStart),
        isToday: isSameDay(cloneDay, new Date()),
        isPast: isBefore(cloneDay, new Date()),
        isReserved: !!reserved.find(
          (d) =>
            isBetween(endOfDay(cloneDay), d.startDate, d.endDate, "[]") &&
            isBetween(startOfDay(cloneDay), d.startDate, d.endDate, "[]")
        ),
        reservedStart: reservedStart.reserved ? reservedStart.startDate : null,
        reservedEnd: reservedEnd.reserved ? reservedEnd.endDate : null,
      });

      day = addDays(cloneDay, 1);
    }
  }
  return days;
};

import { differenceInMinutes, endOfDay, isSameDay, startOfDay } from "date-fns";
import {
  GetReservedInfoOfDate,
  Reserved,
} from "../BookingCalendar/BookingCalendar";

export function getReservedInfoOfDate(
  date: Date | number,
  reserved: Reserved[],
  isStart: boolean = false
): GetReservedInfoOfDate {
  const reservedInfo = {
    reserved: false,
    startDate: startOfDay(date),
    endDate: endOfDay(date),
  };
  if (!reserved.length) return reservedInfo;

  const day = isStart ? endOfDay(date) : startOfDay(date);
  if (isStart) {
    const reservedDay = reserved.find((d) => isSameDay(d.endDate, day));
    if (!reservedDay) return reservedInfo;

    return differenceInMinutes(day, reservedDay.endDate) > 0
      ? {
          reserved: true,
          startDate: new Date(reservedDay.endDate),
          endDate: day,
        }
      : reservedInfo;
  }

  const reservedDay = reserved.find((d) => isSameDay(d.startDate, day));
  if (!reservedDay) return reservedInfo;

  return differenceInMinutes(reservedDay.startDate, day) > 0
    ? {
        reserved: true,
        startDate: day,
        endDate: new Date(reservedDay.startDate),
      }
    : reservedInfo;
}

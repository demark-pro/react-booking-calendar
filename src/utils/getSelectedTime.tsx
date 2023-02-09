import { endOfDay, isAfter, startOfDay } from "date-fns";
import { Reserved } from "../types";
import { isBetweenInterval } from "../helpers";
import { getReservedInfoOfDate } from "./getReservedInfoOfDate";

export function getSelectedTime(
  date: Date | number,
  reservedDates: Reserved[],
  selectedStart?: Date | number | null
): Date {
  if (selectedStart && isAfter(date, selectedStart) && reservedDates) {
    const { reserved, endDate } = getReservedInfoOfDate(date, reservedDates);
    if (reserved) return endDate;

    const reservedBetween = reservedDates.find((d) =>
      isBetweenInterval(
        d.startDate,
        d.endDate,
        selectedStart,
        endOfDay(date),
        "()"
      )
    );

    if (!reservedBetween) return endOfDay(date);
  }

  const { reserved, startDate } = getReservedInfoOfDate(
    date,
    reservedDates,
    true
  );
  return reserved ? startDate : startOfDay(date);
}

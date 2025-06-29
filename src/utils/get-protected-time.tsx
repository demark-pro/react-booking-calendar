import { CalendarReserved } from "../types";
import { isSameDay } from "./date.utils";

export type GetProtectedTimeReturn = {
  startDate: Date;
  endDate: Date;
};

export const getProtectedTime = (
  date: Date,
  reserved: CalendarReserved[]
): GetProtectedTimeReturn => {
  const initTime = {
    // startDate: startOfDay(date),
    // endDate: endOfDay(date),
    startDate: date,
    endDate: date,
  };

  const reserveEnd = reserved.find((d) => isSameDay(d.endDate, date));
  const reserveStart = reserved.find((d) => isSameDay(d.startDate, date));

  if (reserveEnd) initTime.startDate = new Date(reserveEnd.endDate);
  if (reserveStart) initTime.endDate = new Date(reserveStart.startDate);

  return initTime;
};

import isSameDay from "date-fns/isSameDay";
import startOfDay from "date-fns/startOfDay";
import endOfDay from "date-fns/endOfDay";

import { Reserved } from "../types";

export type FreeTimeOfDateType = {
  startDate: Date;
  endDate: Date;
};

export const getFreeTimeOfDate = (
  date: Date,
  reserved: Reserved[]
): FreeTimeOfDateType => {
  const initTime = {
    startDate: startOfDay(date),
    endDate: endOfDay(date),
  };

  const reserveEnd = reserved.find((d) => isSameDay(d.endDate, date));
  const reserveStart = reserved.find((d) => isSameDay(d.startDate, date));

  if (reserveEnd) initTime.startDate = new Date(reserveEnd.endDate);
  if (reserveStart) initTime.endDate = new Date(reserveStart.startDate);

  return initTime;
};

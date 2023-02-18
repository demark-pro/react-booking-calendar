import Calendar from "./Calendar";
import InfiniteCalendar from "./InfiniteCalendar";
import { getReservedInfoOfDate } from "./utils/getReservedInfoOfDate";
import { getTimeOfSelected } from "./utils/getTimeOfSelected";

export { Calendar, InfiniteCalendar, getReservedInfoOfDate, getTimeOfSelected };

export type { InfiniteCalendarProps } from "./InfiniteCalendar";
export type { CalendarProps } from "./Calendar";
export type {
  Selected,
  Reserved,
  ReservedInfoOfDate,
  DateFnsOptions,
  DayState,
} from "./types";

export default Calendar;

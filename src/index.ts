import Calendar from "./Calendar";
import InfiniteCalendar from "./InfiniteCalendar";
import { getFreeTimeOfDate } from "./utils/getFreeTimeOfDate";

export { Calendar, InfiniteCalendar, getFreeTimeOfDate };

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

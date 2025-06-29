import {
  CalendarDay,
  CalendarDayState,
  CalendarReserved,
  CalendarSelected,
  CalendarDisabled,
  CalendarDate,
  CalendarOptions,
  CommonProps,
} from "./types";
import {
  startOfWeek,
  endOfWeek,
  isSameDay,
  startOfDay,
  addDays,
  endOfDay,
  addMonths,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  isBetween,
} from "./utils/date.utils";
import memoize from "memoize-one";

export function cn(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export function getAttributes(attributes: Record<string, boolean>) {
  return Object.entries(attributes).reduce(
    (a, [k, v]) => (!!v ? { ...a, [k]: true } : a),
    {}
  );
}

export const getSelectedDates = (selected: CalendarSelected[]) =>
  selected
    .map((s) => (s ? new Date(s) : null))
    .concat(Array.from({ length: 2 - selected.length }, () => null));

export const preProtection = (
  date: Date,
  state: CalendarDayState,
  commonProps: CommonProps
): CalendarSelected[] | null => {
  const { protection, range, isStart, selected } = commonProps;

  if (state.isDisabled || !!protection) return null;

  const [startDate, endDate] = selected;

  if (range) return startDate ? [startDate, date] : [date];

  return isStart ? [date, endDate] : [startDate, date];
};

// ==============================
// Day helpers
// ==============================

type CreateMonthDays = {
  dateOfMonth: CalendarDate;
  options?: CalendarOptions;
};
export const createMonthDays = memoize(
  ({ dateOfMonth, options }: CreateMonthDays) => {
    let days: CalendarDay[] = [];

    const monthStart = startOfMonth(dateOfMonth);
    const monthEnd = endOfMonth(dateOfMonth);
    const weekStart = startOfWeek(monthStart, options);
    const weekEnd = endOfWeek(monthEnd, options);

    let day = weekStart;
    while (day <= weekEnd) {
      const cloneDay = day;
      days.push({ date: cloneDay, monthStartDate: monthStart });

      day = addDays(cloneDay, 1);
    }

    return days;
  }
);

type CreateScrollableDays = CreateMonthDays & {
  monthsCount: number;
};
export const createScrollableDays = memoize(
  ({
    dateOfMonth,
    options,
    monthsCount = 6,
  }: CreateScrollableDays): CalendarDay[] => {
    let days: CalendarDay[] = [];

    for (let i in Array.from({ length: monthsCount })) {
      const currentMonth = addMonths(dateOfMonth, +i);
      const monthDays = createMonthDays({
        dateOfMonth: currentMonth,
        options,
      }) as CalendarDay[];

      const rowFiller: CalendarDay[] = Array.from({ length: 7 }).map(() => ({
        date: currentMonth,
        monthStartDate: currentMonth,
        isMonthRow: true,
      }));

      days = [...days, ...rowFiller, ...monthDays];
    }

    return days;
  }
);

interface DayStateProps {
  day: CalendarDay | CalendarDay;
  selected?: CalendarSelected[];
  reserved?: CalendarReserved[];
  disabled?: CalendarDisabled;
}
export const getDayState = ({
  day,
  selected = [],
  reserved = [],
  disabled = false,
}: DayStateProps): CalendarDayState => {
  const { date, monthStartDate } = day;

  const today = new Date();

  let state: CalendarDayState = {};

  state.isDisabled =
    typeof disabled === "function" ? disabled(date, state) : disabled;
  state.isSameYear = date.getFullYear() === today.getFullYear();
  state.isSameMonth = isSameMonth(date, monthStartDate);
  state.isStartMonth = isSameDay(date, startOfMonth(date));
  state.isEndMonth = isSameDay(date, endOfMonth(date));
  state.isToday = isSameDay(date, today);
  state.isPast = date.getTime() - today.getTime() < 0;
  state.isSelectedStart = selected[0] ? isSameDay(date, selected[0]) : false;
  state.isSelectedEnd = selected[1] ? isSameDay(date, selected[1]) : false;
  state.isSelected = !!(
    selected[0] &&
    selected[1] &&
    isBetween(date, selected[0], selected[1], "{}")
  );
  state.isReserved = !!reserved.find(
    (r) =>
      isBetween(endOfDay(date), r.startDate, r.endDate, "{}") &&
      isBetween(startOfDay(date), r.startDate, r.endDate, "{}")
  );
  state.isAvailable = !!reserved.find(
    (r) =>
      !isBetween(endOfDay(date), r.startDate, r.endDate, "[]") ||
      !isBetween(startOfDay(date), r.startDate, r.endDate, "[]")
  );
  state.isReservedStart = !!reserved.find((r) => isSameDay(r.startDate, date));
  state.isReservedEnd = !!reserved.find((r) => isSameDay(r.endDate, date));

  return state;
};

export function getDayAttributes(
  state: CalendarDayState,
  options?: CalendarOptions
) {
  if (!options || !options.useAttributes) return {};

  let attributes: Record<string, boolean> = {};

  if (state.isSelected || state.isSelectedStart || state.isSelectedEnd)
    attributes["data-selected"] = true;
  if (state.isSelectedStart) attributes["data-selected-start"] = true;
  if (state.isSelectedEnd) attributes["data-selected-end"] = true;
  if (state.isReserved) attributes["data-reserved"] = true;
  if (state.isReservedStart) attributes["data-reserved-start"] = true;
  if (state.isReservedEnd) attributes["data-reserved-end"] = true;
  if (state.isPast) attributes["data-past"] = true;
  if (state.isToday) attributes["data-today"] = true;

  return attributes;
}

// ==============================
// Boolean
// ==============================

export const isClickable = ({
  isDisabled,
  isPast,
  isReserved,
}: CalendarDayState): boolean => {
  if (isDisabled) return false;

  if (isPast) return false;
  if (isReserved) return false;

  return true;
};

export function isNumeric(value: any) {
  return typeof value === "number";

  if (typeof value !== "string") return false; // we only process strings!

  return (
    !isNaN(+value) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(value))
  ); // ...and ensure strings of whitespace fail
}

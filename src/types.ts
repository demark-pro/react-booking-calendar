import { CalendarClassNamesBase, CalendarComponents } from "./components";
import { ComponentPropsWithoutRef } from "react";

// export

export type CalendarDate = Date | number | string;
export type OverbookTypes =
  | "PAST"
  | "BOOKED"
  | "BEFORE_START"
  | "AFTER_END"
  | "BOOKED_BETWEEN"
  | "DISABLED";

export type CalendarDay = {
  date: Date;
  monthStartDate: Date;
  handleClick?: ClickDayHandler;
  isMonthRow?: boolean;
};

export interface CalendarDayState {
  isPast?: boolean;
  isToday?: boolean;
  isStartMonth?: boolean;
  isEndMonth?: boolean;
  isSameMonth?: boolean;
  isSameYear?: boolean;
  isSelected?: boolean;
  isSelectedStart?: boolean;
  isSelectedEnd?: boolean;
  isReserved?: boolean;
  isReservedStart?: boolean;
  isReservedEnd?: boolean;
  isDisabled?: boolean;
}

export type CalendarMonth = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface CalendarReserved {
  startDate: CalendarDate;
  endDate: CalendarDate;
  color?: string;
}

export type CalendarSelected = CalendarDate | null | undefined;

export type ClickDayHandler = (date: Date, state: CalendarDayState) => void;

export type CalendarChangeHandler = (e: CalendarSelected[]) => void;
export type OverbookHandler = (e: Date, errorType: string) => void;
export type MonthChangeHandler = (month: CalendarMonth, year: number) => void;
export type YearChangeHandler = (year: number) => void;

// ========================== old ==========================

export type CalendarDisabled =
  | boolean
  | ((date: Date, state: CalendarDayState) => boolean);

export type CalendarProtection = boolean;

export type CalendarOptions = {
  locale?: Intl.LocalesArgument;
  weekStartsOn?: number;
  useAttributes?: boolean;
};

export type CommonProps = {
  selected: CalendarSelected[];
  reserved: CalendarReserved[];
  disabled?: CalendarDisabled;
  protection?: CalendarProtection;
  range?: boolean;
  isStart?: boolean;
  options?: CalendarOptions;
  getClassNames: (
    name: keyof CalendarClassNamesBase,
    classes?: string
  ) => string;
};

export type CalendarClassNames = Partial<CalendarClassNamesBase>;

export type CalendarPropsBase = {
  selected?: CalendarSelected[];
  reserved?: Array<CalendarReserved>;
  components?: CalendarComponents;
  classNames?: CalendarClassNames;
  disabled?: CalendarDisabled;
  isStart?: boolean;
  options?: CalendarOptions;
  range?: boolean;
  protection?: boolean;
  onOverbook?: OverbookHandler;
  onChange?: CalendarChangeHandler;
} & Omit<ComponentPropsWithoutRef<"div">, "onChange">;

import { GridOnScrollProps } from "react-window";

export interface Reserved {
  startDate: Date | number;
  endDate: Date | number;
}

export interface DayInfoHeader {
  classNames: string[];
  text: string | JSX.Element;
  visible: boolean;
}
export interface DayInfoFooter {
  classNames: string[];
  text: string | JSX.Element;
  visible: boolean;
}

export interface DayInfoMonth {
  classNames: string[];
  text: string;
  yearText: string | null;
}

export interface DayInfo {
  date: Date;
  text?: string;
  classNames?: (string | never)[];
  isStartMonth?: boolean;
  isSameMonth: boolean;
  isSameYear?: boolean;
  reservedStart?: Date | null;
  reservedEnd?: Date | null;
  isReserved?: boolean;
  isPast?: boolean;
  isToday?: boolean;
  rowIndex: number;
  handleClick?: (e: DayInfo) => void;
}

export interface Titles {
  dayFooterStart: string | JSX.Element;
  dayFooterEnd: string | JSX.Element;
  reservedFooter: string | JSX.Element;
}

export interface ReservedInfoOfDate {
  reserved: boolean;
  startDate: Date;
  endDate: Date;
}

export interface DateFnsOptions {
  locale?: Locale;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export type CalendarContextProps = {
  selectedDates: Array<Date | number | null>;
  dateFnsOptions: DateFnsOptions;
  titles: Titles;
  renderDay?: (e: DayInfo) => JSX.Element;
  handleClickDay: (e: DayInfo) => void;
};

export type InfiniteCalendarProps = {
  selectedStart?: Date | number | null;
  selectedEnd?: Date | number | null;
  isStart?: boolean;
  dateOfStartMonth?: Date | number;
  numOfMonths?: number;
  overscanWeekCount?: number;
  colHeight?: number;
  reserved?: Array<Reserved>;
  titles?: Titles;
  disabled?: boolean;
  scrollToDate?: Date | number | null;
  dateFnsOptions?: DateFnsOptions;
  rangeMode?: boolean;
  renderDay?: (e: DayInfo) => JSX.Element;
  onOverbook?: (e: Date, errorType: string) => void;
  onChange?: (e: Date) => void;
  onChangeRange?: (e: [Date | number, Date | number]) => void;
  onScroll?: (e: GridOnScrollProps) => void;
  className?: string;
};

export type GridProps = {
  dateOfStartMonth: Date | number;
  overscanWeekCount: number;
  width: number;
  height: number;
  items: Array<DayInfo>;
  colHeight: number;
  scrollToDate?: Date | number | null;
  onScroll?: (e: GridOnScrollProps) => void;
};

export type DaysProps = {
  dateOfStartMonth: Date | number;
  numOfMonths: number;
  reserved: Array<Reserved>;
};

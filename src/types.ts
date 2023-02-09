import { GridChildComponentProps } from "react-window";

export interface Reserved {
  startDate: Date | number;
  endDate: Date | number;
}

export interface DayInfo {
  day: Date;
  dayText?: string;
  monthStart: Date;
  isWeekend?: boolean;
  isCurrentMonth?: boolean;
  isCurrentYear?: boolean;
  isToday?: boolean;
  isPast?: boolean;
  isReserved?: boolean;
  reservedStart?: Date | number | null;
  reservedEnd?: Date | number | null;
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

export type BookingCalendarProps = {
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
  renderDay?: (e: GridChildComponentProps & CellProps) => JSX.Element;
  onOverbook?: (e: Date, errorType: string) => void;
  onChange?: (e: Date) => void;
  onChangeRange?: (e: [Date | number, Date | number]) => void;
  className?: string;
};

export type GridProps = {
  dateOfStartMonth: Date | number;
  overscanWeekCount: number;
  width: number;
  height: number;
  items: Array<Object>;
  colHeight: number;
  scrollToDate?: Date | number | null;
  selectedStart: Date | number | null;
  selectedEnd: Date | number | null;
  titles: Titles;
  dateFnsOptions?: DateFnsOptions;
  renderDay?: (e: GridChildComponentProps & CellProps) => JSX.Element;
  handleClickDay: (e: DayInfo) => void;
};

export type CellProps = {
  selectedStart: Date | number | null;
  selectedEnd: Date | number | null;
  titles: Titles;
  dateFnsOptions?: DateFnsOptions;
  renderDay?: (props: GridChildComponentProps & CellProps) => JSX.Element;
  handleClickDay: (e: DayInfo) => void;
};

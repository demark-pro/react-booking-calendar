import { CSSObject } from "@emotion/react";
import { GridOnScrollProps } from "react-window";
import { CalendarComponentsConfig } from "./components";
import { StylesProps } from "./styles";

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

export type ClickDayType = (e: Day, state: DayState) => void;

export interface Reserved {
  startDate: Date | number;
  endDate: Date | number;
  color?: string;
}

export interface Day {
  date: Date;
  rowIndex: number;
  monthStartDate: Date;
  handleClick?: ClickDayType;
}

export interface DayState {
  isPast?: boolean;
  isToday?: boolean;
  isStartMonth?: boolean;
  isSameMonth?: boolean;
  isSameYear?: boolean;
  isSelected?: boolean;
  isSelectedStart?: boolean;
  isSelectedEnd?: boolean;
  isReserved?: boolean;
  isDisabled?: boolean;
}

export interface DateFnsOptions {
  locale?: Locale;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export type Selected = Date | number | null;
export type VarinatType = "booking" | "events";
export type DisabledFuncType = (date: Date, state: DayState) => boolean;

export type CommonPropsType = {
  selected: Selected[];
  reserved: Reserved[];
  variant: VarinatType;
  dateFnsOptions: DateFnsOptions;
  getClassNames: <Key extends keyof StylesProps>(name: Key) => string;
  getStyles: <Key extends keyof StylesProps>(
    props: any,
    name: Key
  ) => CSSObject;
};

export type CalendarContextProps = {
  components: CalendarComponentsConfig;
  commonProps: CommonPropsType;
  handleClickDay: ClickDayType;
};

export type DefaultCalendarProps = {
  selected?: Selected[];
  isStart?: boolean;
  dateOfStartMonth?: Date | number;
  reserved?: Array<Reserved>;
  variant?: VarinatType;
  disabled?: boolean | DisabledFuncType;
  dateFnsOptions?: DateFnsOptions;
  range?: boolean;
  components?: CalendarComponentsConfig;
  onOverbook?: (e: Date, errorType: string) => void;
  onChange?: (e: Selected[]) => void;
  className?: string;
  classNamePrefix?: string;
};

export type GridProps = {
  width: number;
  height: number;
  items: Array<Day>;
  colHeight: number;
  scrollToDate?: Date | number | null;
  onScroll?: (e: GridOnScrollProps) => void;
};

export type DaysProps = {
  dateOfStartMonth: Date | number;
  numOfMonths: number;
  dateFnsOptions: DateFnsOptions;
  isInfinte?: boolean;
};

import { ComponentType } from "react";
import {
  CalendarContainer,
  CalendarContainerProps,
  DayContainer,
  DayContainerProps,
  DaysContainer,
  DaysContainerProps,
  MonthContainer,
  MonthContainerProps,
  WeekContainer,
  WeekContainerProps,
} from "./containers";
import { MonthArrowBack, MonthArrowBackProps } from "./MonthArrowBack";
import { MonthArrowNext, MonthArrowNextProps } from "./MonthArrowNext";
import { MonthContent, MonthContentProps } from "./MonthContent";
import { WeekContent, WeekContentProps } from "./WeekContent";
import { DayContentProps } from "./DayContent";
import { DayContent } from "./DayContent";
import { DaySelection, DaySelectionProps } from "./DaySelection";
import { DayToday, DayTodayProps } from "./DayToday";
import { DayReservation, DayReservationProps } from "./DayReservation";

export interface CalendarComponentsBase {
  CalendarContainer: ComponentType<CalendarContainerProps>;
  MonthContainer: ComponentType<MonthContainerProps>;
  MonthContent: ComponentType<MonthContentProps>;
  MonthArrowBack: ComponentType<MonthArrowBackProps>;
  MonthArrowNext: ComponentType<MonthArrowNextProps>;
  WeekContainer: ComponentType<WeekContainerProps>;
  WeekContent: ComponentType<WeekContentProps>;
  DaysContainer: ComponentType<DaysContainerProps>;
  DayContainer: ComponentType<DayContainerProps>;
  DayContent: ComponentType<DayContentProps>;
  DaySelection: ComponentType<DaySelectionProps>;
  DayReservation: ComponentType<DayReservationProps>;
  DayToday: ComponentType<DayTodayProps>;
}

export type CalendarComponents = Partial<CalendarComponentsBase>;
export type CalendarComponentsGeneric = typeof components;

export type CalendarClassNamesBase = Record<
  keyof CalendarComponentsBase,
  string
>;

export const componentClasses: CalendarClassNamesBase = {
  CalendarContainer: "calendar-container",
  MonthContainer: "month-container",
  MonthContent: "month-content",
  MonthArrowBack: "month-arrow-back",
  MonthArrowNext: "month-arrow-next",
  WeekContainer: "week-container",
  WeekContent: "week-content",
  DaysContainer: "days-container",
  DayContainer: "day-container",
  DayContent: "day-content",
  DaySelection: "day-selection",
  DayReservation: "day-reservation",
  DayToday: "day-today",
};

export const components = {
  CalendarContainer: CalendarContainer,
  MonthContainer: MonthContainer,
  MonthContent: MonthContent,
  MonthArrowBack: MonthArrowBack,
  MonthArrowNext: MonthArrowNext,
  WeekContainer: WeekContainer,
  WeekContent: WeekContent,
  DaysContainer: DaysContainer,
  DayContainer: DayContainer,
  DayContent: DayContent,
  DaySelection: DaySelection,
  DayReservation: DayReservation,
  DayToday: DayToday,
};

export const defaultComponents = (
  componentsByProps: CalendarComponents = {}
): CalendarComponentsGeneric =>
  ({
    ...components,
    ...componentsByProps,
  }) as CalendarComponentsGeneric;

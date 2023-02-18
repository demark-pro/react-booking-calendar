import { ComponentType } from "react";
import {
  CalendarContainer,
  CalendarContainerProps,
  DaysContainer,
  DaysContainerProps,
  MonthContainer,
  MonthContainerProps,
  WeekContainer,
  WeekContainerChildProps,
  WeekContainerProps,
} from "./containers";
import DayCell, { DayCellProps } from "./DayCell";
import DayCellContent from "./DayCellContent";
import DayCellFooter from "./DayCellFooter";
import DayCellHeader from "./DayCellHeader";
import MonthArrowBack, { MonthArrowBackProps } from "./MonthArrowBack";
import MonthArrowNext, { MonthArrowNextProps } from "./MonthArrowNext";
import MonthContent, { MonthContentProps } from "./MonthContent";
import WeekCell from "./WeekCell";

export interface CalendarComponents {
  CalendarContainer: ComponentType<CalendarContainerProps>;
  MonthContainer: ComponentType<MonthContainerProps>;
  MonthContent: ComponentType<MonthContentProps>;
  MonthArrowBack: ComponentType<MonthArrowBackProps>;
  MonthArrowNext: ComponentType<MonthArrowNextProps>;
  WeekContainer: ComponentType<WeekContainerProps>;
  WeekCell: ComponentType<WeekContainerChildProps>;
  DaysContainer: ComponentType<DaysContainerProps>;
  DayCell: ComponentType<DayCellProps>;
  DayCellHeader: ComponentType<DayCellProps>;
  DayCellContent: ComponentType<DayCellProps>;
  DayCellFooter: ComponentType<DayCellProps>;
}

export type CalendarComponentsConfig = Partial<CalendarComponents>;
export type CalendarComponentsGeneric = typeof components;

export const components = {
  CalendarContainer: CalendarContainer,
  MonthContainer: MonthContainer,
  MonthContent: MonthContent,
  MonthArrowBack: MonthArrowBack,
  MonthArrowNext: MonthArrowNext,
  WeekContainer: WeekContainer,
  WeekCell: WeekCell,
  DaysContainer: DaysContainer,
  DayCell: DayCell,
  DayCellHeader: DayCellHeader,
  DayCellContent: DayCellContent,
  DayCellFooter: DayCellFooter,
};

export const defaultComponents = (
  componentsByProps: CalendarComponentsConfig = {}
): CalendarComponentsGeneric =>
  ({
    ...components,
    ...componentsByProps,
  } as CalendarComponentsGeneric);

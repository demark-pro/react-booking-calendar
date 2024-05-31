import React, {
  CSSProperties,
  ComponentPropsWithoutRef,
  PropsWithChildren,
} from "react";
import { CalendarDayState, ClickDayHandler, CommonProps } from "../types";
import { getAttributes } from "helpers";
import { formatDate } from "utils/date.utils";

// ==============================
// Calendar Container
// ==============================

export type CalendarContainerProps = CommonProps &
  PropsWithChildren & {
    innerProps: ComponentPropsWithoutRef<"div"> & { isScrollable?: boolean };
  };

export const CalendarContainer = (props: CalendarContainerProps) => {
  const { getClassNames, children, innerProps } = props;
  const { isScrollable, className = "", ...restInner } = innerProps ?? {};

  const classNames = getClassNames("CalendarContainer", className);

  return (
    <div
      className={classNames}
      {...getAttributes({ "data-scrollable": !!isScrollable })}
      {...restInner}
    >
      {children}
    </div>
  );
};

// ==============================
// Month Container
// ==============================

export type MonthContainerProps = CommonProps &
  PropsWithChildren & {
    innerProps?: { style?: CSSProperties };
  };

export const MonthContainer = (props: MonthContainerProps) => {
  const { children, innerProps, getClassNames } = props;

  return (
    <div className={getClassNames("MonthContainer")} {...innerProps}>
      {children}
    </div>
  );
};

// ==============================
// Week Container
// ==============================

export type WeekContainerProps = CommonProps &
  PropsWithChildren & {
    innerProps?: {};
  };

export const WeekContainer = (props: WeekContainerProps) => {
  const { getClassNames, children } = props;

  return <div className={getClassNames("WeekContainer")}>{children}</div>;
};

// ==============================
// Days Container
// ==============================

export type DaysContainerProps = CommonProps &
  PropsWithChildren & {
    innerProps?: {};
  };

export const DaysContainer = (props: DaysContainerProps) => {
  const { getClassNames, children } = props;

  return (
    <div role="listbox" className={getClassNames("DaysContainer")}>
      {children}
    </div>
  );
};

// ==============================
// Day Container
// ==============================

export type DayContainerProps = CommonProps &
  PropsWithChildren & {
    date: Date;
    state: CalendarDayState;
    innerProps?: {
      style?: CSSProperties;
      onClick: ClickDayHandler;
    };
  };

export const DayContainer = (props: DayContainerProps) => {
  const { date, state, innerProps, children, getClassNames, options } = props;
  const { onClick, ...restInner } = innerProps ?? {};

  const attributes = getAttributes({
    "data-selected":
      !!state.isSelected || !!state.isSelectedStart || !!state.isSelectedEnd,
    "data-reserved": !!state.isReserved,
    "data-past": !!state.isPast,
    "data-start-month": !!state.isStartMonth,
    "data-end-month": !!state.isEndMonth,
  });

  return (
    <div
      aria-label={formatDate(date, {}, options)}
      role="option"
      tabIndex={-1}
      className={getClassNames("DayContainer")}
      onClick={() => onClick && onClick(date, state)}
      {...attributes}
      {...restInner}
    >
      {children}
    </div>
  );
};

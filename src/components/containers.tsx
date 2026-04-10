import React, {
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
    innerProps?: ComponentPropsWithoutRef<"div">;
  };

export const MonthContainer = (props: MonthContainerProps) => {
  const { children, innerProps, getClassNames } = props;
  const { className = "", ...restInner } = innerProps ?? {};

  return (
    <div className={getClassNames("MonthContainer", className)} {...restInner}>
      {children}
    </div>
  );
};

// ==============================
// Week Container
// ==============================

export type WeekContainerProps = CommonProps &
  PropsWithChildren & {
    innerProps?: Omit<ComponentPropsWithoutRef<"div">, "children">;
  };

export const WeekContainer = (props: WeekContainerProps) => {
  const { getClassNames, children, innerProps } = props;
  const { className = "", ...restInner } = innerProps ?? {};

  return (
    <div className={getClassNames("WeekContainer", className)} {...restInner}>
      {children}
    </div>
  );
};

// ==============================
// Days Container
// ==============================

export type DaysContainerProps = CommonProps &
  PropsWithChildren & {
    innerProps?: Omit<ComponentPropsWithoutRef<"div">, "children">;
  };

export const DaysContainer = (props: DaysContainerProps) => {
  const { getClassNames, children, innerProps } = props;
  const { className = "", ...restInner } = innerProps ?? {};

  return (
    <div
      role="listbox"
      className={getClassNames("DaysContainer", className)}
      {...restInner}
    >
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
    innerProps?: Omit<ComponentPropsWithoutRef<"div">, "children" | "onClick"> & {
      onClick: ClickDayHandler;
    };
  };

export const DayContainer = (props: DayContainerProps) => {
  const { date, state, innerProps, children, getClassNames, options } = props;
  const { onClick, className = "", ...restInner } = innerProps ?? {};

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
      className={getClassNames("DayContainer", className)}
      onClick={() => onClick && onClick(date, state)}
      {...attributes}
      {...restInner}
    >
      {children}
    </div>
  );
};

import React, { ComponentPropsWithoutRef } from "react";
import { CalendarDayState, CommonProps } from "../types";

export type DayTodayProps = CommonProps & {
  date: Date;
  state: CalendarDayState;
  innerProps?: ComponentPropsWithoutRef<"div">;
};

export const DayToday = (props: DayTodayProps) => {
  const { innerProps, state, getClassNames } = props;
  const { className = "", ...restInner } = innerProps ?? {};

  if (!state.isToday) return null;

  return <div className={getClassNames("DayToday", className)} {...restInner} />;
};

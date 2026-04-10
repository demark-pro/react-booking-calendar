import React, { ComponentPropsWithoutRef } from "react";
import { CalendarDayState, CommonProps } from "../types";

export type DayReservationProps = CommonProps & {
  date: Date;
  state: CalendarDayState;
  innerProps?: ComponentPropsWithoutRef<"div">;
};

export const DayReservation = (props: DayReservationProps) => {
  const { innerProps, state, getClassNames } = props;
  const { className = "", ...restInner } = innerProps ?? {};

  if (!isShow(state)) return null;

  return (
    <div
      className={getClassNames("DayReservation", className)}
      {...restInner}
    />
  );
};

const isShow = (state: CalendarDayState) =>
  state.isReserved || state.isReservedStart || state.isReservedEnd;

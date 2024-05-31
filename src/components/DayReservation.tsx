import React, { ComponentPropsWithoutRef } from "react";
import { CalendarDayState, CommonProps } from "../types";

export type DayReservationProps = CommonProps & {
  date: Date;
  state: CalendarDayState;
  innerProps?: ComponentPropsWithoutRef<"div">;
};

export const DayReservation = (props: DayReservationProps) => {
  const { innerProps, state, getClassNames } = props;

  if (!isShow(state)) return null;

  return <div className={getClassNames("DayReservation")} {...innerProps} />;
};

const isShow = (state: CalendarDayState) =>
  state.isReserved || state.isReservedStart || state.isReservedEnd;

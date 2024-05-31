import React, { ComponentPropsWithoutRef } from "react";
import { getDayAttributes } from "../helpers";
import { CalendarDayState, CommonProps } from "../types";

export type DaySelectionProps = CommonProps & {
  date: Date;
  state: CalendarDayState;
  innerProps?: ComponentPropsWithoutRef<"div">;
};

export const DaySelection = (props: DaySelectionProps) => {
  const { innerProps, state, options, getClassNames } = props;

  if (!isShow(state)) return null;

  return (
    <div
      className={getClassNames("DaySelection")}
      {...getDayAttributes(state, options)}
      {...innerProps}
    />
  );
};

const isShow = (state: CalendarDayState) =>
  state.isSelected || state.isSelectedStart || state.isSelectedEnd;

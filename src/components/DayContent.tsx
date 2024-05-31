import React, { ComponentPropsWithoutRef, ReactNode } from "react";
import { getDayAttributes } from "../helpers";
import { CalendarDayState, CommonProps } from "../types";

export type DayContentProps = CommonProps & {
  date: Date;
  state: CalendarDayState;
  children: ReactNode;
  innerProps?: ComponentPropsWithoutRef<"div">;
};

export const DayContent = (props: DayContentProps) => {
  const { children, innerProps, state, options, getClassNames } = props;

  return (
    <div
      className={getClassNames("DayContent")}
      {...getDayAttributes(state, options)}
      {...innerProps}
    >
      {children}
    </div>
  );
};

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
  const { className = "", ...restInner } = innerProps ?? {};

  return (
    <div
      className={getClassNames("DayContent", className)}
      {...getDayAttributes(state, options)}
      {...restInner}
    >
      {children}
    </div>
  );
};

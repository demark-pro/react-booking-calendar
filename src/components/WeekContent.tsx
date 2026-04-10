import React, { ComponentPropsWithoutRef } from "react";
import {
  addDays,
  formatDate,
  isWeekend,
  startOfWeek,
} from "../utils/date.utils";
import { CommonProps } from "../types";
import { getAttributes } from "helpers";

export type WeekContentProps = CommonProps & {
  day: number;
  innerProps?: Omit<ComponentPropsWithoutRef<"div">, "children">;
};

export const WeekContent = (props: WeekContentProps) => {
  const { day, options, innerProps, getClassNames } = props;
  const { className = "", ...restInner } = innerProps ?? {};

  const startDate = startOfWeek(new Date(), options);
  const date = addDays(startDate, day);

  return (
    <div
      className={getClassNames("WeekContent", className)}
      {...getAttributes({ "data-weekend": isWeekend(date) })}
      {...restInner}
    >
      {formatDate(date, { weekday: "short" }, options)}
    </div>
  );
};

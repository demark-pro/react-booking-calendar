import React, { ComponentPropsWithoutRef } from "react";
import { getAttributes } from "../helpers";
import { CommonProps } from "../types";
import { formatDate, isSameMonth, isSameYear } from "../utils/date.utils";

export type MonthContentProps = CommonProps & {
  month: number;
  year: number;
  innerProps?: ComponentPropsWithoutRef<"div"> & { isScrollable?: boolean };
};

export const MonthContent = (props: MonthContentProps) => {
  const { year, month, options, innerProps, getClassNames } = props;
  const { isScrollable, ...restInner } = innerProps ?? {};

  const date = new Date(year, month);
  const monthContent = formatDate(date, { month: "long" }, options);

  const attributes = getAttributes({
    "data-some-month": isSameMonth(date, new Date()),
    "data-some-year": isSameYear(date, new Date()),
  });

  return (
    <div
      className={getClassNames("MonthContent")}
      {...attributes}
      {...restInner}
    >
      <span>{monthContent}</span>
      <span>{year}</span>
    </div>
  );
};

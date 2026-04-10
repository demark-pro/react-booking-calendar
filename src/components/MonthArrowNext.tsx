import React, { ComponentPropsWithoutRef } from "react";
import { CommonProps } from "../types";
import { formatMonthYear } from "../utils/date.utils";

export type MonthArrowNextProps = CommonProps & {
  month?: number;
  year?: number;
  innerProps?: Omit<ComponentPropsWithoutRef<"button">, "children" | "onClick"> & {
    onClick: () => void;
  };
};

export const MonthArrowNext = (props: MonthArrowNextProps) => {
  const { innerProps, getClassNames, month, year, options } = props;
  const { className = "", "aria-label": ariaLabel, ...restInner } =
    innerProps ?? {};
  const label =
    ariaLabel ??
    (typeof month === "number" && typeof year === "number"
      ? formatMonthYear(new Date(year, month + 1), options)
      : "Next month");

  return (
    <button
      type="button"
      aria-label={label}
      className={getClassNames("MonthArrowNext", className)}
      {...restInner}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M14 17a1 1 0 0 1-.707-.293l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 1 1 1.414 1.414L11.414 12l3.293 3.293A1 1 0 0 1 14 17z" />
      </svg>
    </button>
  );
};

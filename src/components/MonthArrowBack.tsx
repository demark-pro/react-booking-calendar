import React from "react";
import { CommonProps } from "../types";

export type MonthArrowBackProps = CommonProps & {
  innerProps?: { onClick: () => void };
};

export type MonthArrowDirectionType = "left" | "right" | "up" | "down";

export const MonthArrowBack = (props: MonthArrowBackProps) => {
  const { innerProps, getClassNames } = props;

  return (
    <button
      type="button"
      className={getClassNames("MonthArrowBack")}
      aria-label="Previous Month"
      {...innerProps}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M14 17a1 1 0 0 1-.707-.293l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 1 1 1.414 1.414L11.414 12l3.293 3.293A1 1 0 0 1 14 17z" />
      </svg>
    </button>
  );
};

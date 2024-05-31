import React from "react";
import { CommonProps } from "../types";

export type MonthArrowNextProps = CommonProps & {
  innerProps?: { onClick: () => void };
};

export const MonthArrowNext = (props: MonthArrowNextProps) => {
  const { innerProps, getClassNames } = props;

  return (
    <button
      type="button"
      aria-label="Next Month"
      className={getClassNames("MonthArrowNext")}
      {...innerProps}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M14 17a1 1 0 0 1-.707-.293l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 1 1 1.414 1.414L11.414 12l3.293 3.293A1 1 0 0 1 14 17z" />
      </svg>
    </button>
  );
};

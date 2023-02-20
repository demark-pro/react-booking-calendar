
import { jsx, CSSObject } from "@emotion/react";
import { getStyleProps } from "../helpers";

import { DayCellProps, dayCellCSSProps } from "./DayCell";

export const dayCellContentCSS = ({
  state: {
    isToday,
    isSelectedStart,
    isSelected,
    isSelectedEnd,
    isReserved,
    isPast,
    isSameMonth,
    isDisabled,
  },
  variant,
}: dayCellCSSProps): CSSObject => ({
  zIndex: 3,
  textDecoration: isReserved && variant !== "events" ? "line-through" : "none",
  color:
    isSelectedStart || isSelectedEnd || isSelected
      ? "#ffffff"
      : isToday
      ? "#0d6efd"
      : (isReserved || isPast) && variant === "booking"
      ? "#cccccc"
      : "#424242",
});

const DayCellContent = (props: DayCellProps) => {
  const { date, children, variant, state, innerProps } = props;

  return (
    <div
      {...getStyleProps({ state, variant }, "dayCell_content", props)}
      {...innerProps}
    >
      {date.getDate()}
      {children}
    </div>
  );
};

export default DayCellContent;

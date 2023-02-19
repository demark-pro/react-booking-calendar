/** @jsx jsx */
import { jsx, CSSObject } from "@emotion/react";
import formatRelative from "date-fns/formatRelative";
import format from "date-fns/format";
import { DayState } from "../types";
import { DayCellProps } from "./DayCell";
import { getStyleProps } from "../helpers";

export const dayCellHeaderCSS = ({
  isToday,
  isSelectedStart,
  isSelected,
  isSelectedEnd,
  isReserved,
  isPast,
}: DayState): CSSObject => ({
  position: "absolute",
  left: 0,
  right: 0,
  lineHeight: "12px",
  textTransform: "capitalize",
  zIndex: 3,
  top: 6,
  fontSize: 9,
  color:
    isSelectedStart || isSelectedEnd || isSelected
      ? "#ffffff"
      : isToday
      ? "#0d6efd"
      : isReserved || isPast
      ? "#969696"
      : "#424242",
});

const DayCellHeader = (props: DayCellProps) => {
  const { children, date, state, dateFnsOptions, innerProps } = props;

  let content;
  if (state.isToday) {
    content = formatRelative(new Date(), new Date(), dateFnsOptions).split(
      " "
    )[0];
  }

  if (state.isSelectedStart || state.isSelectedEnd) {
    content = format(date, "MMM", dateFnsOptions);
  }

  return (
    <div {...getStyleProps(state, "dayCell_header", props)} {...innerProps}>
      {content}
      {children}
    </div>
  );
};

export default DayCellHeader;

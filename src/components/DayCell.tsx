import React, { ReactNode } from "react";
import { CSSObject } from "@emotion/react";
import { getStyleProps, isClickable } from "../helpers";
import { CommonPropsType, DayState, VarinatType } from "../types";

export type DayCellProps = CommonPropsType & {
  date: Date;
  state: DayState;
  children?: ReactNode;
  innerProps?: JSX.IntrinsicElements["div"];
};

export interface dayCellCSSProps {
  state: DayState;
  variant: VarinatType;
}

export const dayCellCSS = ({ variant, state }: dayCellCSSProps): CSSObject => ({
  height: 58,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  position: "relative",
  listStyle: "none",
  fontSize: 16,
  fontWeight: 400,
  textAlign: "center",
  cursor: "pointer",
  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
  width: "calc(100%/7)",
  flexBasis: "calc(100%/7)",
  borderTop: "1px solid #f7f5f5",
  "&:hover": isClickable(state, variant)
    ? {
        background: "#eef5ff",
        borderRadius: 6,
      }
    : { cursor: "default" },
});

export const dayCellSelectedCSS = ({
  isSelectedStart,
  isSelectedEnd,
}: DayState): CSSObject => ({
  position: "absolute",
  top: ".5px",
  bottom: ".5px",
  left: isSelectedStart ? "50%" : 0,
  right: isSelectedEnd ? "50%" : 0,
  backgroundColor: "#559fff",
  zIndex: 1,
});

export const dayCellSelectedEventCSS = (): CSSObject => ({
  position: "absolute",
  inset: '.5px',
  borderRadius: 6,
  backgroundColor: "#448aff",
  border: "2px solid rgb(68, 138, 255)",
  zIndex: 2,
});

const DayCell = (props: DayCellProps) => {
  const { children, state, variant, innerProps } = props;
  const { isSelected, isSelectedStart, isSelectedEnd } = state;

  return (
    <div
      {...getStyleProps({ state, variant }, "dayCell", props)}
      {...innerProps}
    >
      {children}
      {isSelectedStart && (
        <div {...getStyleProps({}, "dayCell_selectedStart", props)} />
      )}
      {isSelected && (
        <div {...getStyleProps(state, "dayCell_selected", props)} />
      )}
      {isSelectedEnd && (
        <div {...getStyleProps({}, "dayCell_selectedEnd", props)} />
      )}
    </div>
  );
};

export default DayCell;

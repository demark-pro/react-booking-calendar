import React, { SVGProps } from "react";
import { CSSObject } from "@emotion/react";
import { getStyleProps } from "../helpers";
import { CommonPropsType } from "../types";

export type MonthArrowBackProps = CommonPropsType & {
  innerProps?: SVGProps<SVGSVGElement>;
};

export type MonthArrowDirectionType = "left" | "right" | "up" | "down";

const dirRotate = { left: "0", right: "180deg", up: "90deg", down: "270deg" };
const iconColor = "#007aff";

export const monthArrowCSS = (
  direction: MonthArrowDirectionType = "left"
): CSSObject => ({
  transform: `rotate(${dirRotate[direction]})`,
  fill: iconColor,
  width: 28,
  height: 28,
  cursor: "pointer",
  userSelect: "none",
  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
  "&:hover": {
    background: "#eef5ff",
    borderRadius: "50%",
  },
});

const MonthArrowBack = (props: MonthArrowBackProps) => {
  const { innerProps } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...getStyleProps("left", "month_arrowBack", props)}
      {...innerProps}
    >
      <path
        d="M14 17a1 1 0 0 1-.707-.293l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 1 1 1.414 1.414L11.414 12l3.293 3.293A1 1 0 0 1 14 17z"
        style={{ fill: iconColor }}
      />
    </svg>
  );
};

export default MonthArrowBack;

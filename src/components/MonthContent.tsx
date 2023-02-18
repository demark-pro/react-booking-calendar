/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import { format, isSameMonth, isSameYear } from "date-fns";
import { getStyleProps } from "../helpers";
import { CommonPropsType } from "../types";

export type MonthContentProps = CommonPropsType & {
  month: number;
  year: number;
  innerProps?: JSX.IntrinsicElements["div"];
};

export const monthContentCSS = (): CSSObject => ({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  fontSize: "16px",
  fontWeight: 500,
  // color: "#007aff",
  display: "flex",
  gap: "0.25rem",
});

const MonthContent = (props: MonthContentProps) => {
  const { year, month, innerProps } = props;

  const date = new Date(year, month);
  const monthContent = format(date, "MMMM");

  return (
    <div {...getStyleProps({}, "month_content", props)} {...innerProps}>
      <span
        style={{ color: isSameMonth(date, new Date()) ? "#007aff" : "#424242" }}
      >
        {monthContent}
      </span>
      <span
        style={{ color: isSameYear(date, new Date()) ? "#007aff" : "#424242" }}
      >
        {year}
      </span>
    </div>
  );
};

export default MonthContent;

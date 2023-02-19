/** @jsx jsx */
import { jsx, CSSObject } from "@emotion/react";
import { addDays, format, isWeekend, startOfWeek } from "date-fns";
import { getStyleProps } from "../helpers";
import { WeekContainerChildProps } from "./containers";

const dayFormat = "EEEEEE";

export const weekCellCSS = (isWeekend: boolean = false): CSSObject => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  flexGrow: 0,
  flexBasis: "calc(100% / 7)",
  width: "calc(100% / 7)",
  fontSize: "10px",
  textTransform: "uppercase",
  padding: "0.5rem 0",
  fontWeight: 500,
  color: isWeekend ? "red" : "#424242",
});

const WeekCell = (props: WeekContainerChildProps) => {
  const { day, dateFnsOptions, innerProps } = props;

  const startDate = startOfWeek(new Date(), dateFnsOptions);
  const date = addDays(startDate, day);
  const isDayWeekend = isWeekend(date);

  return (
    <div {...getStyleProps(isDayWeekend, "weekCell", props)} {...innerProps}>
      {format(date, dayFormat, dateFnsOptions)}
    </div>
  );
};

export default WeekCell;

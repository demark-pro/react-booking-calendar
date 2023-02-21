import { CSSObject } from "@emotion/react";
import { ReactNode } from "react";
import { DayState } from "../types";

import isSameDay from "date-fns/isSameDay";
import startOfDay from "date-fns/startOfDay";
import format from "date-fns/format";
import { DayCellProps } from "./DayCell";
import { getStyleProps } from "../helpers";
import { getFreeTimeOfDate } from "../utils/getFreeTimeOfDate";
import { endOfDay } from "date-fns";

type Titles = {
  footerStart: string;
  footerEnd: string;
  footerReserved: string;
};

const titles: Titles = {
  footerStart: "check-in",
  footerEnd: "check-out",
  footerReserved: "booked",
};

export const dayCellFooterCSS = ({
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
  bottom: 3,
  fontSize: 8,
  color:
    isSelectedStart || isSelectedEnd || isSelected
      ? "#ffffff"
      : isToday
      ? "#0d6efd"
      : isReserved || isPast
      ? "#969696"
      : "#424242",
});

const renderVariant = {
  booking: bookingVariant,
  events: eventsVariant,
};

const DayCellFooter = (props: DayCellProps) => {
  const { children, state, variant, innerProps } = props;

  return (
    <div {...getStyleProps(state, "dayCell_footer", props)} {...innerProps}>
      {renderVariant[variant](props)}
      {children}
    </div>
  );
};

function bookingVariant({ date, reserved, state }: DayCellProps): ReactNode {
  const { isSelectedStart, isSelectedEnd, isReserved } = state;

  if (!!(isSelectedStart || isSelectedEnd)) {
    return titles[isSelectedStart ? "footerStart" : "footerEnd"];
  }
  if (isReserved) {
    return titles.footerReserved;
  }

  const freeTime = getFreeTimeOfDate(date, reserved);
  const timeFormat = "HH:mm";
  const startToFormat = format(freeTime.startDate, timeFormat);
  const endToFormat = format(freeTime.endDate, timeFormat);

  if (format(startOfDay(date), timeFormat) !== startToFormat) {
    return startToFormat;
  }

  if (format(endOfDay(date), timeFormat) !== endToFormat) {
    return endToFormat;
  }

  return;
}

function eventsVariant({ date, reserved }: DayCellProps): ReactNode {
  const reservedDay = reserved
    .filter((d) => isSameDay(d.startDate, date) || isSameDay(d.endDate, date))
    .slice(0, 3);

  if (reservedDay.length > 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <div
          className="hstack gap-1"
          style={{
            padding: "0.15rem",
            borderRadius: 12,
            display: "flex",
            gap: "2px",
          }}
        >
          {reservedDay.map((d, i) => (
            <span
              key={i}
              style={{
                background: d.color,
                height: 6,
                width: 6,
                borderRadius: "50%",
                opacity: "1",
                border: ".15px solid #fff",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return;
}

export default DayCellFooter;

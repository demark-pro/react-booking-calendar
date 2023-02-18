import { CSSObject } from "@emotion/react";
import { DayState } from "./types";
import {
  CalendarContainerCSS,
  daysContainerCSS,
  monthContainerCSS,
  weekContainerCSS,
} from "./components/containers";
import { weekCellCSS } from "./components/WeekCell";

import { dayCellContentCSS } from "./components/DayCellContent";
import { dayCellHeaderCSS } from "./components/DayCellHeader";
import { dayCellFooterCSS } from "./components/DayCellFooter";

import {
  dayCellCSS,
  dayCellCSSProps,
  dayCellSelectedCSS,
  dayCellSelectedEventCSS,
} from "./components/DayCell";
import { monthContentCSS } from "./components/MonthContent";
import { monthArrowBackCSS } from "./components/MonthArrowBack";
import { monthArrowNextCSS } from "./components/MonthArrowNext";

const MonthCSS = (): CSSObject => ({
  position: "absolute",
  textTransform: "capitalize",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  left: "50%",
  transform: "translateX(-50%)",
});

export interface StylesProps {
  calendar_container: any;
  month_container: any;
  month_content: any;
  month_arrowBack: any;
  month_arrowNext: any;
  month: any;
  week_container: any;
  weekCell: boolean;
  day_container: any;
  dayCell: dayCellCSSProps;
  dayCell_content: dayCellCSSProps;
  dayCell_header: DayState;
  dayCell_footer: DayState;
  dayCell_selectedStart: any;
  dayCell_selected: DayState;
  dayCell_selectedEnd: any;
}

export const defaultStyles: {
  [K in keyof StylesProps]: (props: StylesProps[K]) => CSSObject;
} = {
  calendar_container: CalendarContainerCSS,
  month_container: monthContainerCSS,
  month_content: monthContentCSS,
  month_arrowBack: monthArrowBackCSS,
  month_arrowNext: monthArrowNextCSS,
  month: MonthCSS,
  week_container: weekContainerCSS,
  weekCell: weekCellCSS,
  day_container: daysContainerCSS,
  dayCell: dayCellCSS,
  dayCell_content: dayCellContentCSS,
  dayCell_header: dayCellHeaderCSS,
  dayCell_footer: dayCellFooterCSS,
  dayCell_selectedStart: dayCellSelectedEventCSS,
  dayCell_selected: dayCellSelectedCSS,
  dayCell_selectedEnd: dayCellSelectedEventCSS,
};

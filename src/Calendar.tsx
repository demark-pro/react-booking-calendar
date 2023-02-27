import { format } from "date-fns";
import React, { useMemo, useState } from "react";
import { DayCellProps } from "./components/DayCell";
import { defaultComponents } from "./components/index";
import { getSelectedDates, createDays, getDayState } from "./helpers";

import { defaultStyles, StylesProps } from "./styles";

import {
  CommonPropsType,
  DateFnsOptions,
  Day,
  DayState,
  DefaultCalendarProps,
  Reserved,
  Selected,
  VarinatType,
} from "./types";
import { checkOberbooking } from "./utils/checkOberbooking";

export type CalendarProps = DefaultCalendarProps & {
  month?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  year?: number;
  onMonthChange?: (month: number, year: number) => void;
};

export const selectedInit: Selected[] = [null, null];
export const isStartInit: boolean = true;
export const dateOfStartMonthInit: Date = new Date();
export const reservedInit: Reserved[] = [];
export const variantInit: VarinatType = "booking";
export const rangeInit: boolean = false;
export const disabledInit: boolean = false;
export const dateFnsOptionsInit: DateFnsOptions = {};
export const monthInit: number = new Date().getMonth();
export const yearInit: number = new Date().getFullYear();

function Calendar(
  props: CalendarProps & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">
) {
  const {
    selected = selectedInit,
    isStart = isStartInit,
    dateOfStartMonth = dateOfStartMonthInit,
    reserved = reservedInit,
    variant = variantInit,
    dateFnsOptions = dateFnsOptionsInit,
    range = rangeInit,
    disabled = disabledInit,
    month,
    year,
    components = {},
    className = "",
    classNamePrefix,
    onOverbook,
    onChange,
    onMonthChange,
    ...innerProps
  } = props;

  const [activeMonth, setActiveMonth] = useState(monthInit);
  const [activeYear, setActiveYear] = useState(yearInit);

  const currentMonth = month && !Number.isNaN(month) ? month : activeMonth;
  const currentYear = year && !Number.isNaN(year) ? year : activeYear;

  const isControled =
    (month && !Number.isNaN(month)) || (year && !Number.isNaN(year));

  // ==============================
  // handleMonthChange
  // ==============================

  const handleChangeMonth = (value: number) => {
    let newMonth = value;
    let newYear = null;
    if (newMonth > 11) {
      newMonth = 0;
      newYear = currentYear + 1;
    }
    if (newMonth < 0) {
      newMonth = 11;
      newYear = currentYear - 1;
    }
    if (onMonthChange) {
      onMonthChange(newMonth, newYear || currentYear);

      if (isControled) return;
    }

    setActiveMonth(newMonth);
    if (newYear) setActiveYear(newYear);
  };

  // ==============================
  // handleClickDay
  // ==============================

  const handleClickDay = (day: Day, state: DayState) => {
    if (typeof disabled === "boolean" && disabled) return;

    const { date } = day;

    const { errorType, newSelected } = checkOberbooking({
      date,
      selected,
      isStart,
      reserved,
      state,
      range,
      variant,
    });

    if (errorType && !newSelected) {
      if (onOverbook) onOverbook(date, errorType);
      return;
    }

    if (newSelected && onChange) onChange(newSelected);
  };

  const [startDate, endDate] = getSelectedDates(selected);

  // ==============================
  // getClassNames
  // ==============================

  const getClassNames = (name: string) => {
    if (!classNamePrefix) return "";

    const prefix = classNamePrefix.length ? classNamePrefix + "__" : "";

    return prefix + name.replace(/_/g, "-");
  };

  // ==============================
  // getStyles
  // ==============================

  const getStyles = <Key extends keyof StylesProps>(props: any, name: Key) => {
    const base = defaultStyles[name](props as any);
    base.boxSizing = "border-box";

    return base;
  };

  // ==============================
  // commonProps
  // ==============================

  const commonProps = {
    selected: [startDate, endDate],
    reserved,
    variant,
    dateFnsOptions,
    getClassNames,
    getStyles,
  };

  // ==============================
  // Import components
  // ==============================

  const {
    CalendarContainer,
    MonthContainer,
    MonthArrowBack,
    MonthContent,
    MonthArrowNext,
    WeekContainer,
    WeekCell,
    DaysContainer,
    DayCell,
    DayCellContent,
    DayCellHeader,
    DayCellFooter,
  } = defaultComponents(components);

  // ==============================
  // renderCell
  // ==============================

  const renderCell = (day: Day): JSX.Element => {
    const { selected, reserved } = commonProps;

    const state = getDayState({ day, selected, reserved, disabled });
    const dayProps: DayCellProps & CommonPropsType = {
      date: day.date,
      state,
      ...commonProps,
    };

    return (
      <DayCell
        key={format(day.date, "dd-MM-yyyy")}
        innerProps={{ onClick: () => handleClickDay(day, state) }}
        {...dayProps}
      >
        <DayCellHeader {...dayProps} />
        <DayCellContent {...dayProps} />
        <DayCellFooter {...dayProps} />
      </DayCell>
    );
  };

  const startMonth = new Date(currentYear, currentMonth);
  const items = useMemo(
    () =>
      createDays({
        dateOfStartMonth: startMonth,
        numOfMonths: 1,
        dateFnsOptions,
        isInfinte: false,
      }),
    [startMonth, dateFnsOptions]
  );

  return (
    <CalendarContainer {...commonProps} innerProps={innerProps}>
      <MonthContainer {...commonProps}>
        <MonthArrowBack
          {...commonProps}
          innerProps={{ onClick: () => handleChangeMonth(currentMonth - 1) }}
        />
        <MonthContent
          month={currentMonth}
          year={currentYear}
          {...commonProps}
        />
        <MonthArrowNext
          {...commonProps}
          innerProps={{ onClick: () => handleChangeMonth(currentMonth + 1) }}
        />
      </MonthContainer>
      <WeekContainer {...commonProps}>{WeekCell}</WeekContainer>
      <DaysContainer {...commonProps}>
        {items.map((day) => renderCell(day))}
      </DaysContainer>
    </CalendarContainer>
  );
}

export default Calendar;

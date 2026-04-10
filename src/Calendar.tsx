import React, { useEffect, useState } from "react";
import {
  CalendarComponentsBase,
  componentClasses,
  defaultComponents,
} from "./components/index";
import {
  getSelectedDates,
  getDayState,
  isNumeric,
  createMonthDays,
  cn,
  preProtection,
} from "./helpers";

import {
  CommonProps,
  CalendarDayState,
  CalendarMonth,
  MonthChangeHandler,
  CalendarPropsBase,
  YearChangeHandler,
} from "./types";
import {
  disabledInit,
  initialDateInit,
  isStartInit,
  rangeInit,
  reservedInit,
  selectedInit,
} from "./constants";
import { getProtectedInterval } from "utils/get-protected-interval";

export type CalendarProps = CalendarPropsBase & {
  initialDate?: Date | number | null;
  month?: CalendarMonth;
  year?: number;
  onMonthChange?: MonthChangeHandler;
  onYearChange?: YearChangeHandler;
};

export function Calendar(props: CalendarProps): JSX.Element {
  const {
    selected = selectedInit,
    isStart = isStartInit,
    initialDate = initialDateInit,
    reserved = reservedInit,
    range = rangeInit,
    protection = true,
    disabled = disabledInit,
    month,
    year,
    components = {},
    classNames = {},
    options = {},
    onOverbook,
    onChange,
    onMonthChange,
    onYearChange,
    ...innerProps
  } = props;

  const defaultDate = initialDate ? new Date(initialDate) : initialDateInit;
  const initialMonth = (
    isNumeric(month) ? month : defaultDate.getMonth()
  ) as CalendarMonth;
  const initialYear = isNumeric(year) ? year : defaultDate.getFullYear();

  const [activeMonth, setActiveMonth] = useState<CalendarMonth>(
    initialMonth
  );
  const [activeYear, setActiveYear] = useState<number>(initialYear);

  const isMonthControlled = isNumeric(month);
  const isYearControlled = isNumeric(year);
  const isControled = isMonthControlled && isYearControlled;

  useEffect(() => {
    if (isMonthControlled) setActiveMonth(month!);
  }, [isMonthControlled, month]);

  useEffect(() => {
    if (isYearControlled) setActiveYear(year!);
  }, [isYearControlled, year]);

  const currentMonth: CalendarMonth = isControled ? month! : activeMonth;
  const currentYear: number = isControled ? year! : activeYear;

  const [startDate, endDate] = getSelectedDates(selected);

  // ==============================
  // getClassNames
  // ==============================

  const getClassNames = <Key extends keyof CalendarComponentsBase>(
    name: Key,
    classes?: string
  ) => {
    const defaultClass = `calendar__${componentClasses[name]}`;
    const propsClasses = classNames[name];

    return cn(defaultClass, propsClasses, classes);
  };

  // ==============================
  // commonProps
  // ==============================

  const commonProps: CommonProps = {
    selected: [startDate, endDate],
    reserved,
    disabled,
    protection,
    range,
    isStart,
    options,
    getClassNames,
  };

  // ==============================
  // handleMonthChange
  // ==============================

  const handleChangeMonth = (value: CalendarMonth) => {
    const [newMonth, newYear] = getMonthYear(value, currentYear);

    if (onMonthChange) onMonthChange(newMonth, newYear ?? currentYear);
    if (newYear !== null && onYearChange) onYearChange(newYear);
    if (isControled) return;

    setActiveMonth(newMonth);
    if (newYear !== null) setActiveYear(newYear);
  };

  // ==============================
  // handleClickDay
  // ==============================

  const handleClickDay = (date: Date, state: CalendarDayState) => {
    const preSelected = preProtection(date, state, commonProps);

    if (preSelected !== null) {
      if (onChange) onChange(preSelected);

      return;
    }

    const { interval, overbookType } = getProtectedInterval(
      date,
      state,
      commonProps
    );

    if (overbookType && !interval) {
      if (onOverbook) onOverbook(date, overbookType);
      return;
    }

    if (interval && onChange) onChange(interval);
    return;
  };

  // ==============================
  // Import components
  // ==============================

  const {
    CalendarContainer,
    MonthContainer,
    MonthArrowBack,
    MonthArrowNext,
    MonthContent,
    WeekContainer,
    WeekContent,
    DaysContainer,
    DayContainer,
    DayContent,
    DaySelection,
    DayReservation,
    DayToday,
  } = defaultComponents(components);

  const startMonth = new Date(currentYear, currentMonth);
  const days = createMonthDays({ dateOfMonth: startMonth, options });

  return (
    <CalendarContainer {...commonProps} innerProps={{ ...innerProps }}>
      <MonthContainer {...commonProps}>
        <MonthArrowBack
          {...commonProps}
          innerProps={{
            onClick: () =>
              handleChangeMonth((currentMonth - 1) as CalendarMonth),
          }}
        />

        <MonthContent
          month={currentMonth}
          year={currentYear}
          {...commonProps}
        />

        <MonthArrowNext
          {...commonProps}
          innerProps={{
            onClick: () =>
              handleChangeMonth((currentMonth + 1) as CalendarMonth),
          }}
        />
      </MonthContainer>
      <WeekContainer {...commonProps}>
        {Array.from({ length: 7 }).map((_, key) => (
          <WeekContent
            key={`calendar_week_container_${key}`}
            day={key}
            {...commonProps}
            innerProps={{}}
          />
        ))}
      </WeekContainer>
      <DaysContainer {...commonProps}>
        {days.map((day, key) => {
          const dayProps = {
            date: day.date,
            state: getDayState({ day, selected, reserved, disabled }),
          };

          return (
            <DayContainer
              key={`calendar_day_container_${key}`}
              innerProps={{ onClick: handleClickDay }}
              {...dayProps}
              {...commonProps}
            >
              <DayContent {...dayProps} {...commonProps}>
                {day.date.getDate()}
              </DayContent>
              <DayToday {...dayProps} {...commonProps} />
              <DaySelection {...dayProps} {...commonProps} />
              <DayReservation {...dayProps} {...commonProps} />
            </DayContainer>
          );
        })}
      </DaysContainer>
    </CalendarContainer>
  );
}

const getMonthYear = (
  newMonth: CalendarMonth,
  year: number
): [CalendarMonth, number | null] => {
  let month = newMonth;
  let newYear = null;

  if (newMonth > 11) {
    month = 0;
    newYear = year + 1;
  }
  if (newMonth < 0) {
    month = 11;
    newYear = year - 1;
  }

  return [month, newYear];
};

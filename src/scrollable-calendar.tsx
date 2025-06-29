import React from "react";
import {
  FixedSizeGrid,
  GridChildComponentProps,
  GridOnScrollProps,
  areEqual,
} from "react-window";
import {
  CalendarComponentsBase,
  componentClasses,
  defaultComponents,
} from "./components";
import {
  CalendarChangeHandler,
  CalendarDate,
  CalendarPropsBase,
  CommonProps,
  CalendarDay,
  OverbookHandler,
} from "./types";

import {
  disabledInit,
  isStartInit,
  rangeInit,
  reservedInit,
  selectedInit,
} from "./constants";
import {
  cn,
  createScrollableDays,
  getDayState,
  getSelectedDates,
  preProtection,
} from "./helpers";

import AutoSizer from "react-virtualized-auto-sizer";
import { memo, useEffect } from "react";
import { formatDate, isSameDay } from "./utils/date.utils";
import { getProtectedInterval } from "utils/get-protected-interval";

export type ScrollableCalendarInitialScroll = CalendarDate | null;

export type ScrollableCalendarProps = CalendarPropsBase & {
  startMonth?: CalendarDate;
  monthsCount?: number;
  colHeight?: number;
  initialScroll?: ScrollableCalendarInitialScroll;
  onScroll?: (e: GridOnScrollProps) => void;
};

// ==============================
// Cell
// ==============================

const Cell = memo(
  ({
    columnIndex,
    rowIndex,
    style,
    data,
  }: GridChildComponentProps<{
    days: CalendarDay[];
    commonProps: CommonProps;
    components: CalendarComponentsBase;
    isStart: boolean;
    range: boolean;
    onOverbook?: OverbookHandler;
    onChange?: CalendarChangeHandler;
  }>) => {
    const { days, components, commonProps, onChange, onOverbook } = data;
    const { selected, reserved, disabled } = commonProps;

    const {
      MonthContainer,
      MonthContent,
      DayContainer,
      DayContent,
      DayToday,
      DaySelection,
      DayReservation,
    } = components;

    const dayIndex = rowIndex * 7 + columnIndex;
    const day = days[dayIndex];

    if (!day) return null;

    const { date } = day;

    const state = getDayState({ day, selected, reserved, disabled });

    const handleClickDay = () => {
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
    };

    if (day.isMonthRow) {
      if (columnIndex !== 3) return null;

      return (
        <MonthContainer {...commonProps} innerProps={{ style }}>
          <MonthContent
            month={day.date.getMonth()}
            year={day.date.getFullYear()}
            {...commonProps}
            innerProps={{ isScrollable: true }}
          />
        </MonthContainer>
      );
    }

    const dayProps = { date: day.date, state };

    return (
      <DayContainer
        innerProps={{ style, onClick: handleClickDay }}
        {...dayProps}
        {...commonProps}
      >
        {state.isSameMonth && (
          <>
            <DayContent {...dayProps} {...commonProps}>
              {formatDate(day.date, { day: "numeric" })}
            </DayContent>
            <DayToday {...dayProps} state={state} {...commonProps} />
            <DaySelection {...dayProps} state={state} {...commonProps} />
            <DayReservation {...dayProps} state={state} {...commonProps} />
          </>
        )}
      </DayContainer>
    );
  },
  areEqual
);

// ==============================
// Grid
// ==============================

type GridProps = {
  width: number;
  height: number;
  items: Array<CalendarDay>;
  colHeight: number;
  initialScroll?: ScrollableCalendarInitialScroll;
  components: CalendarComponentsBase;
  commonProps: CommonProps;
  isStart: boolean;
  range: boolean;
  onOverbook?: OverbookHandler;
  onScroll?: (e: GridOnScrollProps) => void;
  onChange?: CalendarChangeHandler;
};

const Grid = ({
  width,
  height,
  colHeight,
  items,
  initialScroll,
  components,
  commonProps,
  isStart,
  range,
  onOverbook,
  onScroll,
  onChange,
  ...props
}: GridProps) => {
  useEffect(() => { }, [items, initialScroll]);

  return (
    <FixedSizeGrid
      height={height}
      width={width}
      columnCount={7}
      columnWidth={width / 7}
      rowCount={items.length / 7}
      rowHeight={colHeight}
      overscanRowCount={4}
      initialScrollTop={getInitialScroll(colHeight, items, initialScroll)}
      itemData={{
        days: items,
        commonProps,
        components,
        isStart,
        range,
        onOverbook,
        onChange,
      }}
      onScroll={onScroll}
      {...props}
    >
      {Cell}
    </FixedSizeGrid>
  );
};

export const ScrollableCalendar = (props: ScrollableCalendarProps) => {
  const {
    startMonth = new Date(),
    selected = selectedInit,
    reserved = reservedInit,
    components = {},
    classNames = {},
    isStart = isStartInit,
    range = rangeInit,
    disabled = disabledInit,
    protection = false,
    initialScroll,
    monthsCount = 6,
    colHeight = 55,
    options = {},
    onOverbook,
    onChange,
    onScroll,
    ...innerProps
  } = props;

  const [startDate, endDate] = getSelectedDates(selected);

  // ==============================
  // getClassNames
  // ==============================

  const getClassNames = <Key extends keyof CalendarComponentsBase>(
    compName: Key,
    classes?: string
  ) => {
    const defaultClass = `calendar__${componentClasses[compName]}`;
    const propsClasses = classNames[compName];
    return cn(defaultClass, propsClasses, classes);
  };

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

  const calendarComponents = defaultComponents(components);
  const { CalendarContainer, WeekContainer, WeekContent, DaysContainer } =
    calendarComponents;

  const items = createScrollableDays({
    dateOfMonth: startMonth,
    monthsCount,
    options,
  });

  return (
    <CalendarContainer
      {...commonProps}
      innerProps={{ ...innerProps, isScrollable: true }}
    >
      <WeekContainer innerProps={{}} {...commonProps}>
        {Array.from({ length: 7 }).map((_, key) => (
          <WeekContent
            key={`scrollable_calendar_week_container_${key}`}
            day={key}
            {...commonProps}
            innerProps={{}}
          />
        ))}
      </WeekContainer>
      <DaysContainer {...commonProps}>
        <AutoSizer>
          {({ height, width }: { height: number; width: number }) => (
            <Grid
              height={height}
              width={width}
              items={items}
              colHeight={colHeight}
              initialScroll={initialScroll}
              components={calendarComponents}
              commonProps={commonProps}
              isStart={isStart}
              range={range}
              onScroll={onScroll}
              onOverbook={onOverbook}
              onChange={onChange}
            />
          )}
        </AutoSizer>
      </DaysContainer>
    </CalendarContainer>
  );
};

const getInitialScroll = (
  colHeight: number,
  days?: CalendarDay[],
  initialScroll?: ScrollableCalendarInitialScroll
): number | undefined => {
  if (!days || days.length === 0 || !initialScroll) return;
  let rows = 0;

  for (let key in days) {
    const day = days[key];

    if (+key !== 0 && +key % 7 === 0) rows++;

    if (isSameDay(day!.date, initialScroll)) {
      if (day!.date.getDate() === 1) rows--;
      break;
    }
  }

  return rows * colHeight;
};

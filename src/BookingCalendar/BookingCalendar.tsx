import React from "react";

import {
  addDays,
  startOfWeek,
  format,
  startOfMonth,
  differenceInCalendarWeeks,
  differenceInCalendarMonths,
  isBefore,
  startOfDay,
  isSameDay,
  addWeeks,
  formatRelative,
} from "date-fns";
import { ru } from "date-fns/locale";
import { FixedSizeGrid, GridChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import styles from "./BookingCalendar.module.css";
import { createDays, isBetween, isBetweenInterval } from "../helpers";
import { CSSProperties, useEffect, useMemo, useRef } from "react";
import { getSelectedTime } from "../utils/getSelectedTime";

export interface Reserved {
  startDate: Date | number;
  endDate: Date | number;
}

export interface DayInfo {
  day: Date;
  monthStart: Date;
  isWeekend?: boolean;
  isCurrentMonth?: boolean;
  isCurrentYear?: boolean;
  isToday?: boolean;
  isPast?: boolean;
  isReserved?: boolean;
  reservedStart?: Date | number | null;
  reservedEnd?: Date | number | null;
}

export interface Titles {
  dayFooterStart: string;
  dayFooterEnd: string;
}

export interface GetReservedInfoOfDate {
  reserved: boolean;
  startDate: Date | number;
  endDate: Date | number;
}

export type BookingCalendarProps = {
  selectedStart: Date | number | null;
  selectedEnd: Date | number | null;
  isStart?: boolean;
  dateOfStartMonth?: Date | number;
  numOfMonth?: number;
  overscanWeekCount?: number;
  colHeight?: number;
  reserved?: Array<Reserved>;
  titles?: Titles;
  disabled?: boolean;
  scrollToDate?: Date | number | null;
  onChange?: (e: Date | number) => void;
};

export type BookingCalendarGrid = {
  dateOfStartMonth: Date | number;
  overscanWeekCount: number;
  width: number;
  height: number;
  items: Array<Object>;
  colHeight: number;
  scrollToDate?: Date | number | null;
  selectedStart: Date | number | null;
  selectedEnd: Date | number | null;
  titles: Titles;
  handleClickDay: (e: DayInfo) => void;
};

export type RenderDayProps = {
  dayInfo: DayInfo;
  selectedStart: Date | number | null;
  selectedEnd: Date | number | null;
  titles: Titles;
  handleClickDay: (e: DayInfo) => void;
  style: CSSProperties;
};

const titlesInit = {
  dayFooterStart: "check-in",
  dayFooterEnd: "exit",
};

const renderDay = ({
  dayInfo,
  selectedStart,
  selectedEnd,
  titles,
  handleClickDay,
  style,
}: RenderDayProps): JSX.Element => {
  const {
    day,
    isCurrentMonth,
    isReserved,
    isToday,
    isPast,
    monthStart,
    isCurrentYear,
    reservedStart,
    reservedEnd,
  } = dayInfo;

  // empty col
  if (!isCurrentMonth) {
    return (
      <div
        key={format(day, "dd-MM-yyyy-empty")}
        className={styles.empty_day}
        style={style}
      />
    );
  }

  const isSelectedStart = selectedStart
    ? isSameDay(day, selectedStart)
    : undefined;
  const isSelectedEnd = selectedEnd ? isSameDay(day, selectedEnd) : undefined;
  const isSelected =
    selectedStart &&
    selectedEnd &&
    isBetween(day, selectedStart, selectedEnd, "{}");

  const onClickDay = () => handleClickDay(dayInfo);

  const dayClassNames: string[] = [styles.day_col];
  if (isReserved) dayClassNames.push(styles.reserved);
  if (isToday) dayClassNames.push(styles.today);
  if (isPast) dayClassNames.push(styles.past);
  if (isSelected) dayClassNames.push(styles.selected);
  if (isSelectedStart) dayClassNames.push(styles.selected_start);
  if (isSelectedEnd) dayClassNames.push(styles.selected_end);

  let dayHeader;
  const footerClassNames = [styles.day_col_footer];

  if (isToday || isSelectedStart || isSelectedEnd) {
    dayHeader = (
      <span className={styles.day_col_header}>
        {isSelectedStart || isSelectedEnd
          ? format(day, "MMM", { locale: ru })
          : formatRelative(new Date(), new Date(), { locale: ru }).split(
              " "
            )[0]}
      </span>
    );
  }

  const reservedDate = reservedStart || reservedEnd;
  let footerText: string = "";

  if (isReserved) footerText = "бронь";

  if (isSelectedStart || isSelectedEnd) {
    footerText = isSelectedStart ? titles.dayFooterStart : titles.dayFooterEnd;
  }

  if (reservedDate) {
    footerClassNames.push(styles.text_normal);
    footerText = `c ${format(reservedDate, "HH:mm")}`;
  }

  return (
    <div
      key={format(day, "dd-MM-yyyy")}
      className={dayClassNames.join(" ")}
      style={style}
      onClick={onClickDay}
    >
      {isSameDay(day, monthStart) && (
        <div
          className={styles.month}
          style={{ top: isCurrentYear ? "-30px" : "-50px" }}
        >
          <span style={{ fontWeight: 600, color: "#000!important" }}>
            {format(monthStart, "LLL", { locale: ru })}
          </span>
          <small>{!isCurrentYear && format(monthStart, "yyyy")}</small>
        </div>
      )}
      {dayHeader && dayHeader}
      <span className={styles.day_col_date}>{format(day, "d")}</span>
      <span className={footerClassNames.join(" ")}>{footerText}</span>
      {(isSelectedStart || isSelectedEnd) && (
        <div className={styles.selected_event} />
      )}
      {isSelected && (
        <div
          className={styles.selected_between}
          style={{
            left: isSelectedStart ? "50%" : 0,
            right: isSelectedEnd ? "50%" : 0,
          }}
        />
      )}
    </div>
  );
};

const Grid = ({
  dateOfStartMonth,
  overscanWeekCount,
  selectedStart,
  selectedEnd,
  titles,
  width,
  height,
  items,
  colHeight,
  scrollToDate,
  handleClickDay,
}: BookingCalendarGrid) => {
  const listRef = useRef<FixedSizeGrid>(null);

  const calculateScroll = useMemo(() => {
    if (!scrollToDate) return 0;

    return (
      differenceInCalendarWeeks(scrollToDate, startOfMonth(dateOfStartMonth)) +
      differenceInCalendarMonths(scrollToDate, startOfMonth(dateOfStartMonth)) +
      1
    );
  }, [scrollToDate]);

  useEffect(() => {
    listRef?.current?.scrollToItem({
      align: "start",
      rowIndex: calculateScroll,
    });
  }, [scrollToDate]);

  const createDay = ({
    columnIndex,
    rowIndex,
    data,
    style,
  }: GridChildComponentProps) => {
    const index = 7 * rowIndex + columnIndex;
    const dayInfo = data[index];

    return renderDay({
      dayInfo,
      selectedStart,
      selectedEnd,
      titles,
      handleClickDay,
      style,
    });
  };

  const calcWeekWithMonths = useMemo(
    () =>
      overscanWeekCount +
      differenceInCalendarMonths(
        dateOfStartMonth,
        addWeeks(dateOfStartMonth, overscanWeekCount)
      ) +
      2,
    [overscanWeekCount]
  );

  return (
    <FixedSizeGrid
      ref={listRef}
      itemData={items}
      columnCount={7}
      columnWidth={width / 7}
      height={height}
      rowCount={items.length / 7}
      rowHeight={colHeight}
      width={width}
      className={styles.grid}
      overscanRowCount={calcWeekWithMonths}
      // onItemsRendered={(e) =>
      //   console.log(addWeeks(dateOfStartMonth, e.overscanRowStartIndex))
      // }
      // onScroll={(e) => console.log(e)}
    >
      {createDay}
    </FixedSizeGrid>
  );
};

const BookingCalendar = ({
  selectedStart,
  selectedEnd,
  isStart = true,
  dateOfStartMonth = new Date(),
  numOfMonth = 12,
  overscanWeekCount = 4,
  colHeight = 55,
  reserved = [],
  titles = titlesInit,
  disabled = false,
  scrollToDate,
  onChange,
  ...props
}: BookingCalendarProps) => {
  const renderWeeks = () => {
    const dateFormat = "EEEEEE";
    const weeks = [];
    let startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      weeks.push(
        <div
          key={i}
          className={styles.week_col}
          style={{ color: i > 4 ? "red" : "#424242" }}
        >
          {format(addDays(startDate, i), dateFormat, { locale: ru })}
        </div>
      );
    }

    return <div className={styles.week_row}>{weeks}</div>;
  };

  const handleClickDay = (dayInfo: DayInfo) => {
    const { day, isReserved, isPast } = dayInfo;
    if (isReserved || isPast || disabled) return;

    if (!isStart && selectedStart && isBefore(day, selectedStart)) return;
    const isReservedBetween =
      selectedStart &&
      !!reserved.find((r) =>
        isBetweenInterval(
          r.startDate,
          r.endDate,
          selectedStart,
          startOfDay(day)
        )
      );
    if (isReservedBetween) return;

    const newSelected = getSelectedTime(day, reserved, selectedStart);
    if (onChange && newSelected) onChange(newSelected);
  };

  return (
    <div className={styles.calendar} {...props}>
      {renderWeeks()}
      <AutoSizer>
        {({ height, width }) => (
          <Grid
            dateOfStartMonth={dateOfStartMonth}
            overscanWeekCount={overscanWeekCount}
            height={height}
            width={width}
            items={createDays(dateOfStartMonth, numOfMonth, reserved)}
            colHeight={colHeight}
            selectedStart={selectedStart}
            selectedEnd={selectedEnd}
            titles={titles}
            scrollToDate={scrollToDate}
            handleClickDay={handleClickDay}
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default BookingCalendar;

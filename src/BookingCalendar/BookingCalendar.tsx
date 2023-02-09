import React, { memo, useState, useEffect, useMemo, useRef } from "react";

import isSameDay from "date-fns/isSameDay";
import isBefore from "date-fns/isBefore";
import format from "date-fns/format";
import differenceInCalendarWeeks from "date-fns/differenceInCalendarWeeks";
import differenceInCalendarMonths from "date-fns/differenceInCalendarMonths";
import startOfDay from "date-fns/startOfDay";
import addWeeks from "date-fns/addWeeks";
import formatRelative from "date-fns/formatRelative";
import startOfMonth from "date-fns/startOfMonth";
import startOfWeek from "date-fns/startOfWeek";
import addDays from "date-fns/addDays";

import { areEqual, FixedSizeGrid, GridChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { createDays, isBetween, isBetweenInterval } from "../helpers";
import { getSelectedTime } from "../utils/getSelectedTime";
import {
  BookingCalendarProps,
  GridProps,
  DateFnsOptions,
  DayInfo,
  Reserved,
  CellProps,
  Titles,
} from "../types";

import styles from "./BookingCalendar.module.css";

const PAST = "PAST";
const BOOKED = "BOOKED";
const BEFORE_START = "BEFORE_START";
const AFTER_END = "AFTER_END";
const BOOKED_BETWEEN = "BOOKED_BETWEEN";

const titlesInit: Titles = {
  dayFooterStart: "check-in",
  dayFooterEnd: "exit",
  reservedFooter: "booked",
};

const dateFnsOptionsInit: DateFnsOptions = {
  weekStartsOn: 1,
};

function checkOberbooking(
  dayInfo: DayInfo,
  selectedDates: Array<Date | number | null>,
  isStart: boolean,
  reserved: Reserved[]
): string | null {
  const [selectedStart, selectedEnd] = selectedDates;
  const { day, isReserved, isPast } = dayInfo;

  if (isPast) return PAST;

  if (isReserved) return BOOKED;

  if (!isStart && selectedStart && isBefore(day, selectedStart))
    return BEFORE_START;

  if (isStart && !selectedStart && selectedEnd && isBefore(selectedEnd, day))
    return AFTER_END;

  const isReservedBetween =
    selectedStart &&
    !!reserved.find((r) =>
      isBetweenInterval(r.startDate, r.endDate, selectedStart, startOfDay(day))
    );
  if (isReservedBetween) return BOOKED_BETWEEN;

  return null;
}

const Cell = memo(
  ({
    renderDay,
    ...props
  }: GridChildComponentProps & CellProps): JSX.Element => {
    if (renderDay) return renderDay(props);

    const {
      selectedStart,
      selectedEnd,
      titles,
      dateFnsOptions,
      handleClickDay,
      columnIndex,
      rowIndex,
      data,
      style,
    } = props;

    const index = 7 * rowIndex + columnIndex;
    const dayInfo = data[index];

    const {
      day,
      dayText,
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
            ? format(day, "MMM", dateFnsOptions)
            : formatRelative(new Date(), new Date(), dateFnsOptions).split(
                " "
              )[0]}
        </span>
      );
    }

    const reservedDate = reservedStart || reservedEnd;
    let footerText: string | JSX.Element = "";

    if (isReserved) footerText = titles.reservedFooter;

    if (isSelectedStart || isSelectedEnd) {
      footerText = isSelectedStart
        ? titles.dayFooterStart
        : titles.dayFooterEnd;
    }

    if (reservedDate) {
      footerText = format(reservedDate, "HH:mm");
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
              {format(monthStart, "LLL", dateFnsOptions)}
            </span>
            <small>{!isCurrentYear && format(monthStart, "yyyy")}</small>
          </div>
        )}
        {dayHeader && dayHeader}
        <span className={styles.day_col_date}>{dayText}</span>
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
  },
  areEqual
);

function Grid({
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
  dateFnsOptions,
  renderDay,
  handleClickDay,
}: GridProps) {
  const listRef = useRef<FixedSizeGrid>(null);

  useEffect(() => {
    if (!scrollToDate) return;

    const diffWeeks = differenceInCalendarWeeks(
      scrollToDate,
      startOfMonth(dateOfStartMonth)
    );
    const diffMonths =
      differenceInCalendarMonths(scrollToDate, startOfMonth(dateOfStartMonth)) *
      2;

    listRef?.current?.scrollToItem({
      align: "start",
      rowIndex: diffWeeks + diffMonths,
    });
  }, [scrollToDate]);

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
    >
      {(props) => (
        <Cell
          selectedStart={selectedStart}
          selectedEnd={selectedEnd}
          titles={titles}
          dateFnsOptions={dateFnsOptions}
          renderDay={renderDay}
          handleClickDay={handleClickDay}
          {...props}
        />
      )}
    </FixedSizeGrid>
  );
}

function BookingCalendar({
  selectedStart = null,
  selectedEnd = null,
  isStart = true,
  dateOfStartMonth = new Date(),
  numOfMonths = 12,
  overscanWeekCount = 4,
  colHeight = 55,
  reserved = [],
  titles = titlesInit,
  disabled = false,
  scrollToDate = null,
  dateFnsOptions = dateFnsOptionsInit,
  rangeMode = false,
  renderDay,
  onOverbook,
  onChange,
  onChangeRange,
  className = "",
  ...props
}: BookingCalendarProps) {
  const weekHeight = colHeight / 2;
  const startMonth = format(dateOfStartMonth, "yyyy-MM");

  const [selectedDates, setSelectedDates] = useState<
    Array<Date | number | null>
  >([null, null]);
  const [startDate, endDate] = selectedDates;

  useEffect(() => {
    setSelectedDates([selectedStart, selectedEnd]);
  }, [selectedStart, selectedEnd]);

  const renderWeeks = () => {
    const dateFormat = "EEEEEE";
    const weeks = [];
    let startDate = startOfWeek(new Date(), dateFnsOptions);
    for (let i = 0; i < 7; i++) {
      weeks.push(
        <div
          key={i}
          className={styles.week_col}
          style={{ color: i > 4 ? "red" : "#424242" }}
        >
          {format(addDays(startDate, i), dateFormat, dateFnsOptions)}
        </div>
      );
    }

    return (
      <div className={styles.week_row} style={{ height: weekHeight }}>
        {weeks}
      </div>
    );
  };

  const handleClickDay = (dayInfo: DayInfo) => {
    if (disabled) return;
    const { day } = dayInfo;

    const overbookError = checkOberbooking(
      dayInfo,
      selectedDates,
      rangeMode ? !startDate : isStart,
      reserved
    );

    if (rangeMode) {
      if ((!startDate && !endDate) || (startDate && endDate)) {
        if (overbookError !== BOOKED) {
          setSelectedDates([day, null]);
          return;
        }
      }
    }

    if (overbookError) {
      if (rangeMode) {
        if (
          overbookError === BOOKED_BETWEEN ||
          overbookError === BEFORE_START
        ) {
          setSelectedDates([day, null]);
          return;
        }
      }

      if (onOverbook) onOverbook(day, overbookError);
      return;
    }

    const dayWithTime = getSelectedTime(day, reserved, startDate);

    if (rangeMode) {
      if (onChangeRange) {
        onChangeRange([startDate || dayWithTime, endDate || dayWithTime]);
      }
      return;
    }

    if (onChange && dayWithTime) onChange(dayWithTime);
  };

  const items = useMemo(
    () => createDays(dateOfStartMonth, numOfMonths, reserved),
    [startMonth, numOfMonths, reserved]
  );

  return (
    <div className={styles.calendar + " " + className} {...props}>
      {renderWeeks()}
      <AutoSizer>
        {({ height, width }) => (
          <Grid
            dateOfStartMonth={dateOfStartMonth}
            overscanWeekCount={overscanWeekCount}
            height={height - weekHeight}
            width={width}
            items={items}
            colHeight={colHeight}
            selectedStart={startDate}
            selectedEnd={endDate}
            titles={titles}
            scrollToDate={scrollToDate}
            dateFnsOptions={dateFnsOptions}
            renderDay={renderDay}
            handleClickDay={handleClickDay}
          />
        )}
      </AutoSizer>
    </div>
  );
}

export default BookingCalendar;

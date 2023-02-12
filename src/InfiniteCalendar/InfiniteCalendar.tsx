import React, {
  memo,
  useState,
  useEffect,
  useMemo,
  useRef,
  createContext,
  useContext,
} from "react";

import isBefore from "date-fns/isBefore";
import format from "date-fns/format";
import differenceInCalendarWeeks from "date-fns/differenceInCalendarWeeks";
import differenceInCalendarMonths from "date-fns/differenceInCalendarMonths";
import startOfDay from "date-fns/startOfDay";
import addWeeks from "date-fns/addWeeks";
import startOfMonth from "date-fns/startOfMonth";
import startOfWeek from "date-fns/startOfWeek";
import addDays from "date-fns/addDays";
import formatRelative from "date-fns/formatRelative";
import isSameDay from "date-fns/isSameDay";
import isSameYear from "date-fns/isSameYear";

import { areEqual, FixedSizeGrid, GridChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { createDays, isBetween, isBetweenInterval } from "../helpers";
import { getSelectedTime } from "../utils/getSelectedTime";
import {
  CalendarContextProps,
  InfiniteCalendarProps,
  GridProps,
  DateFnsOptions,
  DayInfo,
  Reserved,
  Titles,
  DayInfoFooter,
  DayInfoHeader,
  DayInfoMonth,
} from "../types";

import styles from "./InfiniteCalendar.module.css";

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

const CalendarContext = createContext<CalendarContextProps>({
  selectedDates: [null, null],
  dateFnsOptions: dateFnsOptionsInit,
  titles: titlesInit,
  handleClickDay: () => {},
});

function checkOberbooking(
  day: DayInfo,
  selectedDates: Array<Date | number | null>,
  isStart: boolean,
  reserved: Reserved[]
): string | null {
  const [selectedStart, selectedEnd] = selectedDates;
  const { date, isReserved, isPast } = day;

  if (isPast) return PAST;

  if (isReserved) return BOOKED;

  if (!isStart && selectedStart && isBefore(date, selectedStart))
    return BEFORE_START;

  if (isStart && !selectedStart && selectedEnd && isBefore(selectedEnd, date))
    return AFTER_END;

  const isReservedBetween =
    selectedStart &&
    !!reserved.find((r) =>
      isBetweenInterval(r.startDate, r.endDate, selectedStart, startOfDay(date))
    );
  if (isReservedBetween) return BOOKED_BETWEEN;

  return null;
}

const Cell = memo((props: GridChildComponentProps): JSX.Element => {
  const { columnIndex, rowIndex, data, style } = props;
  const index = 7 * rowIndex + columnIndex;
  let day = { ...data[index], classNames: [styles.day_col] };

  const {
    selectedDates,
    dateFnsOptions,
    titles,
    renderDay,
    handleClickDay,
  } = useContext(CalendarContext);
  const [selectedStart, selectedEnd] = selectedDates;

  // prettier-ignore
  const isSelectedStart = selectedStart ? isSameDay(day.date, selectedStart) : false;
  // prettier-ignore
  const isSelectedEnd = selectedEnd ? isSameDay(day.date, selectedEnd) : false;
  // prettier-ignore
  const isSelected = !!(selectedStart && selectedEnd && isBetween(day.date, selectedStart, selectedEnd, "{}"));
  if (isSelected) day.classNames.push(styles.selected);
  if (isSelectedStart) day.classNames.push(styles.selected_start);
  if (isSelectedEnd) day.classNames.push(styles.selected_end);
  if (day.isReserved) day.classNames.push(styles.reserved);
  if (day.isToday) day.classNames.push(styles.today);
  if (day.isPast) day.classNames.push(styles.past);

  // header
  let header: DayInfoHeader = {
    classNames: [styles.day_col_header],
    text: "",
    visible: false,
  };
  // footer
  let footer: DayInfoFooter = {
    classNames: [styles.day_col_footer],
    text: "",
    visible: false,
  };
  // month
  let month: DayInfoMonth | null = null;

  if (day.isStartMonth) {
    month = {
      classNames: [styles.month],
      text: format(day.date, "LLL", dateFnsOptions),
      yearText: !isSameYear(day.date, new Date())
        ? format(day.date, "yyyy")
        : null,
    };
  }

  if (isSelectedStart || isSelectedEnd) {
    header.visible = true;
    header.text = format(day.date, "MMM", dateFnsOptions);
    footer.text = isSelectedStart ? titles.dayFooterStart : titles.dayFooterEnd;
  }

  if (day.isToday) {
    header.visible = true;
    header.text = formatRelative(new Date(), new Date(), dateFnsOptions).split(
      " "
    )[0];
  }

  // prettier-ignore
  const reservedDate = day.reservedStart || day.reservedEnd

  if (day.isReserved) footer.text = titles.reservedFooter;
  if (reservedDate) footer.text = format(reservedDate, "HH:mm");

  day = { ...day, header, footer, month };

  // empty col
  if (!day.isSameMonth) {
    return (
      <div
        key={format(day.date, "dd-MM-yyyy-empty")}
        className={styles.empty_day}
        style={style}
      />
    );
  }

  if (renderDay) return renderDay({ ...day, style });

  return (
    <div
      key={format(day.date, "dd-MM-yyyy")}
      className={day.classNames.join(" ")}
      style={style}
      onClick={() => handleClickDay(day)}
    >
      {day.month && (
        <div
          className={day.month.classNames.join(" ")}
          style={{ top: day.isSameYear ? "-30px" : "-50px" }}
        >
          <span style={{ fontWeight: 600, color: "#000!important" }}>
            {day.month.text}
          </span>
          <small>{day.month.yearText && day.month.yearText}</small>
        </div>
      )}
      {day.header.visible && (
        <span className={day.header.classNames.join(" ")}>
          {day.header.text}
        </span>
      )}
      <span className={styles.day_col_date}>{day.text}</span>
      <span className={day.footer.classNames.join(" ")}>{day.footer.text}</span>
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
}, areEqual);

function Grid({
  dateOfStartMonth,
  overscanWeekCount,
  width,
  height,
  items,
  colHeight,
  scrollToDate,
  onScroll,
}: GridProps) {
  const listRef = useRef<FixedSizeGrid>(null);

  useEffect(() => {
    if (!scrollToDate || !items?.length) return;

    const day = items.find(
      (d) => isSameDay(d.date, scrollToDate) && d.rowIndex > -1
    );

    if (!!day && listRef?.current) {
      console.log(day)
      listRef.current.scrollToItem({
        align: "start",
        rowIndex: day.rowIndex,
      });
    }

    const diffWeeks = differenceInCalendarWeeks(
      scrollToDate,
      startOfMonth(dateOfStartMonth)
    );
    const diffMonths =
      differenceInCalendarMonths(scrollToDate, startOfMonth(dateOfStartMonth)) *
      2;
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
      onScroll={onScroll}
    >
      {Cell}
    </FixedSizeGrid>
  );
}

function InfiniteCalendar({
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
  onScroll,
  className = "",
  ...props
}: InfiniteCalendarProps) {
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

  const handleClickDay = (day: DayInfo) => {
    if (disabled) return;
    const { date } = day;

    const overbookError = checkOberbooking(
      day,
      selectedDates,
      rangeMode ? !startDate : isStart,
      reserved
    );

    if (rangeMode) {
      if ((!startDate && !endDate) || (startDate && endDate)) {
        if (overbookError !== BOOKED) {
          setSelectedDates([date, null]);
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
          setSelectedDates([date, null]);
          return;
        }
      }

      if (onOverbook) onOverbook(date, overbookError);
      return;
    }

    const dayWithTime = getSelectedTime(date, reserved, startDate);

    if (rangeMode) {
      if (onChangeRange) {
        onChangeRange([startDate || dayWithTime, endDate || dayWithTime]);
      }
      return;
    }

    if (onChange && dayWithTime) onChange(dayWithTime);
  };

  const items = useMemo(
    () =>
      createDays({
        dateOfStartMonth,
        numOfMonths,
        reserved,
      }),
    [startMonth, numOfMonths, reserved, titles, dateFnsOptions]
  );

  return (
    <CalendarContext.Provider
      value={{
        selectedDates,
        dateFnsOptions,
        titles,
        renderDay,
        handleClickDay,
      }}
    >
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
              scrollToDate={scrollToDate}
              onScroll={onScroll}
            />
          )}
        </AutoSizer>
      </div>
    </CalendarContext.Provider>
  );
}

export default InfiniteCalendar;

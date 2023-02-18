/** @jsxImportSource @emotion/react */
import React, {
  memo,
  useEffect,
  useMemo,
  useRef,
  createContext,
  useContext,
} from "react";

import format from "date-fns/format";
import isSameDay from "date-fns/isSameDay";
import isSameYear from "date-fns/isSameYear";

import {
  areEqual,
  FixedSizeGrid,
  GridChildComponentProps,
  GridOnScrollProps,
} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import {
  createDays,
  getDayState,
  getSelectedDates,
  getStyleProps,
} from "./helpers";
import {
  CalendarContextProps,
  GridProps,
  Day,
  CommonPropsType,
  DefaultCalendarProps,
  DayState,
} from "./types";

import { checkOberbooking } from "./utils/checkOberbooking";
import {
  dateFnsOptionsInit,
  dateOfStartMonthInit,
  disabledInit,
  isStartInit,
  rangeInit,
  reservedInit,
  selectedInit,
  variantInit,
} from "./Calendar";
import { defaultComponents } from "./components";
import { DayCellProps } from "./components/DayCell";
import { defaultStyles, StylesProps } from "./styles";

export type InfiniteCalendarProps = DefaultCalendarProps & {
  numOfMonths?: number;
  colHeight?: number;
  scrollToDate?: Date | number | null;
  onScroll?: (e: GridOnScrollProps) => void;
};

// ==============================
// Context
// ==============================

const CalendarContext = createContext<CalendarContextProps | null>(null);
const useProps = () => {
  const currentCalendarContext = useContext(CalendarContext);

  if (!currentCalendarContext) {
    throw new Error(
      "useComponent has to be used within <CalendarContext.Provider>"
    );
  }

  return currentCalendarContext;
};

// ==============================
// RenderCell
// ==============================

const RenderCell = memo((props: GridChildComponentProps): JSX.Element => {
  const { columnIndex, rowIndex, data, style } = props;
  const index = 7 * rowIndex + columnIndex;
  let day = data[index];

  const { components, commonProps, handleClickDay } = useProps();

  const { selected, reserved, dateFnsOptions } = commonProps;

  const { DayCell, DayCellContent, DayCellFooter, DayCellHeader } = components;

  const state = getDayState({ day, selected, reserved });
  const dayProps: DayCellProps & CommonPropsType = {
    date: day.date,
    state,
    ...commonProps,
  };

  if (!DayCell || !DayCellContent || !DayCellFooter || !DayCellHeader)
    return <></>;

  // empty col
  if (!state.isSameMonth) {
    dayProps.state = { isSameMonth: false };
    return <DayCell innerProps={{ style: style }} {...dayProps} />;
  }

  return (
    <DayCell
      innerProps={{
        style: style,
        onClick: () => handleClickDay(day, state),
      }}
      {...dayProps}
    >
      <DayCellHeader {...dayProps} />
      <DayCellContent {...dayProps} />
      <DayCellFooter {...dayProps} />
      {state.isStartMonth && (
        <div
          {...getStyleProps({}, "month", commonProps)}
          style={{ top: state.isSameYear ? "-30px" : "-40px" }}
        >
          <span style={{ fontWeight: 600, color: "#000!important" }}>
            {format(day.date, "LLL", dateFnsOptions)}
          </span>
          <small>
            {!isSameYear(day.date, new Date()) && format(day.date, "yyyy")}
          </small>
        </div>
      )}
    </DayCell>
  );
}, areEqual);

// ==============================
// Grid
// ==============================

const Grid = ({
  width,
  height,
  items,
  colHeight,
  scrollToDate,
  onScroll,
  ...props
}: GridProps) => {
  const listRef = useRef<FixedSizeGrid>(null);

  useEffect(() => {
    if (!scrollToDate || !items?.length) return;

    const day = items.find(
      (d) => isSameDay(d.date, scrollToDate) && d.rowIndex > -1
    );

    if (!!day && listRef?.current) {
      listRef.current.scrollToItem({
        align: "start",
        rowIndex: day.rowIndex,
      });
    }
  }, [scrollToDate, items]);

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
      overscanRowCount={3}
      onScroll={onScroll}
      {...props}
    >
      {RenderCell}
    </FixedSizeGrid>
  );
};

// ==============================
// InfiniteCalendar
// ==============================

function InfiniteCalendar(props: InfiniteCalendarProps) {
  const {
    selected = selectedInit,
    isStart = isStartInit,
    dateOfStartMonth = dateOfStartMonthInit,
    reserved = reservedInit,
    variant = variantInit,
    dateFnsOptions = dateFnsOptionsInit,
    range = rangeInit,
    disabled = disabledInit,
    components = {},
    scrollToDate = null,
    numOfMonths = 12,
    colHeight = 55,
    className = "",
    classNamePrefix,
    onOverbook,
    onChange,
    onScroll,
    ...innerProps
  } = props;
  const weekHeight = colHeight / 2;

  const [startDate, endDate] = getSelectedDates(selected);

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

  const startMonth = format(dateOfStartMonth, "yyyy-MM");
  const items = useMemo(
    () =>
      createDays({
        dateOfStartMonth,
        numOfMonths,
        dateFnsOptions,
      }),
    [startMonth, numOfMonths, dateFnsOptions]
  );

  // getClassNames

  const getClassNames = (name: string) => {
    if (!classNamePrefix) return "";

    const prefix = classNamePrefix.length ? classNamePrefix + "__" : "";

    return prefix + name.replaceAll("_", "-");
  };

  // getStyles

  const getStyles = <Key extends keyof StylesProps>(props: any, name: Key) => {
    const base = defaultStyles[name](props as any);
    base.boxSizing = "border-box";

    return base;
  };

  // commonProps

  const commonProps = {
    selected: [startDate, endDate],
    reserved,
    variant,
    dateFnsOptions,
    getClassNames,
    getStyles,
  };

  const currentComponents = defaultComponents(components);
  const { CalendarContainer, WeekContainer, WeekCell } = currentComponents;

  return (
    <CalendarContext.Provider
      value={{
        components: currentComponents,
        commonProps,
        handleClickDay,
      }}
    >
      <CalendarContainer {...commonProps} innerProps={innerProps}>
        <WeekContainer
          innerProps={{ style: { height: weekHeight } }}
          {...commonProps}
        >
          {WeekCell}
        </WeekContainer>
        <AutoSizer>
          {({ height, width }) => (
            <Grid
              height={height - weekHeight}
              width={width}
              items={items}
              colHeight={colHeight}
              scrollToDate={scrollToDate}
              onScroll={onScroll}
            />
          )}
        </AutoSizer>
      </CalendarContainer>
    </CalendarContext.Provider>
  );
}

export default InfiniteCalendar;

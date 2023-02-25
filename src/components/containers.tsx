import React, { ComponentType, ReactNode } from "react";
import { CSSObject } from "@emotion/react";
import { getStyleProps } from "../helpers";
import { CommonPropsType } from "../types";

// ==============================
// Calendar Container
// ==============================

export type CalendarContainerProps = CommonPropsType & {
  children: ReactNode;
  innerProps?: {};
};
export const CalendarContainerCSS = (): CSSObject => ({
  backgroundColor: "#fff",
  position: "relative",
  height: "100%",
  width: "100%",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  WebkitFontSmoothing: "antialiased",
});

export const CalendarContainer = (props: CalendarContainerProps) => {
  const { children, innerProps } = props;

  return (
    <div {...getStyleProps({}, "calendar_container", props)} {...innerProps}>
      {children}
    </div>
  );
};

// ==============================
// Month Container
// ==============================

export type MonthContainerProps = CommonPropsType & {
  children: ReactNode;
  innerProps?: JSX.IntrinsicElements["div"];
};

export const monthContainerCSS = (): CSSObject => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row",
  padding: "0.75rem 0.25rem",
  position: "relative",
});

export const MonthContainer = (props: MonthContainerProps) => {
  const { children, innerProps } = props;

  return (
    <div {...getStyleProps({}, "month_container", props)} {...innerProps}>
      {children}
    </div>
  );
};

// ==============================
// Week Container
// ==============================

export type WeekContainerProps = CommonPropsType & {
  children: ComponentType<WeekContainerChildProps>;
  innerProps?: JSX.IntrinsicElements["div"];
};

export type WeekContainerChildProps = CommonPropsType & {
  day: number;
  innerProps?: JSX.IntrinsicElements["div"];
};

export const weekContainerCSS = (): CSSObject => ({
  position: "sticky",
  top: 0,
  left: 0,
  right: 0,
  background: "#fff",
  zIndex: 10,
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  alignContent: "center",
  width: "100%",
});

export const WeekContainer = (props: WeekContainerProps) => {
  const { children, innerProps, ...childProps } = props;
  const Component = children;

  return (
    <div {...getStyleProps({}, "week_container", props)} {...innerProps}>
      {children &&
        Array.from({ length: 7 }).map((_, i) => (
          <Component key={i} day={i} {...childProps} />
        ))}
    </div>
  );
};

// ==============================
// Days Container
// ==============================

export type DaysContainerProps = CommonPropsType & {
  children: ReactNode;
  innerProps?: JSX.IntrinsicElements["div"];
};

export const daysContainerCSS = (): CSSObject => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
});

export const DaysContainer = (props: DaysContainerProps) => {
  const { children, innerProps } = props;

  return (
    <div {...getStyleProps({}, "day_container", props)} {...innerProps}>
      {children}
    </div>
  );
};

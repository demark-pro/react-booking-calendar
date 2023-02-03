# React Booking Calendar

A responsive customizable React infinite booking calendar.

[Try it on CodeSandbox](https://codesandbox.io/s/react-booking-calendar-example-t9sdt0)

## Installation

```bash
npm i @demark-pro/react-booking-calendar
```

## Usage

```js
import React, { useState } from "react";
import BookingCalendar from "@demark-pro/react-booking-calendar";

const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);

const handleChange = e => isStart ? setStartDate(e) : setEndDate(e)

const reserved = [
  {
    startDate: new Date(2023, 2, 1),
    endDate: new Date(2016, 2, 14),
  },
  {
    startDate: new Date(2023, 3, 22),
    endDate: new Date(2016, 4, 05),
  },
];

const isStart = !startDate;

const MyBookingCalendar = () => (
  <BookingCalendar
    selectedStart={startDate}
    selectedEnd={endDate}
    isStart={isStart}
    reserved={reserved}
    onChange={handleChange}
    scrollToDate={new Date(2023, 3, 20)}
  />
);
```

## Options

| Prop               | Type                  | Default        | Description                                               |
| :----------------- | :-------------------- | :------------- | :-------------------------------------------------------- |
| `selectedStart`    | Date | number | null  | `undefined`    | Value of start date                                       |
| `selectedEnd`      | Date | number | null  | `undefined`    | Value of end date                                         |
| `isStart`          | boolean               | `true`         | Current value selection                                   |
| `dateOfStartMonth` | Date | number         | `new Date()`   | Any day of the first month                                |
| `numOfMonth`       | number                | `12`           | Number of months since `dateOfStartMonth`                 |
| `overscanWeekCount`| number                | `4`            | The number of weeks to render outside of the visible area |
| `colHeight`        | number                | `55`           | The number of height col                                  |
| `reserved`         | Array                 | `[]`           | Array of objects `{ startDate: Date, endDate: Date }`     |
| `titles`           | Object                | `Titles`       | Object of titles                                          |
| `disabled`         | boolean               | `false`        | ignore `onChange`                                         |
| `scrollToDate`     | Date | number | null  | `undefined`    | Scroll to desired week                                    |
| `onChange`         | (e: Date) => void     | `undefined`    | callback after date selection                             |


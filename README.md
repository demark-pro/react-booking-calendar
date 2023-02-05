# React Booking Calendar

A responsive customizable React infinite booking calendar and overbooking protection

[Try it on CodeSandbox](https://codesandbox.io/s/react-booking-calendar-example-t9sdt0)

## Installation

```bash
npm i @demark-pro/react-booking-calendar
```

![](https://media.giphy.com/media/GbZsTiqONHQ65ZcUNv/giphy.gif)

## Usage

```js
import React, { useState } from "react";
import BookingCalendar from "@demark-pro/react-booking-calendar";

const reserved = [
  {
    startDate: new Date(2023, 3, 22),
    endDate: new Date(2016, 4, 05),
  },
];

const MyBookingCalendar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleChange = (e) => (isStart ? setStartDate(e) : setEndDate(e));
  const isStart = !startDate;

  return (
    <BookingCalendar
      selectedStart={startDate}
      selectedEnd={endDate}
      isStart={isStart}
      reserved={reserved}
      onChange={handleChange}
      scrollToDate={new Date(2023, 3, 20)}
    />
  );
};
```

## Options

| Prop              | Type                 | Default             | Description                                               |
| :---------------- | :------------------- | :------------------ | :-------------------------------------------------------- |
| selectedStart     | Date / number / null |                     | Value of start date                                       |
| selectedEnd       | Date / number / null |                     | Value of end date                                         |
| isStart           | boolean              | true                | Current value selection                                   |
| dateOfStartMonth  | Date / number        | new Date()          | Any day of the first month                                |
| numOfMonth        | number               | 12                  | Number of months since `dateOfStartMonth`                 |
| overscanWeekCount | number               | 4                   | The number of weeks to render outside of the visible area |
| colHeight         | number               | 55                  | The number of height col                                  |
| reserved          | Array                | `[]`                | Array of objects `{ startDate: Date, endDate: Date }`     |
| titles            | Object               | Titles              | Object of titles                                          |
| disabled          | boolean              | false               | Ignore `onChange`                                         |
| scrollToDate      | Date / number / null |                     | Scroll to desired week                                    |
| dateFnsOptions    | Object               | `{weekStartsOn: 1}` | Read more date-fns documentation                          |
| renderDay         | Func                 |                     | Must return JSX.Element                                   |
| onOverbook        | Func                 |                     | Returns date and type of overbooking error                |
| className         | string               |                     | Class name(s) main Calendar `<div>` element               |
| onChange          | Func                 |                     | Callback after date selection                             |

## Utils

### getReservedInfoOfDate

```ts
(date: Date | number, reserved: Reserved[], isStart: boolean = false)
```

Returns information about whether there is a reservation on this date and the beginning and end of free time of the day.

### getSelectedTime

```ts
(date: Date | number, reserved: Reserved[], selectedStart?: Date | number | null)`
```

Returns the available booking time for that day

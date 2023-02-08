# React Booking Calendar

A responsive customizable React infinite calendar with overbooking protection.

![](https://media.giphy.com/media/GbZsTiqONHQ65ZcUNv/giphy.gif)

## Demo

[Online demo](https://demark-pro.github.io/react-booking-calendar-demo/) is also available!

## Getting started

#### How can I use another locale?

If you want to use a different locale, you need to pass the dateFnsOptions parameter to the locale. Read more [date-fns](https://date-fns.org/v2.29.3/docs/I18n-Contribution-Guide#choosing-a-directory-name-for-a-locale)

#### Why are two different props used instead of an array of dates?

This is necessary if you want to call the calendar in two different places. For example: check-in date selection button and check-out date selection button. Where for the first you have to pass `isStart=true` and `isStart=false`

### Installation

Add React-Booking-Calendar to your project by executing `npm i @demark-pro/react-booking-calendar --save`.

### Usage

Here's an example of usage with rangeMode:

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
  const [selectedDates, setSelectedDays] = useState([null, null]);
  const [startDate, endDate] = selectedDates;

  const handleChange = (e) => setSelectedDays(e);

  return (
    <BookingCalendar
      selectedStart={startDate}
      selectedEnd={endDate}
      reserved={reserved}
      onChangeRange={handleChange}
      onOverbook={(e, err) => alert(err)}
      rangeMode
    />
  );
};
```

## Options

| Prop              | Type                 | Default             | Description                                                         |
| :---------------- | :------------------- | :------------------ | :------------------------------------------------------------------ |
| selectedStart     | Date / number / null |                     | Value of start date                                                 |
| selectedEnd       | Date / number / null |                     | Value of end date                                                   |
| isStart           | boolean              | true                | Current value selection                                             |
| dateOfStartMonth  | Date / number        | new Date()          | Any day of the first month                                          |
| numOfMonths       | number               | 12                  | Number of months since `dateOfStartMonth`                           |
| overscanWeekCount | number               | 4                   | The number of weeks to render outside of the visible area           |
| colHeight         | number               | 55                  | The number of height col                                            |
| reserved          | Array                | `[]`                | Array of objects `{ startDate: Date, endDate: Date }`               |
| titles            | Object               | Titles              | Object of titles                                                    |
| scrollToDate      | Date / number / null |                     | Scroll to desired week                                              |
| dateFnsOptions    | Object               | `{weekStartsOn: 1}` | Read more date-fns documentation                                    |
| rangeMode         | boolean              | false               | With range mode use onChangeRange                                   |
| renderDay         | Func                 |                     | Must return JSX.Element                                             |
| className         | string               |                     | Class name(s) main Calendar `<div>` element                         |
| disabled          | boolean              | false               | Ignore `onChange`                                                   |
| onOverbook        | Func                 |                     | Returns date and type of overbooking error                          |
| onChange          | Func                 |                     | Callback after date selection. Return selected date (e: Date)       |
| onChangeRange     | Func                 |                     | Callback after end date selection.Return selected dates (e: Date[]) |

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

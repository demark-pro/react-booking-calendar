<div align="center">
    <h2>React Booking Calendar</h2>
    <p align="center">
        <p>A responsive customizable React infinite calendar with overbooking protection.</p>
        <a href="https://www.npmjs.com/package/@demark-pro/react-booking-calendar" target="_blank">
            <img src="https://img.shields.io/npm/v/@demark-pro/react-booking-calendar">
        </a>
    </p>
</div>

<p align="center">
    <a href="https://frappe.github.io/gantt">
        <img src="https://media.giphy.com/media/a7duNBi2PPNrJmxv0b/giphy.gif">
    </a>
</p>

## Demo

A minimal demo page can be found in [example](https://github.com/demark-pro/react-booking-calendar/tree/main/example) directory.

[Online demo](https://demark-pro.github.io/react-booking-calendar/) is also available!

## Getting started

#### How can I use another locale?

If you want to use a different locale, you need to pass the dateFnsOptions parameter to the locale. Read more [date-fns](https://date-fns.org/v2.29.3/docs/I18n-Contribution-Guide#choosing-a-directory-name-for-a-locale)

#### Why are two different props used instead of an array of dates?

This is necessary if you want to call the calendar in two different places. For example: check-in date selection button and check-out date selection button. Where for the first you have to pass `isStart=true` and `isStart=false`

### Installation

Add React-Booking-Calendar to your project by executing `npm i @demark-pro/react-booking-calendar --save`.

### Usage

Here's an example of usage with range:

```js
import React, { useState } from "react";
import Calendar from "@demark-pro/react-booking-calendar";

const reserved = [
  {
    startDate: new Date(2023, 3, 22),
    endDate: new Date(2016, 4, 05),
  },
];

const MyBookingCalendar = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const handleChange = (e) => setSelectedDates(e);

  return (
    <Calendar
      selected={selectedDates}
      onChange={handleChange}
      onOverbook={(e, err) => alert(err)}
      components={{
        DayCellFooter: ({ innerProps }) => (
          <div {...innerProps}>My custom day footer</div>
        ),
      }}
      disabled={(date, state) => !state.isSameMonth}
      reserved={reserved}
      variant="events"
      dateFnsOptions={{ weekStartsOn: 1 }}
      range={true}
    />
  );
};
```

## Styles

If you provide the classNamePrefix prop to Calendar, all inner elements will be given a className with the provided prefix.

InfiniteСalendar example

```js
<InfiniteCalendar classNamePrefix="calendar" />
```

and CSS...

```css
.calendar__dayCell-footer {
  color: "red";
}
```

## Options

| Prop           | Type                 | Default             | Description                                           |
| :------------- | :------------------- | :------------------ | :---------------------------------------------------- |
| selected       | (Date/number/null)[] | []                  | [selectedStartDate, selectedEndDate]                  |
| month          | number               | current month       | Optional                                              |
| year           | number               | current year        | Optional                                              |
| isStart        | boolean              | true                | Current value selection                               |
| reserved       | Array                | `[]`                | Array of objects `{ startDate: Date, endDate: Date }` |
| dateFnsOptions | Object               | `{weekStartsOn: 1}` | Read more date-fns documentation                      |
| range          | boolean              | false               | add range logic                                       |
| className      | string               |                     | Class name(s) main Calendar `<div>` element           |
| disabled       | boolean/func         | false               |                                                       |
| components     |                      | false               | Custom components                                     |
| variant        | events               | booking             | booking                                               |
| onOverbook     | Func                 |                     | Returns date and type of overbooking error            |
| onChange       | Func                 |                     | Callback after date selection. Returns (date)         |
| onMonthChange  | Func                 |                     | Callback after month change. Returns (month, year)    |

## Utils

### getFreeTimeofDate

```ts
(date: Date | number, reserved: Reserved[])
```

Returns free check-in and check-out time `{ startDate: Date, endDate: Date }`
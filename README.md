# React Booking Calendar

A responsive customizable booking calendar with overbooking protection.

## Demo

[Example #1](https://codesandbox.io/p/sandbox/example-1-calendar-component-kg3984) - Сalendar component

[Example #2](https://codesandbox.io/p/sandbox/example-2-scrollablecalendar-component-ydwds4) - ScrollableСalendar component

[Example #3](https://codesandbox.io/p/sandbox/example-3-eventscalendar-vwkz9r) - An example of how easily you can customize a calendar using components and classnames props with tailwindcss

## Installation

Install with npm

```bash
  npm i @demark-pro/react-booking-calendar --save
```

Below is a simple example of how to use the Calendar in a React view. You will also need to require the CSS file from this package (or provide your own). The example below shows how to include the CSS from this package if your build system supports requiring CSS files (Webpack is one that does).

```js
import React, { useState } from "react";
import { Calendar } from "@demark-pro/react-booking-calendar";

import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";

// CSS Modules, react-booking-calendar-cssmodules.css
// import '@demark-pro/react-booking-calendar/dist/react-booking-calendar-cssmodules.css';

const oneDay = 86400000;
const today = new Date().getTime() + oneDay;

const reserved = Array.from({ length: 3 }, (_, i) => {
  const daysCount = Math.floor(Math.random() * (7 - 4) + 3);
  const startDate = new Date(today + oneDay * 8 * i);

  return {
    startDate,
    endDate: new Date(startDate.getTime() + oneDay * daysCount),
  };
});

const BookingCalendar = () => {
  const [selectedDates, setSelectedDates] = useState([]);

  return (
    <Calendar
      selected={selectedDates}
      reserved={reserved}
      onChange={setSelectedDates}
    />
  );
};
```

## Customisation

### The classNames prop

ClassNames takes an object with keys to represent the various inner components that react-select is made up of. Each inner component takes a callback function with the following signature:

```ts
<Calendar
  classNames={{
    DayContent: "text-orange-600",
  }}
/>
```

### The components prop

React-Select allows you to augment layout and functionality by replacing the default components with your own, using the components property. These components are given all the current props and state

```ts
import { DaySelectionProps } from "@demark-pro/react-booking-calendar";

import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";

const DaySelection = ({ innerProps, state }: DaySelectionProps) => {
  if (state.isReserved) return null;

  return <div {...innerProps} />;
};

<Calendar
  components={{
    DaySelection: DaySelection,
  }}
/>;
```

## Documentation

For more information about the props that you can pass to the component, see the [documentation here](https://linktodocumentation).

# React Booking Calendar

<img width="394" alt="Снимок экрана 2024-05-31 в 23 54 21" src="https://github.com/demark-pro/react-booking-calendar/assets/87781788/44d84296-c404-4a40-8f5f-1c4f3530bbe4">


A responsive customizable booking calendar with overbooking protection.

## Demo

[Example #1](https://codesandbox.io/p/sandbox/example-1-calendar-component-kg3984) - Сalendar component

[Example #2](https://codesandbox.io/p/sandbox/example-2-scrollablecalendar-component-ydwds4) - ScrollableСalendar component

[Example #3](https://codesandbox.io/p/devbox/example-3-eventscalendar-tailwind-pwtxpy) - EventsCalendar component. An example of how easily you can customize a calendar using components and classnames props with tailwindcss

## Live Docs

[Live docs and examples](https://demark-pro.github.io/react-booking-calendar/) - GitHub Pages documentation with interactive local demos

Run the docs locally from the repository root:

```bash
npm run docs:dev
```

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

`classNames` accepts an object where the key is a calendar component name and the value is a string of classes to append to that component's default `calendar__*` class.

```ts
<Calendar
  classNames={{
    DayContent: "text-orange-600",
  }}
/>
```

### The components prop

Calendar allows you to augment layout and functionality by replacing the default components with your own, using the components property. These components are given all the current props and state

```ts
import { DaySelectionProps } from "@demark-pro/react-booking-calendar";

import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";

const DaySelection = ({
  innerProps,
  state,
  getClassNames,
}: DaySelectionProps) => {
  if (state.isReserved) return null;

  const { className = "", ...restInnerProps } = innerProps ?? {};

  return (
    <div
      className={getClassNames("DaySelection", className)}
      {...restInnerProps}
    />
  );
};

<Calendar
  components={{
    DaySelection: DaySelection,
  }}
/>;
```

For full guides, examples, and API reference, open the GitHub Pages docs:
[https://demark-pro.github.io/react-booking-calendar/](https://demark-pro.github.io/react-booking-calendar/)

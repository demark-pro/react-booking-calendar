# React Booking Calendar

<img width="394" alt="React Booking Calendar screenshot" src="https://github.com/demark-pro/react-booking-calendar/assets/87781788/44d84296-c404-4a40-8f5f-1c4f3530bbe4">

React Booking Calendar is a React library for monthly and scrollable booking
calendars with built-in overbooking protection.

Documentation and examples:
[https://demark-pro.github.io/react-booking-calendar/](https://demark-pro.github.io/react-booking-calendar/)

## Installation

```bash
npm install @demark-pro/react-booking-calendar
```

`react` and `react-dom` are peer dependencies.

## Quick Start

```tsx
import { useState } from "react";
import { Calendar } from "@demark-pro/react-booking-calendar";

import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";

export function BookingCalendar() {
  const [selected, setSelected] = useState([null, null]);

  return (
    <Calendar
      selected={selected}
      reserved={[
        {
          startDate: new Date(2030, 4, 12, 14, 0),
          endDate: new Date(2030, 4, 14, 10, 0),
        },
      ]}
      onChange={setSelected}
    />
  );
}
```

## Exports

- `Calendar`
- `ScrollableCalendar`
- `getProtectedTime`
- `getProtectedInterval`

For styling, custom components, and full API reference, use the documentation
site:
[https://demark-pro.github.io/react-booking-calendar/](https://demark-pro.github.io/react-booking-calendar/)

# React booking calendar documentation

Writing documentation takes time, so this section will be updated as soon as possible. I tried to show all the main points in the demo.

- All components accepts the following values:
  - [`selected`](#selected) (array)
  - [`reserved`](#reserved) (array)
  - [`components`](#components) (object)
  - [`classNames`](#classnames) (object)
  - [`options`](#options) (object)
  - [`isStart`](#isstart) (boolean)
  - [`range`](#range) (boolean)
  - [`protection`](#protection) (boolean)
  - [`disabled`](#disabled) (boolean or function)
  - [`onOverbook`](#onoverbook) (function)
  - [`onChange`](#onchange) (function)
- Components
  - [Calendar](#calendar)
  - [ScrollableCalendar](#scrollable-calendar)
- Utilites
  - [getProtectedInterval](#get-protected-interval)
  - [getProtectedTime](#get-protected-time)

## `selected`

#### type: `CalendarSelected[]`

An array of selected check-in and check-out dates. Accepts an array with the value `date`, `number`, `string`, `null` or `undefined`.

## `reserved`

#### type: `CalendarReserved[]`

An array of objects with check-in and check-out dates

```ts
// The date type accepted is also exported
// CalendarDate: Date | number | string

[
  {
    startDate: CalendarDate,
    endDate: CalendarDate,
  },
];
```

## `components`

#### type: `CalendarComponents`

Calendar allows you to augment layout and functionality by replacing the default components with your own, using the components property. These components are given all the current props and state

**Component structure:**

```ts
<CalendarContainer>
  <MonthContainer>
    <MonthArrowBack />
    <MonthContent />
    <MonthArrowNext />
  </MonthContainer>

  <WeekContainer>
    <WeekContent />
  </WeekContainer>

  <DaysContainer>
    <DayContainer>
      <DayContent />
      <DayToday />
      <DaySelection />
      <DayReservation />
    </DayContainer>
  </DaysContainer>
</CalendarContainer>
```

You can also export the props type like CalendarContainerProps.

All functional properties that the component needs are provided in innerProps which you must spread.

Every component receives `commonProps` which are spread onto the component.

These include:

- `selected`: CalendarSelected[];
- `reserved`: CalendarReserved[];
- `disabled?`: CalendarDisabled;
- `protection?`: CalendarProtection;
- `range?`: boolean;
- `isStart?`: boolean;
- `options?`: CalendarOptions;
- `getClassNames`: (componentName, classes) => string;

Also, all components of the day have additional props:

- `date`: Date;
- `state`: CalendarDayState;

**Example:**

```ts
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

When defining replacement components, it is important to do so outside the scope of rendering the Calendar. Defining a replacement component directly in the components prop can cause issues.

On this topic, React [documentation](https://legacy.reactjs.org/docs/higher-order-components.html#dont-use-hocs-inside-the-render-method) has the following to say:

_- The problem here isn’t just about performance — remounting a component causes the state of that component and all of its children to be lost._

## `classNames`

#### type: `CalendarClassNames`

An object where you need to pass the name of the component as a key and the value as a string with the classes you want to add.

```ts
<Calendar
  classNames={{
    DayContent: "text-orange-600",
  }}
/>
```

## `options`

#### type: `CalendarOptions`

```ts
type CalendarOptions = {
  locale?: Intl.LocalesArgument;
  weekStartsOn?: number;
  useAttributes?: boolean;
};
```

## `isStart`

#### type: `boolean`

Works only if prop `range` is missing or `false`.

It is needed to indicate to the component which date is selected, check-in or check-out.

## `range`

#### type: `boolean`

If `true`, the `onChange` will only work after selecting two dates

## `protection`

#### type: `boolean`

**if set to `false`, overbooking protection will be disabled!**

This means that the `onChange` will work in any case, except for checking for `disabled`.

## `disabled`

#### type: `CalendarDisabled`

### `boolean`

If set to false, the component will ignore date selection

### `function`

A function where the first argument is the `date` and the second is the date `state`, the returned boolean.

For example:

```ts
<Calendar
  disabled={(date: Date, state: CalendarDayState) => !state.isSameMonth}
/>
```

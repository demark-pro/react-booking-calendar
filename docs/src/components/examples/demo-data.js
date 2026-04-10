export const overbookLabels = {
  PAST: "Past date",
  BOOKED: "Reserved date",
  BEFORE_START: "Before the current start date",
  AFTER_END: "After the current end date",
  BOOKED_BETWEEN: "Reservation inside the selected interval",
  DISABLED: "Disabled date",
};

const createBaseDate = () => {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  return date;
};

export const relativeDate = (offset, hours = 12) => {
  const date = createBaseDate();
  date.setDate(date.getDate() + offset);
  date.setHours(hours, 0, 0, 0);
  return date;
};

export const makeReservations = (ranges) =>
  ranges.map(([start, end], index) => ({
    startDate: relativeDate(start, 14),
    endDate: relativeDate(end, 10),
    color: index % 2 === 0 ? "#0d8b84" : "#f36c3d",
  }));

export const basicReservations = makeReservations([
  [3, 5],
  [9, 11],
  [15, 17],
]);

export const rangeReservations = makeReservations([
  [4, 7],
  [11, 13],
  [18, 20],
]);

export const scrollReservations = makeReservations([
  [9, 12],
  [24, 27],
  [39, 42],
  [54, 57],
]);

export const styledReservations = makeReservations([
  [6, 8],
  [13, 15],
  [20, 22],
]);

const humanDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "Not selected";

export const formatSelection = (selected) => {
  const [startDate, endDate] = selected;

  if (!startDate && !endDate) return "Nothing selected yet";
  if (startDate && !endDate) return `${humanDate(startDate)} -> pick an end date`;
  if (!startDate && endDate) return `${humanDate(endDate)} -> end date only`;

  return `${humanDate(startDate)} -> ${humanDate(endDate)}`;
};

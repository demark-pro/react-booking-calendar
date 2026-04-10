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

export const timedReservations = [
  {
    startDate: relativeDate(2, 14),
    endDate: relativeDate(4, 10),
    color: "#0d8b84",
  },
  {
    startDate: relativeDate(7, 14),
    endDate: relativeDate(9, 10),
    color: "#f36c3d",
  },
];

const dayKey = (value) => {
  const date = new Date(value);
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

export const eventItems = [
  { date: relativeDate(1), label: "Check-in", color: "#0d8b84" },
  { date: relativeDate(1), label: "Housekeeping", color: "#f6b048" },
  { date: relativeDate(3), label: "Concert", color: "#f36c3d" },
  { date: relativeDate(3), label: "VIP", color: "#17302b" },
  { date: relativeDate(5), label: "Breakfast", color: "#0d8b84" },
  { date: relativeDate(8), label: "Cleaning", color: "#9d6cfd" },
  { date: relativeDate(8), label: "Late checkout", color: "#f36c3d" },
  { date: relativeDate(11), label: "Group arrival", color: "#0d8b84" },
];

export const eventMarkersByDay = eventItems.reduce((acc, item) => {
  const key = dayKey(item.date);

  if (!acc[key]) acc[key] = [];
  acc[key].push(item);

  return acc;
}, {});

export const eventLegend = Array.from(
  new Map(eventItems.map((item) => [item.label, item])).values()
);

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

export const formatDateTime = (value) =>
  value
    ? new Date(value).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "Not selected";

export const formatSelectionWithTime = (selected) => {
  const [startDate, endDate] = selected;

  if (!startDate && !endDate) return "Nothing selected yet";
  if (startDate && !endDate)
    return `${formatDateTime(startDate)} -> pick an end date`;
  if (!startDate && endDate)
    return `${formatDateTime(endDate)} -> end date only`;

  return `${formatDateTime(startDate)} -> ${formatDateTime(endDate)}`;
};

const MONTH_ABBREVIATIONS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const getOrdinalSuffix = (day: number) => {
  const remainder100 = day % 100;
  if (remainder100 >= 11 && remainder100 <= 13) {
    return "TH";
  }

  switch (day % 10) {
    case 1:
      return "ST";
    case 2:
      return "ND";
    case 3:
      return "RD";
    default:
      return "TH";
  }
};

export const formatMatchDate = (date?: string): string => {
  if (!date) return "";

  const parts = date.split(".").map((part) => part.trim());
  if (parts.length < 2) return date.toUpperCase();

  const [dayPart, monthPart] = parts;
  const day = parseInt(dayPart, 10);
  const month = parseInt(monthPart, 10);

  if (Number.isNaN(day) || Number.isNaN(month) || month < 1 || month > 12) {
    return date.toUpperCase();
  }

  const monthName = MONTH_ABBREVIATIONS[month - 1];
  return `${monthName} ${day}${getOrdinalSuffix(day)}`;
};

export const formatMatchDateTime = (date?: string, time?: string): string => {
  const dateText = formatMatchDate(date);
  return [dateText, time].filter(Boolean).join(" ");
};

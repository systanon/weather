export function degrees(value) {
  if (!value) return 0;
  return Math.round(value);
}

export function upperCase(value) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}
const formatTimeItem = (str) => {
  if (str.length === 1) return "0" + str;
  return str;
};
export const formatTime = (seconds) => {
  const milliseconds = seconds * 1000;
  const date = new Date(milliseconds);
  const minutes = formatTimeItem(date.getMinutes().toString());
  const hours = formatTimeItem(date.getHours().toString());
  return `${hours}:${minutes}`;
};

export const formatDate = (seconds) => {
  const milliseconds = seconds * 1000;
  const date = new Date(milliseconds);
  const locale = "en";
  const options = {
    hour12: false,
    weekday: "long",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleString(locale, options);
};

export const windSpeed = (number) => {
  return `${number}m/sec`;
};
export const round = (temp) => {
  return Math.round(temp);
};
const windRose = [
  "E",
  "ENE",
  "NE",
  "NNE",
  "N",
  "NNW",
  "NW",
  "WNW",
  "W",
  "WSW",
  "SW",
  "SSW",
  "S",
  "SSE",
  "SE",
  "ESE",
];
export const windDegStr = (deg) => {
  const step = windRose.length;
  const delta = step / 2;
  const currentDeg = deg + delta;
  const index = Math.floor(currentDeg / step);
  return windRose[index];
};

export const formatDate = (seconds) => {
  const milliseconds = seconds * 1000;
  const date = new Date(milliseconds);
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDay(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
  };
};

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const getCookie = (cookieName) => {
  const cookie = globalThis.document.cookie
    .split(";")
    .map((str) => str.trim().split("="))
    .find(([name, value]) => name === cookieName);
  if (!cookie) return "";
  return cookie[1] ?? "";
};

const DAYS = 24 * 60 * 60;
const CITY_LIST = "city-list";

export const storage = {
  saveCityList(list = []) {
    const maxAge = 365 * DAYS;
    const listStr = JSON.stringify(list);
    globalThis.document.cookie = `${CITY_LIST}=${listStr}; max-age=${maxAge}`;
  },

  readCityList() {
    const listStr = getCookie(CITY_LIST);

    if (!listStr) return [];
    try {
      return JSON.parse(listStr);
    } catch {
      return [];
    }
  },
};

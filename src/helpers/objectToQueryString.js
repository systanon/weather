const defaultOptions = {
  appid: process.env.VUE_APP_APP_ID,
  units: "metric",
  lang: "en",
};

// for fetch:
export function objectToQueryString(object) {
  const searchParams = new URLSearchParams();
  const queryObj = {
    ...defaultOptions,
    ...object,
  };
  Object.entries(queryObj).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    searchParams.append(key, value.toString());
  });
  return searchParams.toString();
}

// for axios:
export function queryParams(object) {
  return {
    ...defaultOptions,
    ...object,
  };
}

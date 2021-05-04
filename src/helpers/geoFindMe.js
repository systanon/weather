export const geoFindMe = () => {
  return new Promise((resolve, reject) => {
    function success(position) {
      resolve({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    }
    function error() {
      reject("Unable to retrieve your location");
    }
    // eslint-disable-next-line no-undef
    const geo = globalThis?.navigator?.geolocation;
    if (!geo) {
      reject("Geolocation is not supported by your browser");
    } else {
      geo.getCurrentPosition(success, error);
    }
  });
};

export const endpoints = {
  _ver: process.env.VUE_APP_API_VER,
  _forecast: "forecast",
  _onecall: "onecall",
  _weather: "weather",
  get _path() {
    return "/data/" + this._ver;
  },
  get forecast() {
    return this._path + "/" + this._forecast;
  },
  get onecall() {
    return this._path + "/" + this._onecall;
  },
  get weather() {
    return this._path + "/" + this._weather;
  },
};

import Vue from "vue";
import Vuex from "vuex";
import { geoFindMe } from "@/helpers/geoFindMe";
import { responseForecastCoordinate } from "./../mock_data/response_forecast-coordinate";
import { responseWeatherId } from "./../mock_data/response_weather-id";
import { responseOneCallCoordinate } from "./../mock_data/response_onecall-coordinate";
import { endpoints } from "../config/endpoints";
import { objectToQueryString } from "./../helpers/objectToQueryString";
import { storage } from "./../helpers/storage";
import { cityList } from "./../mock_data/cityList";
import api from "./../helpers/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cityList: cityList, // [],
    weather: [responseWeatherId], // [],
    forecast: responseForecastCoordinate, // null,
    additionally: responseOneCallCoordinate, // null,
  },

  mutations: {
    SET_CITY_LIST: (state, list) => {
      state.cityList = list;
    },
    CITY: (state, payload) => {
      const city = state.cityList.find((city) => city.id === payload.id);
      if (!city) {
        state.cityList = state.cityList.concat([payload]);
      }
      storage.saveCityList(state.cityList);
    },
    REMOVE_CITY: (state, id) => {
      state.cityList = state.cityList.filter((city) => city.id !== id);
      storage.saveCityList(state.cityList);
    },
    WEATHER: (state, payload) => {
      const weather = state.weather.find(
        (weather) => weather.id === payload.id
      );
      if (weather) {
        state.weather = state.weather.map((item) =>
          item.id === payload.id ? payload : item
        );
      } else {
        state.weather = state.weather.concat([payload]);
      }
    },
    REMOVE_WEATHER: (state, id) => {
      state.weather = state.weather.filter((weather) => weather.id !== id);
    },
    FORECAST: (state, forecast) => {
      state.forecast = forecast;
    },
    ADDITIONALLY: (state, additionally) => {
      state.additionally = additionally;
    },
    CLEAR: (state) => {
      state.forecast = null;
      state.additionally = null;
    },
  },

  getters: {
    cityList: (state) => {
      return state.cityList.map((city) => ({
        ...city,
        ...{ weather: state.weather.find((item) => item.id === city.id) },
      }));
    },
  },

  actions: {
    async INIT({ commit, dispatch }) {
      const list = storage.readCityList();
      if (list && Array.isArray(list)) {
        commit("SET_CITY_LIST", list);
      }

      geoFindMe()
        .then((coordinate) => dispatch("WEATHER", coordinate))
        .catch((err) => console.error(err));
    },
    async WEATHER({ commit }, query) {
      console.log(query);
      const queryStr = objectToQueryString(query);
      const response = await api.get(`${endpoints.weather}?${queryStr}`);
      if (response.statusText === "OK" && response.data?.cod === 200) {
        const { id, name } = response.data;
        commit("CITY", { id, name });
        commit("WEATHER", response.data);
      }
    },
    async FORECAST({ commit, dispatch }, query) {
      const queryStr = objectToQueryString(query);
      const response = await api.get(`${endpoints.forecast}?${queryStr}`);
      if (response.statusText === "OK" && response.data?.cod === "200") {
        commit("FORECAST", response.data);
        dispatch("ADDITIONALLY", response.data.city.coord);
      }
    },
    async ADDITIONALLY({ commit }, query) {
      const queryStr = objectToQueryString(query);
      const response = await api.get(`${endpoints.onecall}?${queryStr}`);
      if (response.statusText === "OK" && response.data) {
        commit("ADDITIONALLY", response.data);
      }
    },
    REMOVE_CITY({ commit }, id) {
      commit("REMOVE_CITY", id);
      commit("REMOVE_WEATHER", id);
    },
  },
  modules: {},
});

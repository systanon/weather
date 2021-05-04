import axios from "axios";

const config = {
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 5 * 1000,
};

const api = axios.create(config);

api.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;

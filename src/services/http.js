import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/";
// const BASE_URL = "https://phd-palchykov-api.onrender.com/api/v1/";

export const privateAPI = axios.create({
  baseURL: BASE_URL,
});

export const publicAPI = axios.create({
  baseURL: BASE_URL,
});

export const tokenOperations = {
  set(token) {
    privateAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    privateAPI.defaults.headers.common.Authorization = null;
  },
};

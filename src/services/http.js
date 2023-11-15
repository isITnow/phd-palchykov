import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

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

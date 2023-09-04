import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
});

export const privateAPI = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
});

export const publicAPI = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
});

export const token = {
  set(token) {
    privateAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    privateAPI.defaults.headers.common.Authorization = null;
  },
};

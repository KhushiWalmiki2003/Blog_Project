
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8061/api/user",
});

export const api1 = axios.create({
  baseURL: "http://localhost:8061/api/posts",
});

export const api2 = axios.create({
  baseURL: "http://localhost:8061/api/auth",
});

export const api3 = axios.create({
  baseURL: "http://localhost:8061/api/comments",
});

// Attach JWT to requests that need authentication
const attachToken = (config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

api1.interceptors.request.use(attachToken);
api.interceptors.request.use(attachToken);
api3.interceptors.request.use(attachToken);

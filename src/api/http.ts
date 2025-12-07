import axios from "axios";

export const http = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 8000,
});

http.interceptors.response.use(
  (res) => res,
  (error) => {
    return Promise.reject(error);
  },
);

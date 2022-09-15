import axios from "axios";
const __ORIGIN =
  process.env.NODE_ENV == "production" ? window.location.origin : "http://127.0.0.1:3000";
const axiosDefault = axios.create({
  baseURL: `${__ORIGIN}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosPrivate = axios.create({
  baseURL: `${__ORIGIN}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export {axiosDefault, axiosPrivate};

import axios from "axios";
import { key } from "../config/storage";

const authMiddleware = (config) => {
  const token = JSON.parse(localStorage.getItem(key.token));
  config.headers.Authorization = token ? token : "";
  return config;
};

const initAxios = () =>
  axios.create({
    baseURL: "http://localhost:4000",
    timeout: 20000,
  });

const axiosInstance = initAxios();

axiosInstance.defaults.headers.common.Accept = "application/json";
axiosInstance.interceptors.request.use(authMiddleware);

export { axiosInstance };

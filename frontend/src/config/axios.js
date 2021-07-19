import axios from "axios";

const initAxios = () =>
  axios.create({
    baseURL: "http://localhost:4000",
    timeout: 20000,
  });

const axiosInstance = initAxios();

axiosInstance.defaults.headers.common.Accept = "application/json";

export { axiosInstance };

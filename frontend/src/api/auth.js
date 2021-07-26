import { axiosInstance } from "../config/axios";

/**
 * Login an user
 * @param {Object}  data            User's data
 * @param {String}  data.email      User's email
 * @param {String}  data.password   User's password
 */
export const login = (data) => {
  return axiosInstance.post("/auth/login", data).then((res) => res.data);
};

/**
 * Check if token is still valid
 * @param {Object}  data         User's data
 * @param {String}  data.id      User's id
 * @param {String}  data.token   User's token
 */
export const checkLogin = (data) => {
  return axiosInstance.post("/auth/check", data).then((res) => res.status);
};

import { axiosInstance } from "../config/axios";

/**
 * Get all States
 */
export const getAllStates = () => {
  return axiosInstance.get("/states").then((res) => res.data);
};

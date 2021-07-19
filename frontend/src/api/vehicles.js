import { axiosInstance } from "../config/axios";

/**
 * Get all Vehicles
 */
export const getAllVehicles = () => {
  return axiosInstance.get("/vehicles").then((res) => res.data);
};

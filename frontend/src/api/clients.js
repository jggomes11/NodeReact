import { axiosInstance } from "../config/axios";

/**
 * Get all Clients
 */
export const getAllClients = () => {
  return axiosInstance.get("/client").then((res) => res.data);
};
/**
 * Get one Client
 * @param {Number} id employee id to be removed
 */
export const getOneClients = (id) => {
  return axiosInstance.delete(`/client/${id}`).then((res) => res.data);
};
/**
 * Create a Client
 * @param {Object} data user data to be integrated
 */
export const createClient = (data) => {
  return axiosInstance.post("/client/create", data).then((res) => res.data);
};
/**
 * Update a Client
 * @param {Object} data data to be updated
 */
export const updateClient = (data) => {
  return axiosInstance.put("/client/update", data).then((res) => res.data);
};
/**
 * Delete a Client
 * @param {Number} id employee id to be removed
 */
export const deleteClient = (id) => {
  return axiosInstance.delete(`/client/delete/${id}`).then((res) => res.data);
};

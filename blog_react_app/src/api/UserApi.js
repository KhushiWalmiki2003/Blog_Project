import { api } from "./api";
export const createUser = (user) => api.post("/", user);

export const getUsers = () => api.get("/");

export const getUserById = (id) => api.get(`/${id}`);

export const UpdateUser = (id, user) => api.put(`/${id}`, user);

export const deleteUser = (id) => api.delete(`/${id}`);

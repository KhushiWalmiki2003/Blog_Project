
import { api1 } from "./api";

export const createPost = (post, userId, categoryId) =>
  api1.post(`/user/${userId}/category/${categoryId}`, post);

export const getPosts = () => api1.get("/");

export const getPostById = (id) => api1.get(`/${id}`);

export const updatePost = (id, post) => api1.put(`/${id}`, post);

export const deletePost = (id) => api1.delete(`/${id}`);

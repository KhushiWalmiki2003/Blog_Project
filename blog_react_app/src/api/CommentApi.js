
import { api3 } from "./api";

export const addComment = (postId, comment) => {
  const token = localStorage.getItem("token");

  return api3.post(`/${postId}`, comment, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCommentsByPostId = (postId) => {
  return api3.get(`/${postId}`);
};

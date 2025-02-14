import { privateAPI, publicAPI } from './http';

const addComment = async ({ postId, body }) => {
  const data = await publicAPI.post(`/posts/${postId}/comments`, body);

  return data;
};

const deleteComment = async ({ postId, commentId }) => {
  const data = await privateAPI.delete(
    `/posts/${postId}/comments/${commentId}`
  );

  return data;
};

export const commentsApi = {
  addComment,
  deleteComment,
};

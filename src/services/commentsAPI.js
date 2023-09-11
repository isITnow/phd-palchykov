import { privateAPI, publicAPI } from "./http";

const postComment = async (post_id, body) => {
  const data = await publicAPI.post(`/posts/${post_id}/comments`, body);

  return data;
};

const deleteComment = async (post_id, comment_id) => {
  const data = await privateAPI.delete(
    `/posts/${post_id}/comments/${comment_id}`
  );

  return data;
};

export const publicationsAPI = {
  postComment,
  deleteComment,
};

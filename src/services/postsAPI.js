import { privateAPI, publicAPI } from "./http";

const fetchPosts = async () => {
  const data = await publicAPI.get("/posts");

  return data;
};

const postPost = async (body) => {
  const data = await privateAPI.post("/posts", body);

  return data;
};

const editPost = async (id, body) => {
  const data = await privateAPI.patch(`/post/${id}`, body);

  return data;
};

const deletePost = async (id) => {
  const data = await privateAPI.delete(`/post/${id}`);

  return data;
};

export const postsAPI = {
  fetchPosts,
  postPost,
  editPost,
  deletePost,
};

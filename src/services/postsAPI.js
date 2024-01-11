import { privateAPI, publicAPI } from "./http";

const editPost = async (id, body) => {
  const data = await privateAPI.patch(`/posts/${id}`, body);

  return data;
};

const deletePost = async (id) => {
  const data = await privateAPI.delete(`/posts/${id}`);

  return data;
};

const fetchOnePost = async (id) => {
  const data = await publicAPI.get(`/posts/${id}`);

  return data;
};

const fetchPosts = async (signal) => {
  const data = await publicAPI.get("/posts", { signal });

  return data;
};

const postPost = async (body) => {
  const data = await privateAPI.post("/posts", body);

  return data;
};

export const postsAPI = {
  editPost,
  deletePost,
  fetchOnePost,
  fetchPosts,
  postPost,
};

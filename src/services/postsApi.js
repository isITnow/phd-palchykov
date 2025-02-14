import { privateAPI, publicAPI } from '@/services/http';

const editPost = async ({ id, body }) => {
  const data = await privateAPI.patch(`/posts/${id}`, body);

  return data;
};

const deletePost = async ({ id }) => {
  const data = await privateAPI.delete(`/posts/${id}`);

  return data;
};

const fetchOnePost = async ({ id }, { signal }) => {
  const data = await publicAPI.get(`/posts/${id}`, { signal });

  return data;
};

const fetchPosts = async ({ signal }) => {
  const data = await publicAPI.get('/posts', { signal });

  return data;
};

const addPost = async ({ body }) => {
  const data = await privateAPI.post('/posts', body);

  return data;
};

export const postsApi = {
  editPost,
  deletePost,
  fetchOnePost,
  fetchPosts,
  addPost,
};

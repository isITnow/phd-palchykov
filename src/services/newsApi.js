import { privateAPI, publicAPI } from '@/services/http';

const deleteNews = async ({ id }) => {
  const data = await privateAPI.delete(`/news/${id}`);

  return data;
};

const editNews = async ({ id, body }) => {
  const data = await privateAPI.patch(`/news/${id}`, body);

  return data;
};

const fetchNews = async ({ signal }) => {
  const data = await publicAPI.get('/news', { signal });

  return data;
};

const fetchNewsById = async ({ id }, { signal }) => {
  const data = await publicAPI.get(`/news/${id}`, { signal });

  return data;
};

const addNews = async ({ body }) => {
  const data = await privateAPI.post('/news', body);

  return data;
};

export const newsApi = {
  addNews,
  deleteNews,
  editNews,
  fetchNews,
  fetchNewsById,
};

import { api } from "./http";

const fetchNews = async () => {
  const data = await api.get("/news");

  return data;
};

const postNews = async (body) => {
  const data = await api.post("/news", body);

  return data;
};

const deleteNews = async (id) => {
  const data = await api.delete(`/news/${id}`);

  return data;
};

const editNews = async (id, body) => {
  const data = await api.patch(`/news/${id}`, body);

  return data;
};

export const newsAPI = {
  fetchNews,
  postNews,
  deleteNews,
  editNews,
};

import { privateAPI, publicAPI } from "./http";

const fetchNews = async () => {
  const data = await publicAPI.get("/news");

  return data;
};

const postNews = async (body) => {
  const data = await privateAPI.post("/news", body);

  return data;
};

const deleteNews = async (id) => {
  const data = await privateAPI.delete(`/news/${id}`);

  return data;
};

const editNews = async (id, body) => {
  const data = await privateAPI.patch(`/news/${id}`, body);

  return data;
};

export const newsAPI = {
  fetchNews,
  postNews,
  deleteNews,
  editNews,
};

import { privateAPI, publicAPI } from "./http";

const deleteNews = async (id) => {
  const data = await privateAPI.delete(`/news/${id}`);

  return data;
};

const editNews = async (id, body) => {
  const data = await privateAPI.patch(`/news/${id}`, body);

  return data;
};
const fetchNews = async (signal) => {
  const data = await publicAPI.get("/news", { signal });

  return data;
};

const postNews = async (body) => {
  const data = await privateAPI.post("/news", body);

  return data;
};

export const newsAPI = {
  deleteNews,
  editNews,
  fetchNews,
  postNews,
};

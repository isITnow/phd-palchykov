import { api } from "./http";

const fetchNews = async () => {
  const data = await api.get("/news");

  return data;
};

const postNews = async (body) => {
  const data = await api.patch("/news", body);
  console.log("data: ", data);

  return data.data;
};

export const newsAPI = {
  fetchNews,
  postNews,
};

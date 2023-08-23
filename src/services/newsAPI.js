import { api } from "./http";

const fetchNews = async () => {
  const data = await api.get("/news");

  return data;
};

const postNews = async (body) => {
  console.log("newsAPI/request body: ", body);
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  const data = await api.post("/news", body, config);

  return data;
};

export const newsAPI = {
  fetchNews,
  postNews,
};

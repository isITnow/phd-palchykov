import { api } from "./http";

const fetchNews = async () => {
  const data = await api.get("/news");

  return data;
};

const postNews = async (body) => {
  console.log("newsAPI/request body: ", body);

  const data = await api.post("/news", body, {
    headers: {
      Accept: "application/json",
    },
  });

  return data;
};

export const newsAPI = {
  fetchNews,
  postNews,
};

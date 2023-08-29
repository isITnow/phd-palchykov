import { api } from "./http";

const fetchResearches = async () => {
  const data = await api.get("/researches");

  return data;
};

const postResearch = async (body) => {
  const data = await api.post("/researches", body);

  return data;
};

const deleteResearch = async (id) => {
  const data = await api.delete(`/researches/${id}`);

  return data;
};

export const researchesAPI = {
  postResearch,
  fetchResearches,
  deleteResearch,
};

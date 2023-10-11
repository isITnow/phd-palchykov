import { privateAPI, publicAPI } from "./http";

const fetchResearches = async () => {
  const data = await publicAPI.get("/researches");

  return data;
};

const postResearch = async (body) => {
  const data = await privateAPI.post("/researches", body);

  return data;
};

const editResearch = async (id, body) => {
  const data = await privateAPI.patch(`/researches/${id}`, body);

  return data;
};

const deleteResearch = async (id) => {
  const data = await privateAPI.delete(`/researches/${id}`);

  return data;
};

export const researchesAPI = {
  fetchResearches,
  postResearch,
  editResearch,
  deleteResearch,
};

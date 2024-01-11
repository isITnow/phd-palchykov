import { privateAPI, publicAPI } from "./http";

const editResearch = async (id, body) => {
  const data = await privateAPI.patch(`/researches/${id}`, body);

  return data;
};

const deleteResearch = async (id) => {
  const data = await privateAPI.delete(`/researches/${id}`);

  return data;
};

const fetchResearches = async (signal) => {
  const data = await publicAPI.get("/researches", { signal });

  return data;
};

const postResearch = async (body) => {
  const data = await privateAPI.post("/researches", body);

  return data;
};

export const researchesAPI = {
  editResearch,
  deleteResearch,
  fetchResearches,
  postResearch,
};

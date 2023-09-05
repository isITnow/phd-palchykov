import { privateAPI, publicAPI } from "./http";

const fetchColleagues = async () => {
  const data = await publicAPI.get("/colleagues");

  return data;
};

const postColleague = async (body) => {
  const data = await privateAPI.post("/colleagues", body, {});

  return data;
};

const deleteColleague = async (id) => {
  const data = await privateAPI.delete(`/colleagues/${id}`);

  return data;
};

const editColleague = async (id, body) => {
  const data = await privateAPI.patch(`/colleagues/${id}`, body);

  return data;
};

export const colleaguesAPI = {
  fetchColleagues,
  postColleague,
  deleteColleague,
  editColleague,
};

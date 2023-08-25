import { api } from "./http";

const fetchColleagues = async () => {
  const data = await api.get("/colleagues");

  return data;
};

const postColleague = async (body) => {
  console.log("colleaguesAPI/request body: ", body);

  const data = await api.post("/colleagues", body, {});

  return data;
};

const deleteColleague = async (id) => {
  const data = await api.delete(`/colleagues/${id}`, id);

  return data;
};

const editColleague = async (id, body) => {
  const data = await api.patch(`/colleagues/${id}`, body);

  return data;
};

export const colleaguesAPI = {
  fetchColleagues,
  postColleague,
  deleteColleague,
  editColleague,
};

import { privateAPI, publicAPI } from './http';

const editColleague = async ({ id, body }) => {
  const data = await privateAPI.patch(`/colleagues/${id}`, body);

  return data;
};

const deleteColleague = async (id) => {
  const data = await privateAPI.delete(`/colleagues/${id}`);

  return data;
};

const fetchColleagues = async ({ signal }) => {
  const data = await publicAPI.get('/colleagues', { signal });

  return data;
};

const fetchColleagueById = async ({ id }, { signal }) => {
  const data = await publicAPI.get(`/colleagues/${id}`, { signal });

  return data;
};

const addColleague = async (body) => {
  const data = await privateAPI.post('/colleagues', body, {});

  return data;
};

export const colleaguesApi = {
  addColleague,
  deleteColleague,
  editColleague,
  fetchColleagueById,
  fetchColleagues,
};

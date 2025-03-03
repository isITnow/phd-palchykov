import { privateAPI, publicAPI } from '@/services/http';

const editResearch = async ({ id, body }) => {
  const data = await privateAPI.patch(`/researches/${id}`, body);

  return data;
};

const deleteResearch = async ({ id }) => {
  const data = await privateAPI.delete(`/researches/${id}`);

  return data;
};

const fetchResearches = async ({ signal }) => {
  const data = await publicAPI.get('/researches', { signal });

  return data;
};

const fetchResearchById = async ({ id }, { signal }) => {
  const data = await publicAPI.get(`/researches/${id}`, { signal });

  return data;
};

const addResearch = async ({ body }) => {
  const data = await privateAPI.post('/researches', body);

  return data;
};

export const researchesApi = {
  addResearch,
  deleteResearch,
  editResearch,
  fetchResearchById,
  fetchResearches,
};

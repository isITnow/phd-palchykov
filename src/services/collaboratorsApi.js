import { privateAPI, publicAPI } from '@/services/http';

const editCollaborator = async ({ id, body }) => {
  const data = await privateAPI.patch(`/collaborators/${id}`, body);

  return data;
};

const deleteCollaborator = async ({ id }) => {
  const data = await privateAPI.delete(`/collaborators/${id}`);

  return data;
};

const fetchCollaborators = async ({ signal }) => {
  const data = await publicAPI.get('/collaborators', { signal });

  return data;
};

const fetchCollaboratorById = async ({ id }, { signal }) => {
  const data = await publicAPI.get(`/collaborators/${id}`, { signal });

  return data;
};

const addCollaborator = async ({ body }) => {
  const data = await privateAPI.post('/collaborators', body, {});

  return data;
};

export const collaboratorsApi = {
  addCollaborator,
  deleteCollaborator,
  editCollaborator,
  fetchCollaboratorById,
  fetchCollaborators,
};

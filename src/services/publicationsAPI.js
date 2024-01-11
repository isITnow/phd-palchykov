import { privateAPI, publicAPI } from "./http";

const editPublication = async (period_id, publication_id, body) => {
  const data = await privateAPI.patch(
    `/publication_periods/${period_id}/publications/${publication_id}`,
    body
  );

  return data;
};

const deletePublication = async (period_id, publication_id) => {
  const data = await privateAPI.delete(
    `/publication_periods/${period_id}/publications/${publication_id}`
  );

  return data;
};

const fetchPublications = async ({ id, signal }) => {
  const data = await publicAPI.get(`/publication_periods/${id}/publications`, {
    signal,
  });

  return data;
};

const postPublication = async (period_id, body) => {
  const data = await privateAPI.post(
    `/publication_periods/${period_id}/publications`,
    body
  );

  return data;
};

export const publicationsAPI = {
  editPublication,
  deletePublication,
  fetchPublications,
  postPublication,
};

import { privateAPI, publicAPI } from "./http";

const fetchPublications = async (period_id) => {
  const data = await publicAPI.get(
    `/publication_periods/${period_id}/publications`
  );

  return data;
};

const postPublication = async (period_id, body) => {
  const data = await privateAPI.post(
    `/publication_periods/${period_id}/publications`,
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

const editPublication = async (period_id, publication_id, body) => {
  const data = await privateAPI.patch(
    `/publication_periods/${period_id}/publications/${publication_id}`,
    body
  );

  return data;
};

export const publicationsAPI = {
  fetchPublications,
  postPublication,
  deletePublication,
  editPublication,
};

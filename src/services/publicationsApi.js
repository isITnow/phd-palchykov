import { privateAPI, publicAPI } from '@/services/http';

const editPublication = async ({ periodId, publicationId, body }) => {
  const data = await privateAPI.patch(
    `/publication_periods/${periodId}/publications/${publicationId}`,
    body
  );

  return data;
};

const deletePublication = async ({ periodId, publicationId }) => {
  const data = await privateAPI.delete(
    `/publication_periods/${periodId}/publications/${publicationId}`
  );

  return data;
};

const fetchPublications = async ({ periodId }, { signal }) => {
  const data = await publicAPI.get(
    `/publication_periods/${periodId}/publications`,
    { signal }
  );

  return data;
};

const fetchPublicationById = async (
  { periodId, publicationId },
  { signal }
) => {
  const data = await publicAPI.get(
    `/publication_periods/${periodId}/publications/${publicationId}`,
    { signal }
  );

  return data;
};

const addPublication = async ({ periodId, body }) => {
  const data = await privateAPI.post(
    `/publication_periods/${periodId}/publications`,
    body
  );

  return data;
};

export const publicationsApi = {
  addPublication,
  deletePublication,
  editPublication,
  fetchPublicationById,
  fetchPublications,
};

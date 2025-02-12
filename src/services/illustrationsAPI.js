import { privateAPI } from './http';

const addIllustration = async ({ researchId, body }) => {
  const data = await privateAPI.post(
    `/researches/${researchId}/illustrations`,
    body
  );

  return data;
};

const editIllustration = async ({ researchId, id, body }) => {
  const data = await privateAPI.patch(
    `/researches/${researchId}/illustrations/${id}`,
    body
  );

  return data;
};

//* Remove api doesn't implemented in the app

const deleteIllustration = async ({ researchId, id }) => {
  const data = await privateAPI.delete(
    `/researches/${researchId}/illustrations/${id}`
  );

  console.log('Illustration delete: ', data);
  return data;
};

export const illustrationsApi = {
  addIllustration,
  editIllustration,
  deleteIllustration,
};

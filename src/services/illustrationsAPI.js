import { privateAPI } from "./http";

const postIllustration = async (research_id, body) => {
  const data = await privateAPI.post(
    `/researches/${research_id}/illustrations`,
    body
  );

  return data;
};

const editIllustration = async (research_id, id, body) => {
  const data = await privateAPI.patch(
    `/researches/${research_id}/illustrations/${id}`,
    body
  );

  return data;
};

//* Remove api doesn't implemented in the app

const deleteIllustration = async (research_id, id) => {
  const data = await privateAPI.delete(
    `/researches/${research_id}/illustrations/${id}`
  );

  console.log("Illustration delete: ", data);
  return data;
};

export const illustrationsAPI = {
  postIllustration,
  editIllustration,
  deleteIllustration,
};

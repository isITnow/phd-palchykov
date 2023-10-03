import { privateAPI } from "./http";

const postIllustration = async (research_id, body) => {
  const data = await privateAPI.post(
    `/researches/${research_id}/illustrations`,
    body
  );

  return data;
};

export const illustrationsAPI = {
  postIllustration,
};

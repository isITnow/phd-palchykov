import { api } from "./http";

const postIllustration = async (research_id, body) => {
  const data = await api.post(`/researches/${research_id}/illustrations`, body);

  return data;
};

export const illustrationsAPI = {
  postIllustration,
};

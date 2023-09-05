import { publicAPI } from "./http";

const fetchPeriods = async () => {
  const data = await publicAPI.get("/publication_periods");

  return data;
};

export const periodsAPI = {
  fetchPeriods,
};

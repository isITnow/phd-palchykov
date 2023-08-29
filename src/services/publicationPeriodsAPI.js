import { api } from "./http";

const fetchPeriods = async () => {
  const data = await api.get("/publication_periods");

  return data;
};

export const periodsAPI = {
  fetchPeriods,
};

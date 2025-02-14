import { publicAPI } from '@/services/http';

const fetchPeriods = async () => {
  const data = await publicAPI.get('/publication_periods');

  return data;
};

export const periodsApi = {
  fetchPeriods,
};

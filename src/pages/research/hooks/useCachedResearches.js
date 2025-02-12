import { useQueryClient } from '@tanstack/react-query';

const useCachedResearches = () => {
  const queryClient = useQueryClient();
  const cachedResearches = queryClient.getQueryData(['researches']);

  return cachedResearches?.data;
};

export default useCachedResearches;

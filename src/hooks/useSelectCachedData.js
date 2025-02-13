import { useQueryClient } from '@tanstack/react-query';

const useSelectCachedData = (queryKey) => {
  const queryClient = useQueryClient();
  const cachedQuery = queryClient.getQueryData(queryKey);

  return cachedQuery?.data;
};

export default useSelectCachedData;

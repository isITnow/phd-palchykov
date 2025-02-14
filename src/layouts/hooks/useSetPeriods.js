import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

import { periodsApi } from '@/services/publicationPeriodsApi';
import { queryKeys } from '@/app/queryClient';
import useLocalStorage from '@/hooks/useLocalStorage';

const useSetPeriods = () => {
  const { getItem, setItem } = useLocalStorage('periods');

  const storedPeriods = getItem();

  const {
    data: periods,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: queryKeys.PERIODS,
    queryFn: periodsApi.fetchPeriods,
    enabled: !storedPeriods,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  if (isSuccess && periods && !storedPeriods) {
    setItem(periods.data);
  }

  if (isError && !storedPeriods) {
    toast.error('Periods are not available');
  }

  return { isError };
};

export default useSetPeriods;

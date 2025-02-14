import useLocalStorage from '@/hooks/useLocalStorage';

const useSelectPeriods = () => {
  const { getItem } = useLocalStorage('periods');

  return getItem();
};

export default useSelectPeriods;

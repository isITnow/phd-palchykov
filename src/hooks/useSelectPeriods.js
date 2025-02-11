import useLocalStorage from './useLocalStorage';

const useSelectPeriods = () => {
  const { getItem } = useLocalStorage('periods');

  return getItem();
};

export default useSelectPeriods;

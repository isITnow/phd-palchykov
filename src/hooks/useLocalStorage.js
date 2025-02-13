import { useCallback } from 'react';

const useLocalStorage = (key) => {
  const setItem = useCallback(
    (value) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error('Error setting localStorage:', error);
      }
    },
    [key]
  );

  const getItem = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.error('Error getting localStorage:', error);
      return undefined;
    }
  }, [key]);

  const removeItem = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing localStorage:', error);
    }
  }, [key]);

  return { setItem, getItem, removeItem };
};

export default useLocalStorage;

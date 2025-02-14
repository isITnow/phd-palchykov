import { useEffect } from 'react';

import { useUser } from '../context/UserContext';
import useLocalStorage from './useLocalStorage';

import { tokenOperations } from '../services/http';
import isTokenExpired from '../assets/utils/isTokenExpired';

const useRefreshAuth = () => {
  const { updateUser } = useUser();
  const { getItem, removeItem } = useLocalStorage('auth');

  useEffect(() => {
    const authData = getItem();
    if (!authData?.token) return;

    if (isTokenExpired(authData.token)) {
      console.warn('Token expired. Logging out...');
      tokenOperations.unset();
      removeItem();
      updateUser(null);
    } else {
      tokenOperations.set(authData.token);
      updateUser(authData.user);
    }
  }, [getItem, removeItem, updateUser]);

  return null;
};

export default useRefreshAuth;

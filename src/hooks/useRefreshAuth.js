import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

import { authApi } from '../services/authApi';
import { tokenOperations } from '../services/http';
import isTokenExpired from '../assets/utils/isTokenExpired';
import useLocalStorage from './useLocalStorage';

const useRefreshAuth = () => {
  const { getItem, removeItem } = useLocalStorage('auth');

  const { mutateAsync: mutateLogout } = useMutation({
    mutationFn: authApi.logoutUser,
  });

  useEffect(() => {
    const authData = getItem();

    if (!authData?.token) return;

    if (isTokenExpired(authData.token)) {
      tokenOperations.unset();
      removeItem();

      (async () => {
        try {
          await mutateLogout();
        } catch (error) {
          console.error('Failed to logout:', error);
        }
      })();
    } else {
      tokenOperations.set(authData.token);
    }
  }, [getItem, removeItem, mutateLogout]);

  return null;
};

export default useRefreshAuth;

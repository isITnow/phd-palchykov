import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useUser } from '../context/UserContext';
import useLocalStorage from './useLocalStorage';

import { authApi } from '../services/authApi';
import { tokenOperations } from '../services/http';
import isTokenExpired from '../assets/utils/isTokenExpired';

const useRefreshAuth = () => {
  const { updateUser } = useUser();
  const { getItem, removeItem } = useLocalStorage('auth');

  const { mutate: logoutMutation } = useMutation({
    mutationFn: authApi.logoutUser,
    onError: (error) => console.error('Failed to logout:', error),
    onSettled: () => {
      tokenOperations.unset();
      removeItem();
      updateUser(null);
    },
  });

  useEffect(() => {
    const authData = getItem();

    if (!authData?.token) return;

    if (isTokenExpired(authData.token)) {
      logoutMutation();
    } else {
      tokenOperations.set(authData.token);
    }
  }, [getItem, removeItem, logoutMutation, updateUser]);

  return null;
};

export default useRefreshAuth;

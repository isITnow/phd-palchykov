import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useUser } from '../../../context/UserContext';

import useLocalStorage from '../../../hooks/useLocalStorage';
import { authApi } from '../../../services/authApi';

const useAuth = () => {
  const { updateUser } = useUser();
  const [modalShow, setModalShow] = useState(false);
  const { removeItem } = useLocalStorage('auth');

  const { mutateAsync } = useMutation({
    mutationFn: authApi.logoutUser,
  });

  const logout = async () => {
    try {
      await mutateAsync();
    } catch (error) {
      console.error('Logout Error: ', error);
    } finally {
      removeItem();
      updateUser(null);
    }
  };

  return { modalShow, setModalShow, logout };
};

export default useAuth;

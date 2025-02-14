import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useUser } from '@/context/UserContext';

import useLocalStorage from '@/hooks/useLocalStorage';
import { authApi } from '@/services/authApi';
import { tokenOperations } from '@/services/http';

const useAuth = () => {
  const { updateUser } = useUser();
  const [modalShow, setModalShow] = useState(false);
  const { removeItem } = useLocalStorage('auth');

  const { mutate: logoutMutation } = useMutation({
    mutationFn: authApi.logoutUser,
    onError: (error) => console.error('Failed to logout:', error),
    onSettled: () => {
      tokenOperations.unset();
      removeItem();
      updateUser(null);
    },
  });

  return { modalShow, setModalShow, logout: logoutMutation };
};

export default useAuth;

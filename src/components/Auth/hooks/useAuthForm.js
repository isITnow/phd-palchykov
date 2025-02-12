import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

import { authApi } from '../../../services/authApi';
import { tokenOperations } from '../../../services/http';
import { useUser } from '../../../context/UserContext';
import useLocalStorage from '../../../hooks/useLocalStorage';

const useAuthForm = (closeModal) => {
  const { updateUser } = useUser();
  const { setItem } = useLocalStorage('auth');

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: authApi.loginUser,
    onSuccess: ({ data, headers }) => {
      const token = headers.authorization.split(' ')[1];
      const user = data.data;

      tokenOperations.set(token);
      setItem({ token, user });
      updateUser(user);

      toast.info(`Welcome back, ${user.username}!`);
      closeModal();
    },
    onError: (error) => toast.error(error.response.data),
  });

  const handleSubmit = async (values, actions) => {
    const { email, password } = values;

    const formData = new FormData();
    formData.append('user[email]', email.trim().toLowerCase());
    formData.append('user[password]', password.trim());

    loginMutation({ body: formData }, { onSuccess: actions.resetForm });
  };

  return { handleSubmit, isPending };
};

export default useAuthForm;

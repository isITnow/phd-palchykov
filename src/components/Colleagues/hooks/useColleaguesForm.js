import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { colleaguesApi } from '../../../services/colleaguesApi';
import navTabs from '../../../assets/navTabs';

const useColleaguesForm = (colleagueId) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createMutationConfig = (mutationFn, successMessage) => ({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(['colleagues']);
      navigate(navTabs.colleagues.path);
      toast.success(successMessage);
    },
    onError: (error) =>
      toast.error(error.response?.data?.message || 'Error occurred'),
    onSettled: () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  });

  const {
    mutateAsync: mutateAddColleague,
    isPending: isCreating,
  } = useMutation(
    createMutationConfig(colleaguesApi.addColleague, 'Card added successfully')
  );

  const {
    mutateAsync: mutateEditColleague,
    isPending: isEditing,
  } = useMutation(
    createMutationConfig(
      colleaguesApi.editColleague,
      'Card has been updated successfully'
    )
  );

  const handleSubmit = async (values, actions) => {
    const { name, position, phone, email, photo } = values;

    const formData = new FormData();
    formData.append('colleague[name]', name.trim());
    formData.append('colleague[position]', position.trim());

    if (phone) {
      formData.append('colleague[phone]', phone.trim());
    }

    if (email) {
      formData.append('colleague[email]', email.trim().toLowerCase());
    }

    if (photo) {
      formData.append('colleague[photo]', photo);
    }

    colleagueId
      ? await mutateEditColleague({ id: colleagueId, body: formData })
      : await mutateAddColleague(formData);
    actions.resetForm();
  };

  return { handleSubmit, isPending: isCreating || isEditing };
};

export default useColleaguesForm;

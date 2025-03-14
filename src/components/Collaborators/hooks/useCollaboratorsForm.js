import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { collaboratorsApi } from '@/services/collaboratorsApi';
import { queryKeys } from '@/utils/queryClient';
import navTabs from '@/utils/navTabs';

const useCollaboratorsForm = (collaboratorId) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createMutationConfig = (mutationFn, successMessage) => ({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.COLLABORATORS);
      navigate(navTabs.collaborators.path);
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

  const { mutate: addCollaboratorMutation, isPending: isCreating } =
    useMutation(
      createMutationConfig(collaboratorsApi.addCollaborator, 'Card added')
    );

  const { mutate: editCollaboratorMutation, isPending: isEditing } =
    useMutation(
      createMutationConfig(collaboratorsApi.editCollaborator, 'Card updated')
    );

  const handleSubmit = async (values, actions) => {
    const { name, position, category, photo, link } = values;

    const formData = new FormData();
    formData.append('name', name.trim());
    formData.append('position', position.trim());
    formData.append('category', category);

    if (link) {
      formData.append('link', link.trim());
    }

    if (photo) {
      formData.append('photo', photo);
    }

    collaboratorId
      ? editCollaboratorMutation(
          { id: collaboratorId, body: formData },
          { onSuccess: actions.resetForm }
        )
      : addCollaboratorMutation(
          { body: formData },
          { onSuccess: actions.resetForm }
        );
  };

  return { handleSubmit, isPending: isCreating || isEditing };
};

export default useCollaboratorsForm;

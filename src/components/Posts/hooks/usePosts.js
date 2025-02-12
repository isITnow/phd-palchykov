import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postsApi } from '../../../services/postsApi';
import { toast } from 'react-toastify';

const usePosts = ({ postId, onCloseForm }) => {
  const queryClient = useQueryClient();

  const createMutationConfig = (mutationFn, successMessage) => ({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      toast.success(successMessage);
      onCloseForm && onCloseForm();
    },
    onError: (error) =>
      toast.error(error.response?.data?.message || 'Error occurred'),
  });

  const { mutate: addPostMutation, isPending: isCreating } = useMutation(
    createMutationConfig(postsApi.addPost, 'Post added')
  );

  const { mutate: editPostMutation, isPending: isEditing } = useMutation(
    createMutationConfig(postsApi.editPost, 'Post updated')
  );

  const handleSubmit = async (values, actions) => {
    const { body } = values;

    const formData = new FormData();
    formData.append('post[body]', body.trim());

    postId
      ? editPostMutation(
          { id: postId, body: formData },
          { onSuccess: actions.resetForm }
        )
      : addPostMutation({ body: formData }, { onSuccess: actions.resetForm });
  };

  return { handleSubmit, isPending: isCreating || isEditing };
};

export default usePosts;

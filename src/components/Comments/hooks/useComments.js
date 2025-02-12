import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { commentsApi } from '../../../services/commentsApi';
import { useUser } from '../../../context/UserContext';
import { toast } from 'react-toastify';
import confirmationDialog from '../../../assets/utils/confirmationDialog';

const useComments = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { user } = useUser();

  // Add a comment

  const { mutate: addCommentMutation, isPending } = useMutation({
    mutationFn: commentsApi.addComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      toast.success('Comment published');
    },
    onError: (error) =>
      toast.error(error.response?.data?.message || 'Error occurred'),
  });

  const username = user?.username || null;

  const handleSubmit = async (values, actions) => {
    const { body, author, commentImage } = values;

    const formData = new FormData();
    formData.append('comment[author]', author.trim());
    formData.append('comment[body]', body.trim());

    if (commentImage) {
      formData.append('comment[comment_image]', commentImage);
    }

    addCommentMutation(
      { postId: id, body: formData },
      { onSuccess: actions.resetForm }
    );
  };

  // Delete a comment

  const { mutate: deleteCommentMutation } = useMutation({
    mutationFn: commentsApi.deleteComment,
    onSuccess: () => {
      toast.success('Comment deleted successfully');
      queryClient.invalidateQueries(['post', id]);
    },
    onError: (error) =>
      toast.error(error.response?.data?.message || 'Error occurred'),
  });

  const handleDelete = (commentId) => {
    confirmationDialog(
      () => deleteCommentMutation({ postId: id, commentId }),
      'Are you sure you want to delete?'
    );
  };

  return { handleSubmit, username, isPending, handleDelete };
};

export default useComments;

import { toast } from 'react-toastify';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

import { postsApi } from '@/services/postsApi';
import confirmationDialog from '@/utils/confirmationDialog';
import navTabs from '@/utils/navTabs';
import { queryKeys } from '@/utils/queryClient';

const usePost = () => {
  const { id } = useParams();

  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch Post by ID

  const { data: post, isError: isFetchingError } = useSuspenseQuery({
    queryKey: queryKeys.POST(id),
    queryFn: (meta) => postsApi.fetchOnePost({ id }, meta),
  });

  const comments = post?.data?.comments;

  // Delete Post

  const { mutate: deletePostMutation, isPending } = useMutation({
    mutationFn: postsApi.deletePost,
    onSuccess: () => {
      toast.success('Post deleted successfully');
      queryClient.invalidateQueries(queryKeys.POSTS);
      navigate(navTabs.posts.path);
    },
    onError: (error) =>
      toast.error(error.response?.data?.message || 'Error deleting post'),
  });

  const handleDelete = () => {
    confirmationDialog(
      () => deletePostMutation({ id }),
      'Are you sure you want to delete?'
    );
  };

  return {
    comments,
    handleDelete,
    isPending,
    post,
    setShowForm,
    showForm,
    isFetchingError,
  };
};

export default usePost;

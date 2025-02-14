import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { newsApi } from '../../../services/newsApi';
import { queryKeys } from '../../../queryClient';
import navTabs from '../../../assets/navTabs';

const useNewsForm = (newsId) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createMutationConfig = (mutationFn, successMessage) => ({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.NEWS);
      navigate(navTabs.news.path);
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

  // Add news

  const { mutate: addNewsMutation, isPending: isCreating } = useMutation(
    createMutationConfig(newsApi.addNews, 'News added')
  );

  // Edit news

  const { mutate: editNewsMutation, isPending: isEditing } = useMutation(
    createMutationConfig(newsApi.editNews, 'News updated')
  );

  const handleSubmit = async (values, actions) => {
    const { title, body, date, image, links } = values;

    const formData = new FormData();
    formData.append('body', body.trim());
    formData.append('date', date.trim());
    formData.append('title', title.trim());

    if (links.length) {
      links.forEach((element) => {
        formData.append('links[]', element.trim());
      });
    }

    if (image) {
      formData.append('image', image);
    }

    newsId
      ? editNewsMutation(
          { id: newsId, body: formData },
          { onSuccess: actions.resetForm }
        )
      : addNewsMutation({ body: formData }, { onSuccess: actions.resetForm });
  };

  return { handleSubmit, isPending: isCreating || isEditing };
};

export default useNewsForm;

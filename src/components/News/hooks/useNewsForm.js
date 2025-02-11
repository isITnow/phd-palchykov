import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { newsApi } from '../../../services/newsApi';
import navTabs from '../../../assets/navTabs';

const useNewsForm = (newsId) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createMutationConfig = (mutationFn, successMessage) => ({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(['news']);
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

  const { mutateAsync: mutateAddNews, isPending: isCreating } = useMutation(
    createMutationConfig(newsApi.addNews, 'News has been added successfully')
  );

  // Edit news

  const { mutateAsync: mutateEditNews, isPending: isEditing } = useMutation(
    createMutationConfig(newsApi.editNews, 'News has been updated successfully')
  );

  const handleSubmit = async (values, actions) => {
    const { title, body, date, image, links } = values;

    const formData = new FormData();
    formData.append('news[body]', body.trim());
    formData.append('news[date]', date.trim());
    formData.append('news[title]', title.trim());

    if (links.length) {
      links.forEach((element) => {
        formData.append('news[links][]', element.trim());
      });
    }

    if (image) {
      formData.append('news[image]', image);
    }

    newsId
      ? await mutateEditNews({ id: newsId, body: formData })
      : await mutateAddNews({ body: formData });
    actions.resetForm();
  };

  return { handleSubmit, isPending: isCreating || isEditing };
};

export default useNewsForm;

import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { queryKeys } from '@/app/queryClient';
import { researchesApi } from '@/services/researchesApi';
import navTabs from '@/utils/navTabs';

const useEditResearch = (research) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: editResearchMutation, isPending } = useMutation({
    mutationFn: researchesApi.editResearch,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.RESEARCHES);
      navigate(navTabs.researches.path);
      toast.success('Research updated');
    },
    onError: (error) =>
      toast.error(error.response?.data?.message || 'Error occurred'),
  });

  const handleSubmit = ({ title, sourceList }, actions) => {
    const researchFormData = new FormData();
    const payload = {
      title,
      sourceList,
    };
    researchFormData.append('payload', JSON.stringify(payload));

    editResearchMutation(
      { body: researchFormData, id: research.id },
      { onSuccess: actions.resetForm }
    );
  };

  return { handleSubmit, isPending };
};

export default useEditResearch;

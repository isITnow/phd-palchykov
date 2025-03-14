import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { illustrationsApi } from '@/services/illustrationsApi';
import { queryKeys } from '@/utils/queryClient';
import { researchesApi } from '@/services/researchesApi';
import navTabs from '@/utils/navTabs';

const useCreateResearch = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutateAsync: addResearchMutation, isPending } = useMutation({
    mutationFn: researchesApi.addResearch,
  });

  const handleSubmit = async ({ title, illustrationList, sourceList }) => {
    let illustrationsData = [];
    illustrationList.forEach(({ schema, description, sequence_number }) => {
      const formData = new FormData();
      formData.append('description', description.trim());
      formData.append('schema', schema);
      formData.append('sequence_number', sequence_number);
      illustrationsData.push(formData);
    });

    const researchFormData = new FormData();
    const payload = { sourceList, title };
    researchFormData.append('payload', JSON.stringify(payload));

    try {
      const researchResp = await addResearchMutation({
        body: researchFormData,
      });

      if (researchResp.status === 201) {
        const researchId = researchResp.data.id;

        await Promise.all(
          illustrationsData.map((illustration) =>
            illustrationsApi.addIllustration({ researchId, body: illustration })
          )
        );

        toast.success('Research created');
        queryClient.invalidateQueries(queryKeys.RESEARCHES);
        navigate(navTabs.researches.path);
        window.scrollTo({ behavior: 'smooth', top: 0 });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return { handleSubmit, isPending };
};

export default useCreateResearch;

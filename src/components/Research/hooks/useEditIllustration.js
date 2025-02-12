import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { illustrationsApi } from '../../../services/illustrationsApi';
import navTabs from '../../../assets/navTabs';

const useEditIllustration = ({ illustration, researchId }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: editIllustrationMutation, isPending } = useMutation({
    mutationFn: illustrationsApi.editIllustration,
    onSuccess: () => {
      queryClient.invalidateQueries(['illustrations']);
      navigate(navTabs.researches.path);
      toast.success('Illustration updated');
    },
  });

  const handleSubmit = ({ description, sequence_number, schema }, actions) => {
    const illustrationFormData = new FormData();
    illustrationFormData.append('description', description.trim());
    illustrationFormData.append('sequence_number', sequence_number);
    if (schema) {
      illustrationFormData.append('schema', schema);
    }

    editIllustrationMutation({
      body: illustrationFormData,
      id: illustration.id,
      researchId,
    });
  };

  return { handleSubmit, isPending };
};

export default useEditIllustration;

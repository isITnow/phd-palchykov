import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { publicationsApi } from '../../../services/publicationsApi';
import { queryKeys } from '../../../queryClient';
import getCurrentPeriod from '../../../assets/utils/getCurrentEntity';
import getYearsArray from '../../../assets/utils/getYearsArray';
import navTabs from '../../../assets/navTabs';
import useSelectPeriods from '../../../hooks/useSelectPeriods';

const usePublicationForm = (publicationId) => {
  const { periodId } = useParams();
  const periods = useSelectPeriods();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createMutationConfig = (mutationFn, successMessage) => ({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.PUBLICATIONS(periodId));
      navigate(navTabs.publications.path(periodId));
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

  // Add publication

  const { mutate: addPublicationMutation, isPending: isCreating } = useMutation(
    createMutationConfig(publicationsApi.addPublication, 'Publication added')
  );

  // Edit publication

  const { mutate: editPublicationMutation, isPending: isEditing } = useMutation(
    createMutationConfig(publicationsApi.editPublication, 'Publication updated')
  );

  const currentPeriod = getCurrentPeriod(periods, parseInt(periodId));
  const periodYears = getYearsArray(currentPeriod).length
    ? getYearsArray(currentPeriod)
    : ['no data'];

  const handleSubmit = async (values, actions) => {
    const {
      abstract,
      authors,
      cover,
      sequence_number,
      source_url,
      source,
      title,
      year,
    } = values;

    const formData = new FormData();
    formData.append('publication[sequence_number]', sequence_number);
    formData.append('publication[source_url]', source_url.trim());
    formData.append('publication[source]', source.trim());
    formData.append('publication[title]', title.trim());
    formData.append('publication[title]', title.trim());
    formData.append('publication[year]', year);
    if (authors.length) {
      authors.forEach((item) => {
        formData.append('publication[authors][]', item.trim());
      });
    }
    if (cover) {
      formData.append('publication[cover]', cover);
    }
    if (abstract) {
      formData.append('publication[abstract]', abstract);
    }

    publicationId
      ? editPublicationMutation(
          {
            periodId,
            publicationId,
            body: formData,
          },
          { onSuccess: actions.resetForm }
        )
      : addPublicationMutation(
          { periodId, body: formData },
          { onSuccess: actions.resetForm }
        );
  };

  return {
    handleSubmit,
    isPending: isCreating || isEditing,
    periodId,
    periodYears,
  };
};

export default usePublicationForm;

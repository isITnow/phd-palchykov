import { useParams } from 'react-router-dom';

import useSelectCachedData from '@/hooks/useSelectCachedData';
import useSelectPeriods from '@/hooks/useSelectPeriods';

import { Col } from 'react-bootstrap';
import FormCard from '@/components/FormComponents/FormCard';
import NoItemToEdit from '@/components/shared/NoItemToEdit';
import PublicationForm from '@/components/Publications/PublicationForm';

import { queryKeys } from '@/utils/queryClient';
import getCurrentPeriod from '@/utils/getCurrentEntity';
import navTabs from '@/utils/navTabs';

const PublicationOperationsPage = () => {
  const { periodId, publicationId } = useParams();
  const periods = useSelectPeriods();
  const cachedPublications = useSelectCachedData(
    queryKeys.PUBLICATIONS(periodId)
  );

  const publication = cachedPublications?.find(
    ({ id }) => id === Number(publicationId)
  );

  const isEditAction = !!publicationId;
  const currentPeriod = getCurrentPeriod(periods, parseInt(periodId));
  const title = isEditAction
    ? `Edit Publication [period: ${currentPeriod.title}]`
    : `Create Publication [period: ${currentPeriod.title}]`;

  if (isEditAction && !publication) {
    return (
      <NoItemToEdit
        backPath={navTabs.publications.path(periodId)}
        item="Publication"
      />
    );
  }

  return (
    <Col lg="8" className="mx-auto">
      <FormCard title={title}>
        <PublicationForm publication={isEditAction ? publication : null} />
      </FormCard>
    </Col>
  );
};

export default PublicationOperationsPage;

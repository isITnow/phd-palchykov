import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Col } from 'react-bootstrap';
import FormCard from '../../components/FormComponents/FormCard';
import Loader from '../../components/shared/Loader';
import NoItemToEdit from '../../components/shared/NoItemToEdit';
import PublicationForm from '../../components/Publications/PublicationForm';

import { publicationsApi } from '../../services/publicationsApi';
import getCurrentPeriod from '../../assets/utils/getCurrentEntity';
import navTabs from '../../assets/navTabs';
import useSelectPeriods from '../../hooks/useSelectPeriods';

const PublicationOperationsPage = () => {
  const { periodId, publicationId } = useParams();
  const periods = useSelectPeriods();

  const isEditAction = !!publicationId;

  const { data: publication, isLoading } = useQuery({
    queryKey: ['single-publication', publicationId],
    queryFn: (meta) =>
      publicationsApi.fetchPublicationById({ periodId, publicationId }, meta),
    enabled: isEditAction,
  });

  const currentPeriod = getCurrentPeriod(periods, parseInt(periodId));
  const title = isEditAction
    ? `Edit Publication [period: ${currentPeriod.title}]`
    : `Create Publication [period: ${currentPeriod.title}]`;

  if (isLoading) {
    return <Loader />;
  }

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
      <FormCard
        title={title}
        body={
          <PublicationForm
            publication={isEditAction ? publication.data : null}
          />
        }
      />
    </Col>
  );
};

export default PublicationOperationsPage;

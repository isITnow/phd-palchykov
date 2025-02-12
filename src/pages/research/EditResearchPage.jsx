import { Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import EditResearchForm from '../../components/Research/EditResearchForm';
import Loader from '../../components/shared/Loader';
import NoItemToEdit from '../../components/shared/NoItemToEdit';

import { researchesApi } from '../../services/researchesApi';
import navTabs from '../../assets/navTabs';

const EditResearchPage = () => {
  const { id } = useParams();

  const { data: research, isLoading } = useQuery({
    queryKey: ['research', id],
    queryFn: (meta) => researchesApi.fetchResearchById({ id }, meta),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!research) {
    return <NoItemToEdit backPath={navTabs.researches.path} item="Research" />;
  }

  return (
    <Col lg="8" className="mx-auto">
      <EditResearchForm research={research.data} />
    </Col>
  );
};

export default EditResearchPage;

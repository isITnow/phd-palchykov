import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Col } from 'react-bootstrap';
import ColleagueForm from '../components/Colleagues/ColleagueForm';
import FormCard from '../components/FormComponents/FormCard';
import Loader from '../components/shared/Loader';
import NoItemToEdit from '../components/shared/NoItemToEdit';

import navTabs from '../assets/navTabs';
import { colleaguesApi } from '../services/colleaguesApi';

const ColleagueOperationsPage = () => {
  const { id } = useParams();
  const isEditOperation = !!id;

  const { data, isLoading } = useQuery({
    queryKey: ['colleague', id],
    queryFn: (meta) => colleaguesApi.fetchColleagueById({ id }, meta),
    enabled: isEditOperation,
  });

  const colleague = data?.data;

  const title = isEditOperation
    ? 'Edit Colleague Card'
    : 'Create Colleague Card';

  if (isLoading) {
    return <Loader />;
  }

  if (isEditOperation && !colleague) {
    return <NoItemToEdit backPath={navTabs.colleagues.path} item="Colleague" />;
  }

  return (
    <Col lg="8" className="mx-auto">
      <FormCard
        title={title}
        body={<ColleagueForm colleague={isEditOperation ? colleague : null} />}
      />
    </Col>
  );
};

export default ColleagueOperationsPage;

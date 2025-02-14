import { useParams } from 'react-router-dom';

import { Col } from 'react-bootstrap';
import ColleagueForm from '@/components/Colleagues/ColleagueForm';
import FormCard from '@/components/FormComponents/FormCard';
import NoItemToEdit from '@/components/shared/NoItemToEdit';

import { queryKeys } from '@/app/queryClient';
import navTabs from '@/utils/navTabs';
import useSelectCachedData from '@/hooks/useSelectCachedData';

const ColleagueOperationsPage = () => {
  const { id: colleagueId } = useParams();
  const cachedColleagues = useSelectCachedData(queryKeys.COLLEAGUES);

  const isEditOperation = !!colleagueId;
  const colleague = cachedColleagues?.find(
    ({ id }) => id === Number(colleagueId)
  );

  const title = isEditOperation
    ? 'Edit Colleague Card'
    : 'Create Colleague Card';

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

import { Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import EditResearchForm from '../../components/Research/EditResearchForm';
import NoItemToEdit from '../../components/shared/NoItemToEdit';

import { queryKeys } from '../../queryClient';
import navTabs from '../../assets/navTabs';
import useSelectCachedData from '../../hooks/useSelectCachedData';

const EditResearchPage = () => {
  const { id: researchId } = useParams();
  const cachedResearches = useSelectCachedData(queryKeys.RESEARCHES);

  const research = cachedResearches?.find(
    ({ id }) => id === Number(researchId)
  );

  if (!research) {
    return <NoItemToEdit backPath={navTabs.researches.path} item="Research" />;
  }

  return (
    <Col lg="8" className="mx-auto">
      <EditResearchForm research={research} />
    </Col>
  );
};

export default EditResearchPage;

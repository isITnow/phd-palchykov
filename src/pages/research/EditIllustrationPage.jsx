import { Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import EditIllustrationForm from '../../components/Research/EditIllustrationForm';
import NoItemToEdit from '../../components/shared/NoItemToEdit';

import useCachedResearches from './hooks/useCachedResearches';
import navTabs from '../../assets/navTabs';

const EditIllustrationPage = () => {
  const { researchId, id: illustrationId } = useParams();
  const cachedResearches = useCachedResearches();

  const research = cachedResearches?.find(
    ({ id }) => id === Number(researchId)
  );
  const illustrationToEdit = research?.illustrations.find(
    ({ id }) => id === Number(illustrationId)
  );

  if (!research || !illustrationToEdit) {
    return (
      <NoItemToEdit backPath={navTabs.researches.path} item="Illustration" />
    );
  }

  return (
    <Col lg="8" className="mx-auto">
      <EditIllustrationForm
        researchId={research.id}
        illustration={illustrationToEdit}
      />
    </Col>
  );
};

export default EditIllustrationPage;

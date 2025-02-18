import { useParams } from 'react-router-dom';
import { Col } from 'react-bootstrap';

import CollaboratorForm from '@/components/Collaborators/CollaboratorForm';
import FormCard from '@/components/FormComponents/FormCard';
import NoItemToEdit from '@/components/shared/NoItemToEdit';

import { queryKeys } from '@/app/queryClient';
import navTabs from '@/utils/navTabs';
import useSelectCachedData from '@/hooks/useSelectCachedData';

const CollaboratorOperationsPage = () => {
  const { id: collaboratorId } = useParams();
  const cachedCollaborators = useSelectCachedData(queryKeys.COLLABORATORS);

  const isEditOperation = !!collaboratorId;
  const collaborator = cachedCollaborators?.find(
    ({ id }) => id === Number(collaboratorId)
  );

  const title = isEditOperation
    ? 'Edit Collaborator Card'
    : 'Create Collaborator Card';

  if (isEditOperation && !collaborator) {
    return (
      <NoItemToEdit backPath={navTabs.collaborators.path} item="Collaborator" />
    );
  }

  return (
    <Col lg="8" className="mx-auto">
      <FormCard
        title={title}
        body={
          <CollaboratorForm
            collaborator={isEditOperation ? collaborator : null}
          />
        }
      />
    </Col>
  );
};

export default CollaboratorOperationsPage;

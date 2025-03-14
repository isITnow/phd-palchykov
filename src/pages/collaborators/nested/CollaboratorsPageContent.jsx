import { Link } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';

import CollaborationCategory from '@/pages/collaborators/nested/CollaborationCategory';
import CollaboratorsList from '@/components/Collaborators/CollaboratorsList';
import IsLoggedIn from '@/components/shared/IsLoggedIn.jsx';

import { collaboratorsApi } from '@/services/collaboratorsApi.js';
import { queryKeys } from '@/utils/queryClient.js';
import getCollaboratorsByCategory from '@/pages/collaborators/helpers/getCollaboratorsByCategory';
import navTabs from '@/utils/navTabs.js';

const CollaboratorsPageContent = () => {
  const { data: collaborators } = useSuspenseQuery({
    queryKey: queryKeys.COLLABORATORS,
    queryFn: (meta) => collaboratorsApi.fetchCollaborators(meta),
  });

  const { alumni, international, local } = getCollaboratorsByCategory(
    collaborators?.data
  );

  return (
    <>
      {!!local.length && (
        <CollaborationCategory
          classnames="mb-4 pb-4 border-bottom"
          title="Collaborations in Ukraine"
        >
          <CollaboratorsList collaborators={local} />
        </CollaborationCategory>
      )}
      {!!international.length && (
        <CollaborationCategory
          classnames="mb-4 pb-4 border-bottom"
          title="International Collaborations"
        >
          <CollaboratorsList collaborators={international} />
        </CollaborationCategory>
      )}
      {!!alumni.length && (
        <CollaborationCategory title="Alumni">
          <CollaboratorsList collaborators={alumni} />
        </CollaborationCategory>
      )}
      <IsLoggedIn>
        <div className="d-flex flex-row-reverse mt-3">
          <Link
            className="btn btn-primary"
            to={navTabs.collaborators.createPath}
          >
            Add Collaborator
          </Link>
        </div>
      </IsLoggedIn>
    </>
  );
};

export default CollaboratorsPageContent;

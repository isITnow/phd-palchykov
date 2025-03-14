import { Suspense } from 'react';

import CollaboratorsPageContent from '@/pages/collaborators/nested/CollaboratorsPageContent';
import Loader from '@/components/shared/Loader';

const CollaboratorsPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <CollaboratorsPageContent />
    </Suspense>
  );
};

export default CollaboratorsPage;

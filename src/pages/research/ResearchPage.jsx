import { Link } from 'react-router-dom';
import { Suspense } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import IsLoggedIn from '@/components/shared/IsLoggedIn';
import Loader from '@/components/shared/Loader';
import ResearchList from '@/components/Research/ResearchList';

import { queryKeys } from '@/utils/queryClient';
import { researchesApi } from '@/services/researchesApi';
import navTabs from '@/utils/navTabs';

const ResearchPage = () => {
  const { data: researches } = useSuspenseQuery({
    queryKey: queryKeys.RESEARCHES,
    queryFn: (meta) => researchesApi.fetchResearches(meta),
  });

  return (
    <Suspense fallback={<Loader />}>
      <ResearchList researches={researches.data} />
      <IsLoggedIn>
        <div className="d-flex flex-row-reverse">
          <Link className="btn btn-primary" to={navTabs.researches.createPath}>
            Add Research
          </Link>
        </div>
      </IsLoggedIn>
    </Suspense>
  );
};

export default ResearchPage;

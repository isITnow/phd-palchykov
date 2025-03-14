import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import IsLoggedIn from '@/components/shared/IsLoggedIn';
import Loader from '@/components/shared/Loader';
import ResearchList from '@/components/Research/ResearchList';

import { queryKeys } from '@/utils/queryClient';
import { researchesApi } from '@/services/researchesApi';
import navTabs from '@/utils/navTabs';

const ResearchPage = () => {
  const { data: researches, isLoading } = useQuery({
    queryKey: queryKeys.RESEARCHES,
    queryFn: (meta) => researchesApi.fetchResearches(meta),
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <ResearchList researches={researches.data} />
      <IsLoggedIn>
        <div className="d-flex flex-row-reverse">
          <Link className="btn btn-primary" to={navTabs.researches.createPath}>
            Add Research
          </Link>
        </div>
      </IsLoggedIn>
    </>
  );
};

export default ResearchPage;

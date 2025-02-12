import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import IsLoggedIn from '../../components/shared/IsLoggedIn';
import Loader from '../../components/shared/Loader';
import ResearchList from '../../components/Research/ResearchList';

import { researchesApi } from '../../services/researchesApi';
import navTabs from '../../assets/navTabs';

const ResearchPage = () => {
  const { data: researches, isLoading } = useQuery({
    queryKey: ['researches'],
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

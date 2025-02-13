import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import ColleaguesList from '../../components/Colleagues/ColleaguesList';
import IsLoggedIn from '../../components/shared/IsLoggedIn.jsx';
import Loader from '../../components/shared/Loader';

import { colleaguesApi } from '../../services/colleaguesApi.js';
import { queryKeys } from '../../queryClient.js';
import navTabs from '../../assets/navTabs.js';

const ColleaguesPage = () => {
  const { data: colleagues, isLoading } = useQuery({
    queryKey: queryKeys.COLLEAGUES,
    queryFn: (meta) => colleaguesApi.fetchColleagues(meta),
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <ColleaguesList colleagues={colleagues.data} />
      <IsLoggedIn>
        <div className="d-flex flex-row-reverse mt-3">
          <Link className="btn btn-primary" to={navTabs.colleagues.createPath}>
            Add Colleague
          </Link>
        </div>
      </IsLoggedIn>
    </>
  );
};

export default ColleaguesPage;

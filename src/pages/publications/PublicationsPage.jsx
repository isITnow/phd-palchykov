import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import IsLoggedIn from '@/components/shared/IsLoggedIn';
import Loader from '@/components/shared/Loader';
import PublicationsList from '@/components/Publications/PublicationsList';
import PublicationsPageNav from './nested/PublicationsPageNav';

import { publicationsApi } from '@/services/publicationsApi';
import { queryKeys } from '@/app/queryClient';
import navTabs from '@/utils/navTabs';

const PublicationsPage = () => {
  const { periodId } = useParams();

  const {
    data: publications,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: queryKeys.PUBLICATIONS(periodId),
    queryFn: (meta) => publicationsApi.fetchPublications({ periodId }, meta),
  });

  useEffect(() => {
    if (isFetched) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [isFetched]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PublicationsPageNav className="mb-3" />
      <PublicationsList publications={publications.data} />
      <div className="d-flex justify-content-between mt-3">
        <IsLoggedIn>
          <Link
            className="btn btn-primary"
            to={navTabs.publications.createPath(periodId)}
          >
            Add Publication
          </Link>
        </IsLoggedIn>
      </div>
      {publications.length > 4 && <PublicationsPageNav />}
    </>
  );
};

export default PublicationsPage;

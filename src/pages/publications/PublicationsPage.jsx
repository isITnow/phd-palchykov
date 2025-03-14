import { Link, useParams } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import IsLoggedIn from '@/components/shared/IsLoggedIn';
import Loader from '@/components/shared/Loader';
import PublicationsList from '@/components/Publications/PublicationsList';
import PublicationsPageNav from './nested/PublicationsPageNav';

import { publicationsApi } from '@/services/publicationsApi';
import { queryKeys } from '@/utils/queryClient';
import navTabs from '@/utils/navTabs';

const PublicationsPage = () => {
  const { periodId } = useParams();

  const { data: publications, isFetched } = useSuspenseQuery({
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

  return (
    <Suspense fallback={<Loader />}>
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
    </Suspense>
  );
};

export default PublicationsPage;

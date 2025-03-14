import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';

import IsLoggedIn from '@/components/shared/IsLoggedIn';
import Loader from '@/components/shared/Loader';
import NewsList from '@/components/News/NewsList';

import { newsApi } from '@/services/newsApi';
import { queryKeys } from '@/utils/queryClient';
import navTabs from '@/utils/navTabs';

const NewsPage = () => {
  const { data: news } = useSuspenseQuery({
    queryKey: queryKeys.NEWS,
    queryFn: (meta) => newsApi.fetchNews(meta),
  });

  return (
    <Suspense fallback={<Loader />}>
      <NewsList news={news.data} />
      <IsLoggedIn>
        <div className="d-flex flex-row-reverse mt-3">
          <Link className="btn btn-primary" to={navTabs.news.createPath}>
            Add News
          </Link>
        </div>
      </IsLoggedIn>
    </Suspense>
  );
};

export default NewsPage;

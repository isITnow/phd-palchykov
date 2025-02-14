import { Link } from 'react-router-dom';
import { newsApi } from '@/services/newsApi';
import { useQuery } from '@tanstack/react-query';

import NewsList from '@/components/News/NewsList';
import IsLoggedIn from '@/components/shared/IsLoggedIn';
import Loader from '@/components/shared/Loader';

import navTabs from '@/utils/navTabs';
import { queryKeys } from '@/app/queryClient';

const NewsPage = () => {
  const { data: news, isLoading } = useQuery({
    queryKey: queryKeys.NEWS,
    queryFn: (meta) => newsApi.fetchNews(meta),
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <NewsList news={news.data} />
      <IsLoggedIn>
        <div className="d-flex flex-row-reverse mt-3">
          <Link className="btn btn-primary" to={navTabs.news.createPath}>
            Add News
          </Link>
        </div>
      </IsLoggedIn>
    </>
  );
};

export default NewsPage;

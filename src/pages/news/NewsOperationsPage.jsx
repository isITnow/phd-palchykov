import { useParams } from 'react-router-dom';
import { Col } from 'react-bootstrap';

import FormCard from '@/components/FormComponents/FormCard';
import NewsForm from '@/components/News/NewsForm';
import NoItemToEdit from '@/components/shared/NoItemToEdit';

import { queryKeys } from '@/utils/queryClient';
import navTabs from '@/utils/navTabs';
import useSelectCachedData from '@/hooks/useSelectCachedData';

const NewsOperationsPage = () => {
  const { id: newsId } = useParams();
  const cachedNewsList = useSelectCachedData(queryKeys.NEWS);

  const isEditAction = !!newsId;
  const news = cachedNewsList?.find(({ id }) => id === Number(newsId));
  const title = isEditAction ? 'Edit News Card' : 'Create News Card';

  if (isEditAction && !news) {
    return <NoItemToEdit backPath={navTabs.news.path} item="News" />;
  }

  return (
    <Col lg="8" className="mx-auto">
      <FormCard title={title}>
        <NewsForm newsItem={isEditAction ? news : null} />
      </FormCard>
    </Col>
  );
};

export default NewsOperationsPage;

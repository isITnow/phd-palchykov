import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Col } from 'react-bootstrap';
import FormCard from '../components/FormComponents/FormCard';
import NewsForm from '../components/News/NewsForm';
import NoItemToEdit from '../components/shared/NoItemToEdit';

import { newsApi } from '../services/newsApi';
import Loader from '../components/shared/Loader';
import navTabs from '../assets/navTabs';

const NewsOperationsPage = () => {
  const { id } = useParams();
  const isEditAction = !!id;

  const { data, isLoading } = useQuery({
    queryKey: ['single-news', id],
    queryFn: (meta) => newsApi.fetchNewsById({ id }, meta),
    enabled: isEditAction,
  });

  const news = data?.data;

  if (isLoading) {
    return <Loader />;
  }

  const title = isEditAction ? 'Edit News Card' : 'Create News Card';

  if (isEditAction && !news) {
    return <NoItemToEdit backPath={navTabs.news.path} item="News" />;
  }

  return (
    <Col lg="8" className="mx-auto">
      <FormCard
        title={title}
        body={<NewsForm newsItem={isEditAction ? news : null} />}
      />
    </Col>
  );
};

export default NewsOperationsPage;

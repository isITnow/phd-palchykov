import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useImageLoading from '@/hooks/useImageLoading';

import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  CardTitle,
} from 'react-bootstrap';
import ImageLoadingSpinner from '@/components/shared/ImageLoadingSpinner';
import IsLoggedIn from '@/components/shared/IsLoggedIn';

import { newsApi } from '@/services/newsApi';
import { queryKeys } from '@/app/queryClient';
import confirmationDialog from '@/utils/confirmationDialog';

const NewsItem = ({ news }) => {
  const queryClient = useQueryClient();
  const { imageIsLoaded, handleImageLoad } = useImageLoading();

  const { mutate: deleteNewsMutation, isPending } = useMutation({
    mutationFn: newsApi.deleteNews,
    onSuccess: () => {
      toast.success('News deleted');
      queryClient.invalidateQueries(queryKeys.NEWS);
    },
    onError: (error) =>
      toast.error(error.response?.data?.message || 'Error occurred'),
  });

  const { id, title, body, date, links, image_data } = news;

  const handleDelete = () => {
    confirmationDialog(
      () => deleteNewsMutation({ id }),
      'Are you sure you want to delete?'
    );
  };

  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle className="text-danger mb-0">{title}</CardTitle>
      </CardHeader>
      <CardBody>
        {body && <CardText style={{ textAlign: 'justify' }}>{body}</CardText>}
        {image_data && (
          <div className="mt-2" style={{ minHeight: '100px' }}>
            {!imageIsLoaded && <ImageLoadingSpinner />}
            <img
              className="img-fluid"
              src={image_data.image_url}
              alt={image_data.filename}
              onLoad={handleImageLoad}
              onError={handleImageLoad}
            />
          </div>
        )}
        {links?.length > 0 && (
          <ul>
            {links.map((url, indx) => (
              <li key={indx} className="mt-3">
                <a
                  className="mb-3"
                  href={url}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  {url}
                </a>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
      <CardFooter className="text-body-secondary">
        <div className="d-flex justify-content-between">
          {date}
          <IsLoggedIn>
            <ButtonGroup>
              <Link
                className="btn btn-sm btn-primary"
                to={`/news/${id}/edit`}
                state={news}
              >
                Edit
              </Link>
              <Button
                disabled={isPending}
                size="sm"
                type="button"
                variant="danger"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </ButtonGroup>
          </IsLoggedIn>
        </div>
      </CardFooter>
    </Card>
  );
};

export default NewsItem;

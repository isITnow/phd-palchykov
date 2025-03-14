import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardSubtitle,
  Col,
  Row,
} from 'react-bootstrap';

import IsLoggedIn from '@/components/shared/IsLoggedIn';
import PublicationImage from '@/components/Publications/PublicationImage';

import { publicationsApi } from '@/services/publicationsApi';
import confirmationDialog from '@/utils/confirmationDialog';
import { queryKeys } from '@/utils/queryClient';

const Publication = ({ publication }) => {
  const {
    abstract_data,
    authors,
    cover_data,
    id,
    publication_period_id: publicationPeriodId,
    sequence_number,
    source_url,
    source,
    title,
    year,
  } = publication;

  const queryClient = useQueryClient();

  const { mutate: deletePublicationMutation, isPending } = useMutation({
    mutationFn: publicationsApi.deletePublication,
    onSuccess: () => {
      toast.success('Publication deleted successfully');
      queryClient.invalidateQueries(
        queryKeys.PUBLICATIONS(publicationPeriodId)
      );
    },
    onError: (error) =>
      toast.error(error.response?.data?.message || 'Error occurred'),
  });

  const handleDelete = () => {
    confirmationDialog(
      () =>
        deletePublicationMutation({
          periodId: publicationPeriodId,
          publicationId: id,
        }),
      'Are you sure you want to delete?'
    );
  };

  const isYear = year !== 'no data';

  return (
    <Card className="h-100 shadow-sm border-0">
      <CardBody className="d-flex flex-column justify-content-between">
        <div>
          <div className="d-flex">
            <span className="me-2 text-secondary fs-5 lh-sm">
              {sequence_number}.
            </span>
            <h5 className="card-title text-danger">{title}</h5>
          </div>
          {cover_data && abstract_data ? (
            <Row md={2} className="mt-2">
              <Col>
                <PublicationImage
                  url={cover_data.cover_url}
                  alt={cover_data.filename}
                  metadata={cover_data.metadata}
                />
              </Col>
              <Col>
                <CardSubtitle className="mt-2">
                  {authors.join('; ')}
                </CardSubtitle>
                <a href={source_url} target="_blank" rel="noreferrer noopener">
                  <p className="fst-italic mt-2">{source}</p>
                </a>
              </Col>
            </Row>
          ) : (
            <div>
              <CardSubtitle className="mt-2">{authors.join('; ')}</CardSubtitle>
              <a href={source_url} target="_blank" rel="noreferrer noopener">
                <p className="fst-italic mt-2">{source}</p>
              </a>
            </div>
          )}
          <div className="mt-3">
            <PublicationImage
              url={abstract_data?.abstract_url || cover_data?.cover_url}
              alt={abstract_data?.filename || cover_data?.filename}
              metadata={abstract_data?.metadata || cover_data?.metadata}
            />
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end mt-3">
          {isYear && (
            <small className="fst-italic text-secondary">year: {year}</small>
          )}
          <IsLoggedIn>
            <ButtonGroup>
              <Link
                className="btn btn-sm btn-primary"
                to={`/periods/${publicationPeriodId}/publications/${id}/edit`}
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
      </CardBody>
    </Card>
  );
};

export default Publication;

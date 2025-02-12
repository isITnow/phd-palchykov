import { Button, ButtonGroup, CardTitle, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Illustration from './Illustration';
import IsLoggedIn from '../shared/IsLoggedIn';

import { researchesApi } from '../../services/researchesApi';
import confirmationDialog from '../../assets/utils/confirmationDialog';
import navTabs from '../../assets/navTabs';

const Research = ({ research, index }) => {
  const { id, title, illustrations, source_list: sourceList } = research;
  const queryClient = useQueryClient();

  const { mutate: deleteResearchMutation, isPending } = useMutation({
    mutationFn: researchesApi.deleteResearch,
    onSuccess: () => {
      queryClient.invalidateQueries(['researches']);
      toast.success('Research deleted');
    },
    onError: (error) =>
      toast.error(error.response?.data?.message || 'Error occurred'),
  });

  const handleDelete = () => {
    confirmationDialog(
      () => deleteResearchMutation({ id }),
      'Are you sure you want to delete?'
    );
  };

  const sourceListClass =
    sourceList.length > 8
      ? 'row row-cols-1 row-cols-md-2 row-cols-lg-3'
      : 'row row-cols-1';

  return (
    <div id={index}>
      <div className="d-flex mb-2 justify-content-center">
        <span className="me-2 text-secondary fs-5 lh-sm">{index}.</span>
        <CardTitle className="text-danger">{title}</CardTitle>
      </div>
      {illustrations.map((illustration) => (
        <Illustration
          key={illustration.id}
          researchId={research.id}
          {...illustration}
        />
      ))}
      <div className="">
        <p className="mb-2">Our relevant works:</p>
        <ul className={sourceListClass}>
          {sourceList.map(({ source_url, source }, index) => (
            <Col as={'li'} key={index}>
              <a href={source_url} target="_blank" rel="noreferrer noopener">
                <span className="fst-italic">{source}</span>
              </a>
            </Col>
          ))}
        </ul>
      </div>
      <IsLoggedIn>
        <div className="mt-3 d-flex justify-content-end">
          <ButtonGroup>
            <Link
              className="btn btn-sm btn-primary"
              to={navTabs.researches.editPath(research.id)}
            >
              Edit Research
            </Link>
            <Button
              disabled={isPending}
              size="sm"
              type="button"
              variant="danger"
              onClick={handleDelete}
            >
              Delete Research
            </Button>
          </ButtonGroup>
        </div>
      </IsLoggedIn>
    </div>
  );
};

export default Research;

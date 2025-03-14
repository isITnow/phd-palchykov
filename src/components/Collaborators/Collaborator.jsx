import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import s from '@/components/Collaborators/collaborators.module.css';

import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
} from 'react-bootstrap';
import IsLoggedIn from '../shared/IsLoggedIn';

import { collaboratorsApi } from '@/services/collaboratorsApi';
import { queryKeys } from '@/utils/queryClient';
import confirmationDialog from '@/utils/confirmationDialog';
import navTabs from '@/utils/navTabs';

const Collaborator = ({ collaborator }) => {
  const queryClient = useQueryClient();

  const { mutate: deleteCollaboratorMutation, isPending } = useMutation({
    mutationFn: collaboratorsApi.deleteCollaborator,
    onSuccess: () => {
      toast.success('Collaborator card deleted');
      queryClient.invalidateQueries(queryKeys.COLLABORATORS);
    },
    onError: (error) => toast.error(error.response?.data?.message),
  });

  const {
    id,
    link,
    name,
    photo_data: { filename, photo_url },
    position,
  } = collaborator;

  const handleDelete = () => {
    confirmationDialog(
      () => deleteCollaboratorMutation({ id }),
      'Are you sure you want to delete?'
    );
  };

  // TODO: implement spinner while photo is loading

  const getCardProps = (link) =>
    link
      ? {
          as: 'a',
          href: link,
          target: '_blank',
          rel: 'noopener noreferrer',
          className: `border-0 h-100 pt-3 ${s.hoverEffect}`,
        }
      : { as: 'div', className: 'border-0 h-100 pt-3' };

  return (
    <Card {...getCardProps(link)}>
      <CardImg
        src={photo_url}
        alt={filename}
        className={`mx-auto w-50 ${s.img}`}
      />
      <CardBody className="text-center d-flex flex-column">
        <CardTitle className="fw-bold">{name}</CardTitle>
        <CardText className="fw-semibold text-muted">{position}</CardText>
        <IsLoggedIn>
          <ButtonGroup className="pt-3 mt-auto">
            <Link
              className="btn btn-sm btn-primary"
              to={navTabs.collaborators.editPath(id)}
              state={collaborator}
            >
              Edit
            </Link>
            <Button
              size="sm"
              type="button"
              variant="danger"
              disabled={isPending}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </ButtonGroup>
        </IsLoggedIn>
      </CardBody>
    </Card>
  );
};

export default Collaborator;

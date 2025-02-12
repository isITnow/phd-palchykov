import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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

import { colleaguesApi } from '../../services/colleaguesApi';
import confirmationDialog from '../../assets/utils/confirmationDialog';

const Colleague = ({ colleague }) => {
  const queryClient = useQueryClient();

  const { mutate: deleteColleagueMutation, isPending } = useMutation({
    mutationFn: colleaguesApi.deleteColleague,
    onSuccess: () => {
      toast.success('Colleague card deleted successfully');
      queryClient.invalidateQueries(['colleagues']);
    },
    onError: (error) => toast.error(error.response.data.message),
  });

  const {
    id,
    name,
    position,
    photo_data: { filename, photo_url },
    phone,
    email,
  } = colleague;

  const handleDelete = () => {
    confirmationDialog(
      () => deleteColleagueMutation({ id }),
      'Are you sure you want to delete?'
    );
  };

  // TODO: implement spinner while photo is loading

  return (
    <Card className="h-100 shadow-sm">
      <CardImg variant="top" src={photo_url} alt={filename} />
      <CardBody className="text-center d-flex flex-column">
        <CardTitle className="fw-bold">{name}</CardTitle>
        <CardText className="fw-semibold text-muted">{position}</CardText>
        {(email || phone) && (
          <ul className="mt-3">
            {email && (
              <li className="mb-2">
                <a className="py-2" href={`mailto:${email}`}>
                  {email}
                </a>
              </li>
            )}
            {phone && (
              <li>
                <a className="py-2" href={`tel:${phone}`}>
                  {phone}
                </a>
              </li>
            )}
          </ul>
        )}
        <IsLoggedIn>
          <ButtonGroup className="pt-3 mt-auto">
            <Link
              className="btn btn-sm btn-primary"
              to={`/colleagues/${id}/edit`}
              state={colleague}
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

export default Colleague;

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeColleagueThunk } from "../../redux/colleagues/operationsColleagues";
import { selectColleagues } from "../../redux/colleagues/selectorColleagues";

import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
} from "react-bootstrap";
import IsLoggedIn from "../shared/IsLoggedIn";

import confirmationDialog from "../../assets/utils/confirmationDialog";

const Colleague = ({ colleague }) => {
  const { id, name, position, photo_url, phone, email } = colleague;
  const { status } = useSelector(selectColleagues);
  const dispatch = useDispatch();

  const btnDisabled = status === "pending";

  const handleDelete = () => {
    confirmationDialog(
      () => dispatch(removeColleagueThunk(id)),
      "Are you sure you want to delete?"
    );
  };

  return (
    <Card className="h-100 shadow-sm">
      <CardImg variant="top" src={photo_url} />
      <CardBody className="text-center">
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
          <ButtonGroup className="mt-3">
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
              disabled={btnDisabled}
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

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removePublicationThunk } from "../../redux/publications/operationsPublications";
import { selectPublications } from "../../redux/publications/selectorPublications";

import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardSubtitle,
  Col,
  Row,
} from "react-bootstrap";
import IsLoggedIn from "../shared/IsLoggedIn";

import confirmationDialog from "../../assets/utils/confirmationDialog";
import s from "./publication.module.css";

const Publication = ({ publication }) => {
  const {
    abstract_url,
    authors,
    cover_url,
    id,
    publication_period_id,
    sequence_number,
    source_url,
    source,
    title,
    year,
  } = publication;

  const { status } = useSelector(selectPublications);
  const dispatch = useDispatch();

  const btnDisabled = status === "pending";
  const isYear = year !== "no data";

  const handleDelete = () => {
    confirmationDialog(
      () =>
        dispatch(
          removePublicationThunk({
            period_id: publication_period_id,
            publication_id: id,
          })
        ),
      "Are you sure you want to delete?"
    );
  };

  return (
    <Card className="h-100 shadow-sm">
      <CardBody className="d-flex flex-column justify-content-between">
        <div>
          <div className="d-flex">
            <span className="me-2 text-secondary fs-5 lh-sm">
              {sequence_number}.
            </span>
            <h5 className="card-title text-danger">{title}</h5>
          </div>
          {cover_url && abstract_url ? (
            <Row md={2} className="mt-2">
              <Col>
                <img
                  alt={cover_url}
                  className={`shadow rounded ${s.img}`}
                  src={cover_url}
                />
              </Col>
              <Col>
                <CardSubtitle className="mt-2">
                  {authors.join("; ")}
                </CardSubtitle>
                <a href={source_url} target="_blank" rel="noreferrer noopener">
                  <p className="fst-italic mt-2">{source}</p>
                </a>
              </Col>
            </Row>
          ) : (
            <div>
              <CardSubtitle className="mt-2">{authors.join("; ")}</CardSubtitle>
              <a href={source_url} target="_blank" rel="noreferrer noopener">
                <p className="fst-italic mt-2">{source}</p>
              </a>
            </div>
          )}
          <div className="mt-3">
            <img
              alt={abstract_url || cover_url}
              className={`shadow  rounded ${s.img}`}
              src={abstract_url || cover_url}
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
                to={`/periods/${publication_period_id}/publications/${id}/edit`}
              >
                Edit
              </Link>
              <Button
                disabled={btnDisabled}
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

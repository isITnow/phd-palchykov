import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeResearchThunk } from "../../redux/researches/operationsResearches";
import { selectResearches } from "../../redux/researches/selectorResearches";

import { Button, ButtonGroup, CardTitle, Col } from "react-bootstrap";
import IsLoggedIn from "../shared/IsLoggedIn";
import Illustration from "./Illustration";

import confirmationDialog from "../../assets/utils/confirmationDialog";

const Research = ({ research, index }) => {
  const { id, title, illustrations, sourceList } = research;

  const { status } = useSelector(selectResearches);
  const dispatch = useDispatch();

  const btnDisabled = status === "pending";
  const sourceListClass =
    sourceList.length > 8
      ? "row row-cols-1 row-cols-md-2 row-cols-lg-3"
      : "row row-cols-1";

  const handleDelete = () => {
    confirmationDialog(
      () => dispatch(removeResearchThunk(id)),
      "Are you sure you want to delete?"
    );
  };

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
            <Col as={"li"} key={index}>
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
              to={`/researches/${id}/edit`}
            >
              Edit Research
            </Link>
            <Button
              disabled={btnDisabled}
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

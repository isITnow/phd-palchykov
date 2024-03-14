import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeResearchThunk } from "../../redux/researches/operationsResearches";
import { selectResearches } from "../../redux/researches/selectorResearches";

import { Button, ButtonGroup, CardTitle, Col } from "react-bootstrap";
import IsLoggedIn from "../shared/IsLoggedIn";

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
      {illustrations.map(({ id, schema_url, description }) => (
        <div key={id} className="mb-2">
          <p
            className="mb-1"
            style={{ textIndent: "2rem", textAlign: "justify" }}
          >
            {description}
          </p>
          <Col
            xs={12}
            md={11}
            lg={9}
            className="mx-auto d-flex justify-content-center"
          >
            <img className="img-fluid" src={schema_url} alt="schema" />
          </Col>
          <IsLoggedIn>
            <div className="d-flex justify-content-end border-bottom border-2 py-3">
              <Link
                className="btn btn-sm btn-primary"
                to={`/researches/${research.id}/illustrations/${id}/edit`}
              >
                Edit Illustration
              </Link>
            </div>
          </IsLoggedIn>
        </div>
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

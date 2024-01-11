import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { removeResearchThunk } from "../../redux/researches/operationsResearches";
import { selectResearches } from "../../redux/researches/selectorResearches";

import IsLoggedIn from "../shared/IsLoggedIn";

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
    dispatch(removeResearchThunk(id));
  };

  return (
    <div id={index}>
      <div className="d-flex mb-2 justify-content-center">
        <span className="me-2 text-secondary fs-5 lh-sm">{index}.</span>
        <h5 className="card-title text-danger">{title}</h5>
      </div>
      {illustrations.map(({ id, schema_url, description }) => (
        <div key={id} className="mb-2">
          <p
            className="mb-1"
            style={{ textIndent: "2rem", textAlign: "justify" }}
          >
            {description}
          </p>
          <div className="col-12 col-md-11 col-lg-9 mx-auto d-flex justify-content-center">
            <img className="img-fluid" src={schema_url} alt="schema" />
          </div>
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
            <li className="col" key={index}>
              <a href={source_url} target="_blank" rel="noreferrer noopener">
                <span className="fst-italic">{source}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <IsLoggedIn>
        <div className="mt-3 d-flex justify-content-end">
          <div className="btn-group">
            <Link
              className="btn btn-sm btn-primary"
              to={`/researches/${id}/edit`}
            >
              Edit Research
            </Link>
            <button
              disabled={btnDisabled}
              type="button"
              className="btn btn-sm btn-danger"
              onClick={handleDelete}
            >
              Delete Research
            </button>
          </div>
        </div>
      </IsLoggedIn>
    </div>
  );
};

export default Research;

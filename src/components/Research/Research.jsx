import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeResearchThunk } from "../../redux/researches/operationsResearches";
import { selectResearches } from "../../redux/researches/selectorResearches";

import useSignInStatus from "../../assets/customHooks/useSignInStatus";

const Research = ({ research, index }) => {
  const { id, title, illustrations, sourceList } = research;
  const { status } = useSelector(selectResearches);
  const dispatch = useDispatch();
  const isLoggedIn = useSignInStatus();
  const btnDisabled = status === "pending";

  const handleClick = () => {
    // alert("Are you sure you want to delete item?");
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
          <div className="p-3 text-center">
            <img className="img-fluid" src={schema_url} alt="schema" />
          </div>
          {isLoggedIn && (
            <div className="d-flex justify-content-end border-bottom border-2 pb-3">
              <Link
                className="btn btn-sm btn-primary"
                to={`/researches/${research.id}/illustrations/${id}/edit`}
              >
                edit Illustration
              </Link>
            </div>
          )}
        </div>
      ))}
      <div className="d-flex justify-content-between align-items-end">
        <div className="ms-4">
          <p className="mb-2">Our relevant works:</p>
          <ul style={{ fontSize: "0.75rem" }}>
            {sourceList.map(({ source_url, source }, index) => (
              <li key={index}>
                <a href={source_url} target="_blank" rel="noreferrer noopener">
                  <span className="fst-italic">{source}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        {isLoggedIn && (
          <div className="btn-group">
            <Link
              className="btn btn-sm btn-primary"
              to={`/researches/${id}/edit`}
            >
              edit Research
            </Link>
            <button
              disabled={btnDisabled}
              type="button"
              className="btn btn-sm btn-danger"
              onClick={() => {
                handleClick();
              }}
            >
              delete Research
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Research;

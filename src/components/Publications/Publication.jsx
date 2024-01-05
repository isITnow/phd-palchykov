import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { removePublicationThunk } from "../../redux/publications/operationsPublications";
import { selectPublications } from "../../redux/publications/selectorPublications";

import useSignInStatus from "../../assets/customHooks/useSignInStatus";

import s from "./publication.module.css";

const Publication = ({ publication }) => {
  const {
    id,
    publication_period_id,
    title,
    year,
    sequence_number,
    authors,
    source,
    source_url,
    cover_url,
    abstract_url,
  } = publication;

  const { status } = useSelector(selectPublications);
  const isLoggedIn = useSignInStatus();
  const dispatch = useDispatch();

  const btnDisabled = status === "pending";
  const isYear = year !== "no data";

  const handleDelete = () => {
    dispatch(
      removePublicationThunk({
        period_id: publication_period_id,
        publication_id: id,
      })
    );
  };

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <div className="d-flex">
            <span className="me-2 text-secondary fs-5 lh-sm">
              {sequence_number}.
            </span>
            <h5 className="card-title text-danger">{title}</h5>
          </div>
          {cover_url && abstract_url ? (
            <div className="row row-cols-2 mt-2">
              <div className="col">
                <img
                  src={cover_url}
                  className={`shadow rounded ${s.img}`}
                  alt={cover_url}
                />
              </div>
              <div className="col">
                <p className="card-subtitle mt-2">{authors.join("; ")}</p>
                <a href={source_url} target="_blank" rel="noreferrer noopener">
                  <p className="fst-italic mt-2">{source}</p>
                </a>
              </div>
            </div>
          ) : (
            <div>
              <p className="card-subtitle mt-2">{authors.join("; ")}</p>
              <a href={source_url} target="_blank" rel="noreferrer noopener">
                <p className="fst-italic mt-2">{source}</p>
              </a>
            </div>
          )}
          <div className="mt-3">
            <img
              src={abstract_url || cover_url}
              className={`shadow  rounded ${s.img}`}
              alt={abstract_url || cover_url}
            />
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end mt-3">
          {isYear && (
            <small className="fst-italic text-secondary">year: {year}</small>
          )}
          {isLoggedIn && (
            <div className="btn-group">
              <Link
                className="btn btn-sm btn-primary"
                to={`/periods/${publication_period_id}/publications/${id}/edit`}
              >
                edit
              </Link>
              <button
                disabled={btnDisabled}
                type="button"
                className="btn btn-sm btn-danger"
                onClick={handleDelete}
              >
                delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Publication;

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { removePublicationThunk } from "../../redux/publications/operationsPublications";
import { selectPublications } from "../../redux/publications/selectorPublications";

import s from "./publication.module.css";

const Publication = ({ publication }) => {
  const { id, title, authors, source, source_url, cover_url, abstract_url } =
    publication;
  const { period_id } = useParams();
  const { status } = useSelector(selectPublications);
  const btnDisabled = status === "pending";
  const dispatch = useDispatch();

  const handleClick = () => {
    alert("Are you sure you want to delete item?");
    dispatch(removePublicationThunk({ period_id, publication_id: id }));
  };

  return (
    <div className={`card h-100 ${s.hoverEffect}`}>
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <div className="d-flex">
            <span className="me-2 text-secondary fs-5 lh-sm">{id}.</span>
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
        <div className="text-end mt-3">
          <div className="btn-group">
            <Link
              className="btn btn-sm btn-primary"
              to={`/periods/${period_id}/publications/${id}/edit`}
            >
              edit
            </Link>
            <button
              disabled={btnDisabled}
              type="button"
              className="btn btn-sm btn-danger"
              onClick={() => {
                handleClick();
              }}
            >
              delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publication;

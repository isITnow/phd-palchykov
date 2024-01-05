import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { removeNewsThunk } from "../../redux/news/operationsNews";
import { selectNews } from "../../redux/news/selectorNews";

import useSignInStatus from "../../assets/customHooks/useSignInStatus";

const NewsItem = ({ news }) => {
  const { id, title, body, image_url, date, links } = news;
  const isLoggedIn = useSignInStatus();
  const { status } = useSelector(selectNews);
  const btnDisabled = status === "pending";
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeNewsThunk(id));
  };

  return (
    <div className="card text-center">
      <div className="card-header">
        <h5 className="card-title text-danger mb-0">{title}</h5>
      </div>
      <div className="card-body">
        {body && (
          <p className="card-text" style={{ textAlign: "justify" }}>
            {body}
          </p>
        )}
        {image_url && (
          <div className="">
            <img className="img-fluid" src={image_url} alt="..." />
          </div>
        )}
        {links?.length > 0 && (
          <ul>
            {links.map((url, indx) => (
              <li key={indx} className="mt-3">
                <a
                  className="mb-3"
                  href={url}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {url}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="card-footer text-body-secondary">
        <div className="d-flex justify-content-between">
          {date}
          {isLoggedIn && (
            <div className="btn-group">
              <Link
                className="btn btn-sm btn-primary"
                to={`/news/${id}/edit`}
                state={news}
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

export default NewsItem;

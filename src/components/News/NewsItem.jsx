import { Link } from "react-router-dom";

const NewsItem = ({ news, onDelete, btnDisable }) => {
  const { id, title, body, image_url, date, links } = news;

  const handleClick = (id) => {
    alert("Are you sure you want to delete item?");
    onDelete(id);
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
          <div className="btn-group">
            <Link
              className="btn bnt-sm btn-primary"
              to={`/news/${id}/edit`}
              state={news}
            >
              edit
            </Link>
            <button
              disabled={btnDisable}
              type="button"
              className="btn bnt-sm btn-danger"
              onClick={() => handleClick(id)}
            >
              delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;

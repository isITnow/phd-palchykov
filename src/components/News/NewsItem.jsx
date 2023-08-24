import { useState } from "react";
import { Link } from "react-router-dom";
import { newsAPI } from "../../services/newsAPI";

const NewsItem = ({ news }) => {
  const { id, title, body, image_url, date, links } = news;
  const [isDisabled, setIsDisabled] = useState(false);

  const deleteHandler = async () => {
    setIsDisabled(true);
    try {
      const response = await newsAPI.deleteNews(id);
      if (response.status === 204) {
        console.log("DELETE SUCCESS");
      } else {
        console.log("Failed to delete record.");
      }
    } catch (error) {
      console.log("Error occurred while deleting the record:", error);
      console.log("DELETE Error: ", error.message);
    } finally {
      setIsDisabled(false);
    }
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
              disabled={isDisabled}
              type="button"
              className="btn bnt-sm btn-danger"
              onClick={deleteHandler}
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

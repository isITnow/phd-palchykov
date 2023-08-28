import s from "./publication.module.css";

const Publication = ({ publication }) => {
  const { id, title, authors, source, source_url, cover_url, abstract_url } =
    publication;
  return (
    <div className={`card h-100 ${s.hoverEffect}`}>
      <div className="card-body">
        <div className="d-flex">
          <span className="me-2 text-secondary fs-5 lh-sm">{id}.</span>
          <h5 className="card-title text-danger">{title}</h5>
        </div>
        {/* {cover_url && abstract_url ? (
          <div className="row row-cols-2 mt-2">
            <div className="col">
              <img
                src={require(`../../assets/images/publications/${cover_url}`)}
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
        )} */}
        {/* <div className="mt-3">
          <img
            src={require(`../../assets/images/publications/${
              abstract_url || cover_url
            }`)}
            className={`shadow  rounded ${s.img}`}
            alt={abstract_url || cover_url}
          />
        </div> */}
      </div>
    </div>
  );
};

export default Publication;

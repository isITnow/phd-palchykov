import s from "./publication.module.css";

const Publication = ({ publication }) => {
  const { id, title, authors, source, url, cover_img, abstract_img } =
    publication;
  return (
    <div className={`card h-100 ${s.hoverEffect}`}>
      <div className="card-body">
        <div className="d-flex">
          <span className="me-2 text-secondary fs-5 lh-sm">{id}.</span>
          <h5 className="card-title text-danger">{title}</h5>
        </div>
        <div className="row row-cols-2 mt-2">
          <div className="col">
            <img
              src={require(`../../assets/images/covers/${cover_img}`)}
              className={s.img}
              alt="..."
            />
          </div>
          <div className="col">
            <p className="card-subtitle mt-2">{authors.join("; ")}</p>
            <a href={url} target="_blank" rel="noreferrer noopener">
              <p className="fst-italic mt-2">{source}</p>
            </a>
          </div>
        </div>
        <div className="row row-cols-1 mt-3">
          <div className="mt-2">
            <img
              src={require(`../../assets/images/covers/${abstract_img}`)}
              className={s.img}
              alt="..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publication;

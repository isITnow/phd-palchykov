const Research = ({ research }) => {
  const { id, title, illustrations, sources } = research;
  return (
    <div className="">
      <div className="d-flex mb-2 justify-content-center">
        <span className="me-2 text-secondary fs-5 lh-sm">{id}.</span>
        <h5 className="card-title text-danger">{title}</h5>
      </div>
      {illustrations.map(({ img, description }, idx) => (
        <div key={idx} className="mb-4">
          <p
            className="mb-4"
            style={{ textIndent: "2rem", textAlign: "justify" }}
          >
            {description}
          </p>
          <div className="w-75 mx-auto">
            <img
              className="img-fluid"
              src={require(`../../assets/images/research/${img}`)}
              alt="schema"
            />
          </div>
        </div>
      ))}
      <div className="ms-4">
        <p className="mb-2">Our relevant works:</p>
        <ul className="">
          {sources.map(({ url, source }, idx) => (
            <li key={idx}>
              <a href={url} target="_blank" rel="noreferrer noopener">
                <span className="fst-italic">{source}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Research;

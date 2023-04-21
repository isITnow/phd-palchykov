const NewsItem = ({ news }) => {
  const { title, description, img, date, urlList } = news;
  return (
    <div className="card text-center">
      <div className="card-header">
        <h5 className="card-title text-danger mb-0">{title}</h5>
      </div>
      <div className="card-body">
        {description && (
          <p className="card-text" style={{ textAlign: "justify" }}>
            {description}
          </p>
        )}
        {img && (
          <div className="">
            <img
              className="img-fluid"
              src={require(`../../assets/images/news/${img}`)}
              alt="..."
            />
          </div>
        )}
        {urlList?.length > 0 && (
          <ul>
            {urlList.map((url, indx) => (
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
      <div className="card-footer text-body-secondary">{date}</div>
    </div>
  );
};

export default NewsItem;

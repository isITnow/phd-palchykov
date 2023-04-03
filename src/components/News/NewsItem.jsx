import s from "./newsItem.module.css";

const NewsItem = ({ news }) => {
  const { title, description, img, date } = news;
  return (
    <div className="card text-center">
      <div className="card-header">
        <h5 className="card-title text-danger">{title}</h5>
      </div>
      <div className="card-body">
        {description && <p className="card-text">{description}</p>}
        {img && (
          <div className="">
            <img
              className={s.img}
              src={require(`../../assets/images/news/${img}`)}
              alt="..."
            />
          </div>
        )}
      </div>
      <div className="card-footer text-body-secondary">{date}</div>
    </div>
  );
};

export default NewsItem;

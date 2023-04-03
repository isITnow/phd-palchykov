import NewsItem from "./NewsItem";
import newsArray from "../../assets/data/news";

const NewsList = () => {
  return (
    <ul>
      {newsArray.map((news) => (
        <li className="mb-3" key={news.id}>
          <NewsItem news={news} />
        </li>
      ))}
    </ul>
  );
};

export default NewsList;

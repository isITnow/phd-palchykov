import NewsItem from "./NewsItem";
import newsArray from "../../assets/data/news";
console.log("newsArray: ", newsArray);

const NewsList = () => {
  return (
    <ul>
      {newsArray.map((news) => (
        <li className="mb-2" key={news.id}>
          <NewsItem news={news} />
        </li>
      ))}
    </ul>
  );
};

export default NewsList;

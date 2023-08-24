import NewsItem from "./NewsItem";

const NewsList = ({ newsList }) => {
  return (
    <ul>
      {newsList.map((news) => (
        <li className="mb-3" key={news.id}>
          <NewsItem news={news} />
        </li>
      ))}
    </ul>
  );
};

export default NewsList;

import NewsItem from "./NewsItem";

const NewsList = ({ news }) => {
  return (
    <ul>
      {news.map((newsItem) => (
        <li className="mb-3" key={newsItem.id}>
          <NewsItem news={newsItem} />
        </li>
      ))}
    </ul>
  );
};

export default NewsList;

import NewsItem from '@/components/News/NewsItem';

const NewsList = ({ news }) => (
  <ul>
    {news.map((newsItem) => (
      <li className="mb-3" key={newsItem.id}>
        <NewsItem news={newsItem} />
      </li>
    ))}
  </ul>
);

export default NewsList;

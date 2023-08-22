import { useEffect, useState } from "react";
import { newsAPI } from "../services/newsAPI.js";

import Loader from "../components/Loader";
import NewsList from "../components/News/NewsList";
import setPageTitle from "../assets/utils/setPageTitle";

const NewsPage = () => {
  // temp block. testing requests //
  const [newsList, setNewsList] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await newsAPI.fetchNews();
        setNewsList(data);
        setIsReady(true);
        console.log("list: ", data);
      } catch (error) {
        console.log("error: ", error);
      }
    })();
  }, []);

  setPageTitle("News");

  if (!isReady) {
    return <Loader />;
  }

  return (
    <section className="py-4">
      <NewsList newsList={newsList} />
    </section>
  );
};

export default NewsPage;

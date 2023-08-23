import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      <div className="mt-3">
        <Link className="btn btn-primary" to={"/news/new"}>
          new news
        </Link>
      </div>
    </section>
  );
};

export default NewsPage;

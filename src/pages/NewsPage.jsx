import NewsList from "../components/News/NewsList";

import setPageTitle from "../assets/utils/setPageTitle";
import { useEffect } from "react";
import { newsAPI } from "../services/newsAPI.js";

const NewsPage = () => {
  // temp block. testing requests //
  useEffect(() => {
    try {
      newsAPI.fetchNews();
    } catch (error) {
      console.log("error: ", error);
    }
  }, []);

  setPageTitle("News");
  return (
    <section className="py-4">
      <NewsList />
    </section>
  );
};

export default NewsPage;

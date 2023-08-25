import { Link } from "react-router-dom";

import NewsList from "../components/News/NewsList";
import setPageTitle from "../assets/utils/setPageTitle";

const NewsPage = () => {
  setPageTitle("News");

  return (
    <section className="py-4">
      <NewsList />
      <div className="mt-3">
        <Link className="btn btn-primary" to={"/news/new"}>
          new news
        </Link>
      </div>
    </section>
  );
};

export default NewsPage;

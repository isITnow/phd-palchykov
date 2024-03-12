import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getNewsThunk } from "../redux/news/operationsNews";
import { selectNews } from "../redux/news/selectorNews";

import NewsList from "../components/News/NewsList";
import IsLoggedIn from "../components/shared/IsLoggedIn";
import Loader from "../components/shared/Loader";

import navTabs from "../assets/navTabs";

const NewsPage = () => {
  const dispatch = useDispatch();
  const { news, status } = useSelector(selectNews);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getNewsThunk(signal));

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <>
      <NewsList news={news} />
      <IsLoggedIn>
        <div className="mt-3 text-end">
          <Link className="btn btn-primary" to={navTabs.news.createPath}>
            Add News
          </Link>
        </div>
      </IsLoggedIn>
    </>
  );
};

export default NewsPage;

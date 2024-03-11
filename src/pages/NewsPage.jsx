import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getNewsThunk } from "../redux/news/operationsNews";
import { selectNews } from "../redux/news/selectorNews";

import { useAlert } from "../assets/customHooks/useAlert";
import useRejectedDeletedAlertEffect from "../assets/customHooks/alertHooks/useRejectedDeletedAlertEffect";

import NewsList from "../components/News/NewsList";
import Alert from "../components/shared/Alert";
import IsLoggedIn from "../components/shared/IsLoggedIn";
import Loader from "../components/shared/Loader";

import navTabs from "../assets/navTabs";

const NewsPage = () => {
  const dispatch = useDispatch();
  const { news, status, error } = useSelector(selectNews);
  const { alertState, showAlert } = useAlert();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getNewsThunk(signal));

    return () => {
      // Abort the request when the component unmounts or when a dependency changes
      controller.abort();
    };
  }, [dispatch]);

  useRejectedDeletedAlertEffect(error, status, showAlert, "News");

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <>
      <Alert state={alertState} />
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

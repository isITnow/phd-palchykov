import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getNewsThunk } from "../redux/news/operationsNews";
import { selectNews } from "../redux/news/selectorNews";

import { useAlert } from "../assets/customHooks/useAlert";
import Alert from "../components/shared/Alert";

import NewsList from "../components/News/NewsList";
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

  useEffect(() => {
    if (status === "rejected") {
      showAlert(`${error}. Please contact your administrator!`, "danger");
      return;
    }

    if (status === "removed") {
      showAlert("Card deleted", "success");
      return;
    }
  }, [error, showAlert, status]);

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

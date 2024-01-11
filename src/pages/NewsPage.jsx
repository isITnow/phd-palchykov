import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getNewsThunk } from "../redux/news/operationsNews";
import { selectNews } from "../redux/news/selectorNews";

import Alert from "../components/shared/Alert";
import { useAlert } from "../assets/customHooks/useAlert";

import Loader from "../components/shared/Loader";
import NewsList from "../components/News/NewsList";
import Section from "../components/shared/Section";

import useSignInStatus from "../assets/customHooks/useSignInStatus";

const NewsPage = () => {
  const isLoggedIn = useSignInStatus();
  const dispatch = useDispatch();
  const { news, status, error } = useSelector(selectNews);
  const { alert, showAlert } = useAlert();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <Section>
      <Alert state={alert} />
      <NewsList news={news} />
      {isLoggedIn && (
        <div className="mt-3 text-end">
          <Link className="btn btn-primary" to={"/news/new"}>
            new News
          </Link>
        </div>
      )}
    </Section>
  );
};

export default NewsPage;

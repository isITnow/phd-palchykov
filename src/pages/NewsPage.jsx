import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getNewsThunk } from "../redux/news/operationsNews";
import { selectNews } from "../redux/news/selectorNews";

import Alert from "../components/shared/Alert";
import { useAlert } from "../assets/utils/useAlert";

import Loader from "../components/shared/Loader";
import NewsList from "../components/News/NewsList";
import Section from "../components/shared/Section";

import useSignInStatus from "../assets/utils/useSignInStatus";
import setPageTitle from "../assets/utils/setPageTitle";

const NewsPage = () => {
  setPageTitle("News");
  const isLoggedIn = useSignInStatus();
  const dispatch = useDispatch();
  const { news, status, error } = useSelector(selectNews);
  const { alert, showAlert } = useAlert();

  useEffect(() => {
    dispatch(getNewsThunk());
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
            new news
          </Link>
        </div>
      )}
    </Section>
  );
};

export default NewsPage;

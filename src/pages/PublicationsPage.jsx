import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { selectPeriods } from "../redux/publicationPeriods/selectorPublicationPeriods";
import { getPublicationsThunk } from "../redux/publications/operationsPublications";
import { selectPublications } from "../redux/publications/selectorPublications";

import { useAlert } from "../assets/customHooks/useAlert";
import Alert from "../components/shared/Alert";

import PagesNav from "../components/PagesNav/PagesNav";
import PublicationsList from "../components/Publications/PublicationsList";
import IsLoggedIn from "../components/shared/IsLoggedIn";
import Loader from "../components/shared/Loader";

import navTabs from "../assets/navTabs";

const PublicationsPage = () => {
  const { period_id } = useParams();
  const dispatch = useDispatch();
  const { periods } = useSelector(selectPeriods);
  const { publications, status, error } = useSelector(selectPublications);
  const { alert, showAlert } = useAlert();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getPublicationsThunk({ id: period_id, signal }));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    return () => {
      // Abort the request when the component unmounts or when a dependency changes
      controller.abort();
    };
  }, [dispatch, period_id]);

  useEffect(() => {
    if (status === "rejected") {
      showAlert(`${error}. Please contact your administrator!`, "danger");
      return;
    }
    if (status === "removed") {
      showAlert("Publication deleted", "success");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <>
      <Alert state={alert} />
      <PagesNav
        margin={"mb-3"}
        periods={periods}
        currentPeriodId={parseInt(period_id)}
      />
      <PublicationsList publications={publications} />
      <div className="d-flex justify-content-between mt-3">
        <div>
          <IsLoggedIn>
            <Link
              className="btn btn-primary"
              to={navTabs.publications.createPath(period_id)}
            >
              Add Publication
            </Link>
          </IsLoggedIn>
        </div>
        {publications.length > 4 && (
          <PagesNav periods={periods} currentPeriodId={parseInt(period_id)} />
        )}
      </div>
    </>
  );
};

export default PublicationsPage;

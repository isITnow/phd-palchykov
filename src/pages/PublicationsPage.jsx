import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getPublicationsThunk } from "../redux/publications/operationsPublications";
import { selectPublications } from "../redux/publications/selectorPublications";
import { selectPeriods } from "../redux/publicationPeriods/selectorPublicationPeriods";

import PagesNav from "../components/PagesNav/PagesNav";
import Loader from "../components/shared/Loader";
import PublicationsList from "../components/Publications/PublicationsList";

import Alert from "../components/shared/Alert";
import { useAlert } from "../assets/utils/useAlert";

import useSignInStatus from "../assets/utils/useSignInStatus";
import setPageTitle from "../assets/utils/setPageTitle";

const PublicationsPage = () => {
  setPageTitle("Publications");
  const { period_id } = useParams();
  const dispatch = useDispatch();
  const { periods } = useSelector(selectPeriods);
  const { publications, status, error } = useSelector(selectPublications);
  const { alert, showAlert } = useAlert();
  const isLoggedIn = useSignInStatus();

  useEffect(() => {
    dispatch(getPublicationsThunk(period_id));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [dispatch, period_id]);

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
    <section className="py-4">
      <Alert state={alert} />
      <PagesNav
        margin={"mb-3"}
        periods={periods}
        currentPeriodId={parseInt(period_id)}
      />
      <PublicationsList publications={publications} />
      <div className="d-flex justify-content-between mt-3">
        {isLoggedIn && (
          <div>
            <Link
              className="btn btn-primary"
              to={`/periods/${period_id}/publications/new`}
            >
              new publication
            </Link>
          </div>
        )}
        {publications.length > 4 && (
          <PagesNav periods={periods} currentPeriodId={parseInt(period_id)} />
        )}
      </div>
    </section>
  );
};

export default PublicationsPage;

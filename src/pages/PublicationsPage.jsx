import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectPeriods } from "../redux/publicationPeriods/selectorPublicationPeriods";
import { getPublicationsThunk } from "../redux/publications/operationsPublications";
import { selectPublications } from "../redux/publications/selectorPublications";

import PagesNav from "../components/PagesNav/PagesNav";
import PublicationsList from "../components/Publications/PublicationsList";
import IsLoggedIn from "../components/shared/IsLoggedIn";
import Loader from "../components/shared/Loader";

import navTabs from "../assets/navTabs";

const PublicationsPage = () => {
  const { period_id } = useParams();
  const { periods } = useSelector(selectPeriods);
  const { publications, status } = useSelector(selectPublications);
  const dispatch = useDispatch();

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

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <>
      <PagesNav
        currentPeriodId={parseInt(period_id)}
        margin={"mb-3"}
        periods={periods}
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

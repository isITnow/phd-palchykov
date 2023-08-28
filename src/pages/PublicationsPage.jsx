import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getPublicationsThunk } from "../redux/publications/operationsPublications";
import { selectPublications } from "../redux/publications/selectorPublications";
import { selectPeriods } from "../redux/publicationPeriods/selectorPublicationPeriods";

import PagesNav from "../components/PagesNav/PagesNav";
import Loader from "../components/Loader";
import PublicationsList from "../components/Publications/PublicationsList";

import setPageTitle from "../assets/utils/setPageTitle";

const PublicationsPage = () => {
  setPageTitle("Publications");
  const { period_id } = useParams();
  const dispatch = useDispatch();
  const { periods } = useSelector(selectPeriods);
  const { publications, status, error } = useSelector(selectPublications);
  // console.log("publications: ", publications);

  useEffect(() => {
    dispatch(getPublicationsThunk(period_id));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [dispatch, period_id]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <section className="py-4">
      <PagesNav
        margin={"mb-3"}
        periods={periods}
        currentPeriodId={parseInt(period_id)}
      />
      <PublicationsList publications={publications} />
      <PagesNav
        margin={"mt-3 mb-0"}
        periods={periods}
        currentPeriodId={period_id}
      />
    </section>
  );
};

export default PublicationsPage;

import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { selectResearches } from "../redux/researches/selectorResearches";
import { getResearchesThunk } from "../redux/researches/operationsResearches";

import Alert from "../components/shared/Alert";
import { useAlert } from "../assets/utils/useAlert";

import Loader from "../components/shared/Loader";
import ResearchList from "../components/Research/ResearchList";

import setPageTitle from "../assets/utils/setPageTitle";
import useSignInStatus from "../assets/utils/useSignInStatus";

const ResearchPage = () => {
  setPageTitle("Research");
  const dispatch = useDispatch();
  const { researches, status, error } = useSelector(selectResearches);
  const { alert, showAlert } = useAlert();
  const isLoggedIn = useSignInStatus();

  useEffect(() => {
    dispatch(getResearchesThunk());
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
    <section className="py-4">
      <Alert state={alert} />
      <ResearchList researches={researches} />
      {isLoggedIn && (
        <div className="">
          <Link className="btn btn-primary" to={"/research/new"}>
            new research
          </Link>
        </div>
      )}
    </section>
  );
};

export default ResearchPage;

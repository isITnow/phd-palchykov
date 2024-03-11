import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getResearchesThunk } from "../redux/researches/operationsResearches";
import { selectResearches } from "../redux/researches/selectorResearches";

import { useAlert } from "../assets/customHooks/useAlert";

import ResearchList from "../components/Research/ResearchList";
import Alert from "../components/shared/Alert";
import IsLoggedIn from "../components/shared/IsLoggedIn";
import Loader from "../components/shared/Loader";

import navTabs from "../assets/navTabs";

const ResearchPage = () => {
  const { alertState, showAlert } = useAlert();
  const { researches, status, error } = useSelector(selectResearches);
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getResearchesThunk(signal));
    return () => {
      // Abort the request when the component unmounts or when a dependency changes
      controller.abort();
    };
  }, [dispatch]);

  useEffect(() => {
    if (status === "rejected") {
      showAlert(error, "danger");
      return;
    }
  }, [error, showAlert, status]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <>
      <Alert state={alertState} />
      <ResearchList researches={researches} />
      <IsLoggedIn>
        <div className="text-end">
          <Link className="btn btn-primary" to={navTabs.researches.createPath}>
            Add Research
          </Link>
        </div>
      </IsLoggedIn>
    </>
  );
};

export default ResearchPage;

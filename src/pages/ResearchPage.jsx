import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getResearchesThunk } from "../redux/researches/operationsResearches";
import { selectResearches } from "../redux/researches/selectorResearches";

import { useAlert } from "../assets/customHooks/useAlert";
import Alert from "../components/shared/Alert";

import ResearchList from "../components/Research/ResearchList";
import IsLoggedIn from "../components/shared/IsLoggedIn";
import Loader from "../components/shared/Loader";
import Section from "../components/shared/Section";

const ResearchPage = () => {
  const dispatch = useDispatch();
  const { researches, status, error } = useSelector(selectResearches);
  const { alert, showAlert } = useAlert();

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
      <ResearchList researches={researches} />
      <IsLoggedIn>
        <div className="text-end">
          <Link className="btn btn-primary" to={"/researches/new"}>
            Add Research
          </Link>
        </div>
      </IsLoggedIn>
    </Section>
  );
};

export default ResearchPage;

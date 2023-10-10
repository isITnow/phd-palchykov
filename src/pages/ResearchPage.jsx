import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { selectResearches } from "../redux/researches/selectorResearches";
import { getResearchesThunk } from "../redux/researches/operationsResearches";

import Alert from "../components/shared/Alert";
import { useAlert } from "../assets/customHooks/useAlert";

import Loader from "../components/shared/Loader";
import ResearchList from "../components/Research/ResearchList";
import Section from "../components/shared/Section";

import setPageTitle from "../assets/utils/setPageTitle";
import useSignInStatus from "../assets/customHooks/useSignInStatus";

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
    <Section>
      <Alert state={alert} />
      <ResearchList researches={researches} />
      {isLoggedIn && (
        <div className="text-end">
          <Link className="btn btn-primary" to={"/researches/new"}>
            new research
          </Link>
        </div>
      )}
    </Section>
  );
};

export default ResearchPage;

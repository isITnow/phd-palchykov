import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { selectResearches } from "../redux/researches/selectorResearches";
import { getResearchesThunk } from "../redux/researches/operationsResearches";

import Alert from "../components/shared/Alert";
import { useAlert } from "../assets/utils/useAlert";

import ResearchList from "../components/Research/ResearchList";
import setPageTitle from "../assets/utils/setPageTitle";
import Loader from "../components/shared/Loader";

const ResearchPage = () => {
  setPageTitle("Research");
  const dispatch = useDispatch();
  const { researches, status, error } = useSelector(selectResearches);
  const { alert, showAlert } = useAlert();

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
    <>
      {alert.visible && <Alert state={alert} />}
      <section className="py-4">
        <ResearchList researches={researches} />
        <div className="">
          <Link className="btn btn-primary" to={"/research/new"}>
            new research
          </Link>
        </div>
      </section>
    </>
  );
};

export default ResearchPage;

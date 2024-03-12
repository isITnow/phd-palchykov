import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getResearchesThunk } from "../redux/researches/operationsResearches";
import { selectResearches } from "../redux/researches/selectorResearches";

import ResearchList from "../components/Research/ResearchList";
import IsLoggedIn from "../components/shared/IsLoggedIn";
import Loader from "../components/shared/Loader";

import navTabs from "../assets/navTabs";
import { controller, signal } from "../assets/utils/getControllerAndSignal";

const ResearchPage = () => {
  const { researches, status } = useSelector(selectResearches);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getResearchesThunk(signal));
    return () => {
      controller.abort();
    };
  }, [dispatch]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <>
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

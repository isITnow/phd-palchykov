import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getResearchesThunk } from "../redux/researches/operationsResearches";
import { selectResearches } from "../redux/researches/selectorResearches";

import { toast } from "react-toastify";

import ResearchList from "../components/Research/ResearchList";
import IsLoggedIn from "../components/shared/IsLoggedIn";
import Loader from "../components/shared/Loader";

import navTabs from "../assets/navTabs";

const ResearchPage = () => {
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
      toast.error(error);
      return;
    }
  }, [error, status]);

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

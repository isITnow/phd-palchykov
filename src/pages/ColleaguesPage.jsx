import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getColleaguesThunk } from "../redux/colleagues/operationsColleagues.js";
import { selectColleagues } from "../redux/colleagues/selectorColleagues.js";

import ColleaguesList from "../components/Colleagues/ColleaguesList";
import IsLoggedIn from "../components/shared/IsLoggedIn.jsx";
import Loader from "../components/shared/Loader";

import navTabs from "../assets/navTabs.js";
import { controller, signal } from "../assets/utils/getControllerAndSignal";

const ColleaguesPage = () => {
  const dispatch = useDispatch();
  const { colleagues, status } = useSelector(selectColleagues);

  useEffect(() => {
    dispatch(getColleaguesThunk(signal));

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <>
      <ColleaguesList colleagues={colleagues} />
      <IsLoggedIn>
        <div className="mt-3 text-end">
          <Link className="btn btn-primary" to={navTabs.colleagues.createPath}>
            Add Colleague
          </Link>
        </div>
      </IsLoggedIn>
    </>
  );
};

export default ColleaguesPage;

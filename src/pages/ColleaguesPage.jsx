import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getColleaguesThunk } from "../redux/colleagues/operationsColleagues.js";
import { selectColleagues } from "../redux/colleagues/selectorColleagues.js";

import { useAlert } from "../assets/customHooks/useAlert.js";
import useRejectedDeletedAlertEffect from "../assets/customHooks/alertHooks/useRejectedDeletedAlertEffect.js";

import ColleaguesList from "../components/Colleagues/ColleaguesList";
import Alert from "../components/shared/Alert.jsx";
import IsLoggedIn from "../components/shared/IsLoggedIn.jsx";
import Loader from "../components/shared/Loader";

import navTabs from "../assets/navTabs.js";

const ColleaguesPage = () => {
  const dispatch = useDispatch();
  const { colleagues, status, error } = useSelector(selectColleagues);
  const { alertState, showAlert } = useAlert();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getColleaguesThunk(signal));

    return () => {
      // Abort the request when the component unmounts or when a dependency changes
      controller.abort();
    };
  }, [dispatch]);

  useRejectedDeletedAlertEffect(error, status, showAlert);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <>
      <Alert state={alertState} />
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

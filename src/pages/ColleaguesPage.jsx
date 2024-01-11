import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getColleaguesThunk } from "../redux/colleagues/operationsColleagues.js";
import { selectColleagues } from "../redux/colleagues/selectorColleagues.js";

import Alert from "../components/shared/Alert.jsx";
import { useAlert } from "../assets/customHooks/useAlert.js";

import Loader from "../components/shared/Loader";
import ColleaguesList from "../components/Colleagues/ColleaguesList";
import Section from "../components/shared/Section.jsx";

import useSignInStatus from "../assets/customHooks/useSignInStatus.js";

const ColleaguesPage = () => {
  const isLoggedIn = useSignInStatus();
  const dispatch = useDispatch();
  const { colleagues, status, error } = useSelector(selectColleagues);
  const { alert, showAlert } = useAlert();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getColleaguesThunk(signal));

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

  if (status === "rejected") {
    alert.text = `${error}. Please contact your administrator!`;
    alert.type = "danger";
  }

  return (
    <Section>
      <Alert state={alert} />
      <ColleaguesList colleagues={colleagues} />
      {isLoggedIn && (
        <div className="mt-3 text-end">
          <Link className="btn btn-primary" to={"/colleagues/new"}>
            new Colleague
          </Link>
        </div>
      )}
    </Section>
  );
};

export default ColleaguesPage;

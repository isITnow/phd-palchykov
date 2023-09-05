import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getColleaguesThunk } from "../redux/colleagues/operationsColleagues.js";
import { selectColleagues } from "../redux/colleagues/selectorColleagues.js";

import Alert from "../components/shared/Alert.jsx";
import { useAlert } from "../assets/utils/useAlert.js";

import Loader from "../components/shared/Loader";
import ColleaguesList from "../components/Colleagues/ColleaguesList";

import useSignInStatus from "../assets/utils/useSignInStatus";
import setPageTitle from "../assets/utils/setPageTitle";

const ColleaguesPage = () => {
  setPageTitle("Colleagues");
  const isLoggedIn = useSignInStatus();
  const dispatch = useDispatch();
  const { colleagues, status, error } = useSelector(selectColleagues);
  const { alert, showAlert } = useAlert();

  useEffect(() => {
    dispatch(getColleaguesThunk());
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
    <>
      {alert.visible && <Alert state={alert} />}
      <section className="py-4">
        <ColleaguesList colleagues={colleagues} />
        {isLoggedIn && (
          <div className="mt-3">
            <Link className="btn btn-primary" to={"/colleagues/new"}>
              new colleague
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default ColleaguesPage;

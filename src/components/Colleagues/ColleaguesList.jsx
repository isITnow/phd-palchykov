import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getColleaguesThunk } from "../../redux/colleagues/operationsColleagues.js";
import { selectColleagues } from "../../redux/colleagues/selectorColleagues.js";

import Alert from "../Alert.jsx";
import Colleague from "./Colleague";
import Loader from "../Loader";

const ColleaguesList = () => {
  const dispatch = useDispatch();
  const { colleagues, status, error } = useSelector(selectColleagues);
  const alert = { text: "", type: "" };

  useEffect(() => {
    dispatch(getColleaguesThunk());
  }, [dispatch]);

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "rejected") {
    alert.text = `${error}. Please contact your administrator!`;
    alert.type = "danger";
  }

  return (
    <>
      {error && <Alert state={alert} />}
      <ul className="row row-cols-1 row-cols-lg-2">
        {colleagues.map((colleague) => (
          <li className="col mb-3" key={colleague.id}>
            <Colleague colleague={colleague} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ColleaguesList;

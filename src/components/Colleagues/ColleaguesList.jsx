import { useEffect } from "react";
import { useAlert } from "../../assets/utils/useAlert.js";

import { useSelector, useDispatch } from "react-redux";
import { getColleaguesThunk } from "../../redux/colleagues/operationsColleagues.js";
import { selectColleagues } from "../../redux/colleagues/selectorColleagues.js";

import Alert from "../Alert.jsx";
import Colleague from "./Colleague";
import Loader from "../Loader";

const ColleaguesList = () => {
  const dispatch = useDispatch();
  const { colleagues, status, error } = useSelector(selectColleagues);
  console.log("Colleagues List status: ", status);
  console.log("Colleagues List error: ", error);
  const { alert, showAlert } = useAlert();

  useEffect(() => {
    dispatch(getColleaguesThunk());
  }, [dispatch]);

  // TODO: implement alert with error message

  if (status === "pending") {
    return <Loader />;
  }

  return (
    <>
      {alert.visible && <Alert state={alert} />}
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

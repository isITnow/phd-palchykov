import { useEffect, useState } from "react";
import { useAlert } from "../../assets/utils/useAlert.js";

import Alert from "../Alert.jsx";
import Colleague from "./Colleague";
import Loader from "../Loader";

import { colleaguesAPI } from "../../services/colleaguesAPI";

let message = "";

const ColleaguesList = () => {
  const [colleaguesList, setColleaguesList] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { alert, showAlert } = useAlert();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await colleaguesAPI.fetchColleagues();
        setColleaguesList(data);
        setIsReady(true);
      } catch (error) {
        message = "Error occurred. Contact your administrator!";
        showAlert(message, "danger");

        console.log("error: ", error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle]);

  const deleteHandler = async (id) => {
    setIsDisabled(true);
    try {
      const response = await colleaguesAPI.deleteColleague(id);
      if (response.status === 204) {
        console.log("DELETE SUCCESS");
        setToggle((prevState) => !prevState);
      } else {
        message = "Failed to delete record. Contact your administrator!";
        showAlert(message, "danger");
      }
    } catch (error) {
      message = "Error occurred. Contact your administrator!";
      showAlert(message, "danger");

      console.log("Error occurred while deleting the record:", error);
    } finally {
      setIsDisabled(false);
    }
  };

  if (!isReady) {
    return <Loader />;
  }

  return (
    <>
      {alert.visible && <Alert state={alert} />}
      <ul className="row row-cols-1 row-cols-lg-2">
        {colleaguesList.map((colleague) => (
          <li className="col mb-3" key={colleague.id}>
            <Colleague
              onDelete={deleteHandler}
              btnDisable={isDisabled}
              colleague={colleague}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ColleaguesList;

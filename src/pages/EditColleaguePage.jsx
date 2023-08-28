import { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectColleagues } from "../redux/colleagues/selectorColleagues";

import ColleagueForm from "../components/Colleagues/ColleagueForm";
import Alert from "../components/Alert";
import { useAlert } from "../assets/utils/useAlert";

const EditColleaguePage = () => {
  const { colleagues, error, status } = useSelector(selectColleagues);
  const { id } = useParams();
  const { alert, showAlert } = useAlert();

  const colleague = colleagues.find(
    (colleague) => colleague.id === parseInt(id)
  );

  useEffect(() => {
    if (status === "rejected") {
      showAlert(`${error}. Please contact your administrator!`, "danger");
      return;
    }
    if (status === "fulfilled") {
      showAlert("Card updated successfully", "success");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <>
      {alert.visible && <Alert state={alert} />}
      <section className="py-4">
        <h4>Edit card</h4>
        <div className="mb-3">
          <p className="mb-2 fw-bolder">required fields: </p>
          <ul className="list-group list-group-numbered">
            <li className="list-group-item">Name</li>
            <li className="list-group-item">Position </li>
            <li className="list-group-item">Email</li>
            <li className="list-group-item">
              Phone ( example: +380775554433 )
            </li>
          </ul>
        </div>
        <ColleagueForm colleague={colleague} />
      </section>
    </>
  );
};

export default EditColleaguePage;

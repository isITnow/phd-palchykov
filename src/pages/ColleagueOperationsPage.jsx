import { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectColleagues } from "../redux/colleagues/selectorColleagues";

import ColleagueForm from "../components/Colleagues/ColleagueForm";
import Alert from "../components/shared/Alert";
import { useAlert } from "../assets/utils/useAlert";

const ColleagueOperationsPage = ({ edit }) => {
  const { colleagues, error, status } = useSelector(selectColleagues);
  const { alert, showAlert } = useAlert();
  const { id } = useParams();
  const title = edit ? "Edit colleague card" : "Create colleague card";
  let colleague = null;

  if (edit) {
    colleague = colleagues.find((colleague) => colleague.id === parseInt(id));
  }

  useEffect(() => {
    if (status === "rejected") {
      showAlert(`${error}. Please contact your administrator!`, "danger");
      return;
    }
    if (status === "fulfilled") {
      const text = edit
        ? "Card updated successfully"
        : "Card created successfully";
      showAlert(text, "success");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <section className="py-4">
      <Alert state={alert} />
      <h4>{title}</h4>
      <div className="mb-3">
        <p className="mb-2 fw-bolder">required fields: </p>
        <ul className="list-group list-group-numbered">
          <li className="list-group-item">Name</li>
          <li className="list-group-item">Position </li>
          <li className="list-group-item">Email</li>
          <li className="list-group-item">Phone ( example: +380775554433 )</li>
        </ul>
      </div>
      <ColleagueForm colleague={edit ? colleague : null} />
    </section>
  );
};

export default ColleagueOperationsPage;

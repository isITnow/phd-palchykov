import { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectColleagues } from "../redux/colleagues/selectorColleagues";

import Alert from "../components/shared/Alert";
import { useAlert } from "../assets/utils/useAlert";

import ColleagueForm from "../components/Colleagues/ColleagueForm";
import FormTitle from "../components/FormComponents/FormTitle";
import FormRequirements from "../components/FormComponents/FormRequirements";
import Section from "../components/shared/Section";

const requirementsList = [
  "Name",
  "Position",
  "Email",
  "Photo",
  "Phone ( example: +380775554433 )",
];

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
      showAlert(error, "danger");
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
    <Section>
      <Alert state={alert} />
      <FormTitle>{title}</FormTitle>
      <FormRequirements requirementsList={requirementsList} />
      <ColleagueForm colleague={edit ? colleague : null} />
    </Section>
  );
};

export default ColleagueOperationsPage;

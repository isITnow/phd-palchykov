import { useEffect } from "react";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectColleagues } from "../redux/colleagues/selectorColleagues";

import { useAlert } from "../assets/customHooks/useAlert";
import Alert from "../components/shared/Alert";

import { Col } from "react-bootstrap";
import ColleagueForm from "../components/Colleagues/ColleagueForm";
import FormCard from "../components/FormComponents/FormCard";
import FormRequirements from "../components/FormComponents/FormRequirements";
import NoItemToEdit from "../components/shared/NoItemToEdit";
import Section from "../components/shared/Section";

import navTabs from "../assets/navTabs";

const requirementsList = [
  "Name",
  "Position",
  "Email",
  "Photo (max size: 1MB)",
  "Phone ( example: +380775554433 )",
];

const ColleagueOperationsPage = ({ edit }) => {
  const { colleagues, error, status } = useSelector(selectColleagues);
  const { alert, showAlert } = useAlert();
  const { id } = useParams();
  const title = edit ? "Edit Colleague Card" : "Create Colleague Card";
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
      const text = edit ? "Card updated" : "Card created";
      showAlert(text, "success");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (edit && !colleague) {
    return <NoItemToEdit backPath={navTabs.colleagues.path} item="Colleague" />;
  }

  return (
    <Section>
      <Col lg="8" className="mx-auto">
        <Alert state={alert} />
        <FormCard
          title={title}
          body={
            <>
              <FormRequirements requirementsList={requirementsList} />
              <ColleagueForm
                colleague={edit ? colleague : null}
                status={status}
              />
            </>
          }
        />
      </Col>
    </Section>
  );
};

export default ColleagueOperationsPage;

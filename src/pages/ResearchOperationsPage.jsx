import { useEffect } from "react";

import { useSelector } from "react-redux";
import { selectResearches } from "../redux/researches/selectorResearches";

import { useAlert } from "../assets/customHooks/useAlert";
import Alert from "../components/shared/Alert";

import { Col } from "react-bootstrap";
import FormCard from "../components/FormComponents/FormCard";
import FormRequirements from "../components/FormComponents/FormRequirements";
import ResearchForm from "../components/Research/ResearchForm";
import Section from "../components/shared/Section";

const requirementsList = [
  "Research title",
  "Description",
  "Illustration image (max size: 1MB)",
  "Source",
  "Source URL",
];

const ResearchOperationsPage = () => {
  const { status, error } = useSelector(selectResearches);
  const { alert, showAlert } = useAlert();

  const title = "Create Research";

  useEffect(() => {
    if (status === "rejected") {
      showAlert(error, "danger");
      return;
    }
    if (status === "fulfilled") {
      const text = "Research created";
      showAlert(text, "success");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <Section>
      <Col lg="8" className="mx-auto">
        <Alert state={alert} />
        <FormCard
          title={title}
          body={
            <>
              <FormRequirements requirementsList={requirementsList} />
              <ResearchForm status={status} />
            </>
          }
        />
      </Col>
    </Section>
  );
};

export default ResearchOperationsPage;

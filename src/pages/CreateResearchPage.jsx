import { useEffect } from "react";

import { useSelector } from "react-redux";
import { selectResearches } from "../redux/researches/selectorResearches";

import { useAlert } from "../assets/customHooks/useAlert";
import Alert from "../components/shared/Alert";

import { Col } from "react-bootstrap";
import FormCard from "../components/FormComponents/FormCard";
import ResearchForm from "../components/Research/ResearchForm";

const CreateResearchPage = () => {
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
  }, [error, showAlert, status]);

  return (
    <Col lg="8" className="mx-auto">
      <Alert state={alert} />
      <FormCard title={title} body={<ResearchForm status={status} />} />
    </Col>
  );
};

export default CreateResearchPage;

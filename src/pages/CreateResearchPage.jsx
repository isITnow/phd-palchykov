import { useSelector } from "react-redux";
import { selectResearches } from "../redux/researches/selectorResearches";

import { useAlert } from "../assets/customHooks/useAlert";
import useCreatedUpdatedRejectedAlertEffect from "../assets/customHooks/alertHooks/useCreatedUpdatedRejectedAlertEffect";

import { Col } from "react-bootstrap";
import FormCard from "../components/FormComponents/FormCard";
import ResearchForm from "../components/Research/ResearchForm";
import Alert from "../components/shared/Alert";

const CreateResearchPage = () => {
  const { status, error } = useSelector(selectResearches);
  const { alertState, showAlert } = useAlert();

  const title = "Create Research";

  useCreatedUpdatedRejectedAlertEffect(error, status, showAlert, "Research");

  return (
    <Col lg="8" className="mx-auto">
      <Alert state={alertState} />
      <FormCard title={title} body={<ResearchForm status={status} />} />
    </Col>
  );
};

export default CreateResearchPage;

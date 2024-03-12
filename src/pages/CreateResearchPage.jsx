import { useSelector } from "react-redux";
import { selectResearches } from "../redux/researches/selectorResearches";

import useCreatedUpdatedRejectedAlertEffect from "../assets/customHooks/alertHooks/useCreatedUpdatedRejectedAlertEffect";

import { Col } from "react-bootstrap";
import FormCard from "../components/FormComponents/FormCard";
import ResearchForm from "../components/Research/ResearchForm";

const CreateResearchPage = () => {
  const { status, error } = useSelector(selectResearches);

  const title = "Create Research";

  useCreatedUpdatedRejectedAlertEffect(error, status, "Research");

  return (
    <Col lg="8" className="mx-auto">
      <FormCard title={title} body={<ResearchForm status={status} />} />
    </Col>
  );
};

export default CreateResearchPage;

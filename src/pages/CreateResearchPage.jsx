import { useSelector } from "react-redux";
import { selectResearches } from "../redux/researches/selectorResearches";

import { Col } from "react-bootstrap";
import FormCard from "../components/FormComponents/FormCard";
import ResearchForm from "../components/Research/ResearchForm";

const CreateResearchPage = () => {
  const { status } = useSelector(selectResearches);

  const title = "Create Research";

  return (
    <Col lg="8" className="mx-auto">
      <FormCard title={title} body={<ResearchForm status={status} />} />
    </Col>
  );
};

export default CreateResearchPage;

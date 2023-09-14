import { useEffect } from "react";

import { useSelector } from "react-redux";
import { selectResearches } from "../redux/researches/selectorResearches";

import Alert from "../components/shared/Alert";
import { useAlert } from "../assets/utils/useAlert";

import FormTitle from "../components/FormComponents/FormTitle";
import FormRequirements from "../components/FormComponents/FormRequirements";
import ResearchForm from "../components/Research/ResearchForm";
import Section from "../components/shared/Section";

const requirementsList = [
  "Research title",
  "Description",
  "Attachment ( illustration image )",
  "Source",
  "Source URL",
];

const ResearchOperationsPage = () => {
  const { status, error } = useSelector(selectResearches);
  const { alert, showAlert } = useAlert();

  const title = "Create research";

  useEffect(() => {
    if (status === "rejected") {
      showAlert(error, "danger");
      return;
    }
    if (status === "fulfilled") {
      const text = "Research created successfully";
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
      <ResearchForm />
    </Section>
  );
};

export default ResearchOperationsPage;

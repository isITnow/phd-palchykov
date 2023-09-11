import { useEffect } from "react";

import { useSelector } from "react-redux";
import { selectResearches } from "../redux/researches/selectorResearches";

import Alert from "../components/shared/Alert";
import { useAlert } from "../assets/utils/useAlert";
import ResearchForm from "../components/Research/ResearchForm";
import Section from "../components/shared/Section";

const ResearchOperationsPage = () => {
  const { status, error } = useSelector(selectResearches);
  const { alert, showAlert } = useAlert();

  const title = "Create research";

  useEffect(() => {
    if (status === "rejected") {
      showAlert(`${error}. Please contact your administrator!`, "danger");
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
      <h4>{title}</h4>
      <div className="mb-3">
        <p className="mb-2 fw-bolder">required fields: </p>
        <ul className="list-group list-group-numbered">
          <li className="list-group-item">Research title</li>
          <li className="list-group-item">Description</li>
          <li className="list-group-item">Attachment ( illustration image )</li>
          <li className="list-group-item">Source </li>
          <li className="list-group-item">Source URL</li>
        </ul>
      </div>
      <ResearchForm />
    </Section>
  );
};

export default ResearchOperationsPage;

import { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPublications } from "../redux/publications/selectorPublications";
import { selectPeriods } from "../redux/publicationPeriods/selectorPublicationPeriods";

import Alert from "../components/shared/Alert";
import { useAlert } from "../assets/utils/useAlert";
import PublicationForm from "../components/Publications/PublicationForm";
import Section from "../components/shared/Section";

import getCurrentPeriod from "../assets/utils/getCurrentEntity";

const PublicationOperationsPage = ({ edit }) => {
  const { publications, error, status } = useSelector(selectPublications);
  const { periods } = useSelector(selectPeriods);
  const { alert, showAlert } = useAlert();
  const { period_id } = useParams();
  const currentPeriodId = parseInt(period_id);
  const currentPeriod = getCurrentPeriod(periods, currentPeriodId);

  const title = edit
    ? `Edit publication [period: ${currentPeriod.title}]`
    : `Create publication [period: ${currentPeriod.title}]`;
  let publication = null;

  if (edit) {
    publication = publications.find(
      (publication) => publication.publication_period_id === currentPeriodId
    );
  }

  useEffect(() => {
    if (status === "rejected") {
      showAlert(error, "danger");
      return;
    }
    if (status === "fulfilled") {
      const text = edit
        ? "Publication updated successfully"
        : "Publication created successfully";
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
          <li className="list-group-item">Publication year</li>
          <li className="list-group-item">Publication title</li>
          <li className="list-group-item">Source </li>
          <li className="list-group-item">Source URL</li>
          <li className="list-group-item">Author ( at least one )</li>
          <li className="list-group-item">
            Attachment ( required at least one, cover or abstract )
          </li>
        </ul>
      </div>
      <PublicationForm publication={edit ? publication : null} />
    </Section>
  );
};

export default PublicationOperationsPage;

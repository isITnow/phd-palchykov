import { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPublications } from "../redux/publications/selectorPublications";
import { selectPeriods } from "../redux/publicationPeriods/selectorPublicationPeriods";

import Alert from "../components/shared/Alert";
import { useAlert } from "../assets/customHooks/useAlert";

import FormTitle from "../components/FormComponents/FormTitle";
import FormRequirements from "../components/FormComponents/FormRequirements";
import PublicationForm from "../components/Publications/PublicationForm";
import Section from "../components/shared/Section";

import getCurrentPeriod from "../assets/utils/getCurrentEntity";

const requirementsList = [
  "Publication year",
  "Sequence number",
  "Publication title",
  "Source",
  "SourceURL",
  "Author ( at least one )",
  "Abstract (max size: 1MB)",
  "Cover (max size: 1MB)",
];

const PublicationOperationsPage = ({ edit }) => {
  const { alert, showAlert } = useAlert();

  const { publications, error, status } = useSelector(selectPublications);
  const { periods } = useSelector(selectPeriods);

  const { period_id, publication_id } = useParams();
  const currentPeriodId = parseInt(period_id);
  const currentPublicationId = parseInt(publication_id);
  const currentPeriod = getCurrentPeriod(periods, currentPeriodId);

  const title = edit
    ? `Edit publication [period: ${currentPeriod.title}]`
    : `Create publication [period: ${currentPeriod.title}]`;
  let publication = null;

  if (edit) {
    publication = publications.find(
      (publication) =>
        publication.publication_period_id === currentPeriodId &&
        publication.id === currentPublicationId
    );
  }

  useEffect(() => {
    if (status === "rejected") {
      showAlert(error, "danger");
      return;
    }
    if (status === "fulfilled") {
      const text = edit ? "Publication updated" : "Publication created";
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
      <PublicationForm
        publication={edit ? publication : null}
        status={status}
      />
    </Section>
  );
};

export default PublicationOperationsPage;

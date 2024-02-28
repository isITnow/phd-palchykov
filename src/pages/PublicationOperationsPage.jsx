import { useEffect } from "react";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectPeriods } from "../redux/publicationPeriods/selectorPublicationPeriods";
import { selectPublications } from "../redux/publications/selectorPublications";

import { useAlert } from "../assets/customHooks/useAlert";
import Alert from "../components/shared/Alert";

import { Col } from "react-bootstrap";
import FormCard from "../components/FormComponents/FormCard";
import PublicationForm from "../components/Publications/PublicationForm";
import NoItemToEdit from "../components/shared/NoItemToEdit";
import Section from "../components/shared/Section";

import navTabs from "../assets/navTabs";
import getCurrentPeriod from "../assets/utils/getCurrentEntity";

const PublicationOperationsPage = ({ edit }) => {
  const { alert, showAlert } = useAlert();

  const { publications, error, status } = useSelector(selectPublications);
  const { periods } = useSelector(selectPeriods);

  const { period_id, publication_id } = useParams();
  const currentPeriodId = parseInt(period_id);
  const currentPublicationId = parseInt(publication_id);
  const currentPeriod = getCurrentPeriod(periods, currentPeriodId);

  const title = edit
    ? `Edit Publication [period: ${currentPeriod.title}]`
    : `Create Publication [period: ${currentPeriod.title}]`;
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

  if (edit && !publication) {
    return (
      <NoItemToEdit
        backPath={navTabs.publications.path(period_id)}
        item="Publication"
      />
    );
  }

  return (
    <Section>
      <Col lg="8" className="mx-auto">
        <Alert state={alert} />
        <FormCard
          title={title}
          body={
            <PublicationForm
              publication={edit ? publication : null}
              status={status}
            />
          }
        />
      </Col>
    </Section>
  );
};

export default PublicationOperationsPage;

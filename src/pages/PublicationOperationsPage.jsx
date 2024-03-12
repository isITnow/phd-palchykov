import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectPeriods } from "../redux/publicationPeriods/selectorPublicationPeriods";
import { selectPublications } from "../redux/publications/selectorPublications";

import { Col } from "react-bootstrap";
import FormCard from "../components/FormComponents/FormCard";
import PublicationForm from "../components/Publications/PublicationForm";
import NoItemToEdit from "../components/shared/NoItemToEdit";

import navTabs from "../assets/navTabs";
import getCurrentPeriod from "../assets/utils/getCurrentEntity";

const PublicationOperationsPage = ({ edit }) => {
  const { period_id, publication_id } = useParams();
  const { periods } = useSelector(selectPeriods);
  const { publications, status } = useSelector(selectPublications);

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

  if (edit && !publication) {
    return (
      <NoItemToEdit
        backPath={navTabs.publications.path(period_id)}
        item="Publication"
      />
    );
  }

  return (
    <Col lg="8" className="mx-auto">
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
  );
};

export default PublicationOperationsPage;

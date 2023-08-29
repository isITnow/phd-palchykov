import { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPublications } from "../redux/publications/selectorPublications";
import { selectPeriods } from "../redux/publicationPeriods/selectorPublicationPeriods";

import PublicationForm from "../components/Publications/PublicationForm";
import Alert from "../components/Alert";
import { useAlert } from "../assets/utils/useAlert";

const PublicationOperationsPage = ({ edit }) => {
  const { publications, error, status } = useSelector(selectPublications);
  const { periods } = useSelector(selectPeriods);
  const { alert, showAlert } = useAlert();
  const { period_id } = useParams();
  const currentPeriodId = parseInt(period_id);
  const currentPeriod = periods.find((period) => period.id === currentPeriodId);

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
      showAlert(`${error}. Please contact your administrator!`, "danger");
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
    <>
      {alert.visible && <Alert state={alert} />}
      <section className="py-4">
        <h4>{title}</h4>
        <div className="mb-3">
          <p className="mb-2 fw-bolder">required fields: </p>
          <ul className="list-group list-group-numbered">
            <li className="list-group-item">Title</li>
            <li className="list-group-item">Source </li>
            <li className="list-group-item">Source URL</li>
            <li className="list-group-item">Author ( at least one )</li>
            <li className="list-group-item">
              Attachment ( required at least one, cover or abstract )
            </li>
          </ul>
        </div>
        <PublicationForm publication={edit ? publication : null} />
      </section>
    </>
  );
};

export default PublicationOperationsPage;

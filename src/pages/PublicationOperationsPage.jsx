import { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPublications } from "../redux/publications/selectorPublications";

// import PublicationForm from "../components/Publications/PublicationForm";
import Alert from "../components/Alert";
import { useAlert } from "../assets/utils/useAlert";

const PublicationOperationsPage = ({ edit }) => {
  const { publications, error, status } = useSelector(selectPublications);
  const { alert, showAlert } = useAlert();
  const { id } = useParams();
  const title = edit ? "Edit publication" : "Create publication";
  let publication = null;

  if (edit) {
    publication = publications.find(
      (publication) => publication.id === parseInt(id)
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
        {/* <PublicationForm colleague={edit ? publication : null} /> */}
      </section>
    </>
  );
};

export default PublicationOperationsPage;

import { useEffect } from "react";

import { useSelector } from "react-redux";
import {
  selectError,
  selectOnePhotoAlbum,
  selectStatus,
} from "../redux/gallery/selectorGallery";

import { useAlert } from "../assets/customHooks/useAlert";
import Alert from "../components/shared/Alert";

import { Col } from "react-bootstrap";
import FormCard from "../components/FormComponents/FormCard";
import FormRequirements from "../components/FormComponents/FormRequirements";
import PhotoAlbumForm from "../components/Gallery/PhotoAlbumForm";
import Section from "../components/shared/Section";

const requirementsList = [
  "Album title",
  "Cover image (max size: 1MB)",
  "Photos (multiple select; max file size: 5MB)",
];

const PhotoAlbumOperationsPage = ({ edit }) => {
  const { alert, showAlert } = useAlert();
  const error = useSelector(selectError);
  const photoAlbum = useSelector(selectOnePhotoAlbum);
  const status = useSelector(selectStatus);

  const title = edit ? "Edit Photo Album" : "Create Photo Album";

  useEffect(() => {
    if (status === "rejected") {
      showAlert(error, "danger");
      return;
    }

    if (status === "fulfilled") {
      const text = edit ? "Photo album updated" : "Photo album created";
      showAlert(text, "success");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <Section>
      <Col lg="8" className="mx-auto">
        <Alert state={alert} />
        <FormCard
          title={title}
          body={
            <>
              <FormRequirements requirementsList={requirementsList} />
              <PhotoAlbumForm
                photoAlbum={edit ? photoAlbum : null}
                status={status}
              />
            </>
          }
        />
      </Col>
    </Section>
  );
};

export default PhotoAlbumOperationsPage;

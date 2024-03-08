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
import PhotoAlbumForm from "../components/Gallery/PhotoAlbumForm";
import NoItemToEdit from "../components/shared/NoItemToEdit";

import navTabs from "../assets/navTabs";

const PhotoAlbumOperationsPage = ({ edit }) => {
  const { alertState, showAlert } = useAlert();
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
  }, [edit, error, showAlert, status]);

  if (edit && !photoAlbum) {
    return <NoItemToEdit backPath={navTabs.gallery.path} item="Photo Album" />;
  }

  return (
    <Col lg="8" className="mx-auto">
      <Alert state={alertState} />
      <FormCard
        title={title}
        body={
          <PhotoAlbumForm
            photoAlbum={edit ? photoAlbum : null}
            status={status}
          />
        }
      />
    </Col>
  );
};

export default PhotoAlbumOperationsPage;

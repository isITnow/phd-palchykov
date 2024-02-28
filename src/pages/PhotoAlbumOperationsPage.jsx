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
import Section from "../components/shared/Section";

import navTabs from "../assets/navTabs";

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

  if (edit && !photoAlbum) {
    return <NoItemToEdit backPath={navTabs.gallery.path} item="Photo Album" />;
  }

  return (
    <Section>
      <Col lg="8" className="mx-auto">
        <Alert state={alert} />
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
    </Section>
  );
};

export default PhotoAlbumOperationsPage;

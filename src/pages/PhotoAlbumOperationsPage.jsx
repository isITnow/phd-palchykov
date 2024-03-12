import { useSelector } from "react-redux";
import {
  selectError,
  selectOnePhotoAlbum,
  selectStatus,
} from "../redux/gallery/selectorGallery";

import useCreatedUpdatedRejectedAlertEffect from "../assets/customHooks/alertHooks/useCreatedUpdatedRejectedAlertEffect";

import { Col } from "react-bootstrap";
import FormCard from "../components/FormComponents/FormCard";
import PhotoAlbumForm from "../components/Gallery/PhotoAlbumForm";
import NoItemToEdit from "../components/shared/NoItemToEdit";

import navTabs from "../assets/navTabs";

const PhotoAlbumOperationsPage = ({ edit }) => {
  const error = useSelector(selectError);
  const photoAlbum = useSelector(selectOnePhotoAlbum);
  const status = useSelector(selectStatus);

  const title = edit ? "Edit Photo Album" : "Create Photo Album";

  useCreatedUpdatedRejectedAlertEffect(error, status, "Photo album");

  if (edit && !photoAlbum) {
    return <NoItemToEdit backPath={navTabs.gallery.path} item="Photo Album" />;
  }

  return (
    <Col lg="8" className="mx-auto">
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

import { useSelector } from "react-redux";
import {
  selectOnePhotoAlbum,
  selectStatus,
} from "../redux/gallery/selectorGallery";

import { Col } from "react-bootstrap";
import FormCard from "../components/FormComponents/FormCard";
import PhotoAlbumForm from "../components/Gallery/PhotoAlbumForm";
import NoItemToEdit from "../components/shared/NoItemToEdit";

import navTabs from "../assets/navTabs";

const PhotoAlbumOperationsPage = ({ edit }) => {
  const photoAlbum = useSelector(selectOnePhotoAlbum);
  const status = useSelector(selectStatus);

  const title = edit ? "Edit Photo Album" : "Create Photo Album";

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

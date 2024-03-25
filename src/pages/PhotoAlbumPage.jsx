import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getOnePhotoAlbumThunk,
  removePhotoAlbumThunk,
} from "../redux/gallery/operationsGallery";
import {
  selectOnePhotoAlbum,
  selectStatus,
} from "../redux/gallery/selectorGallery";

import { Button, ButtonGroup } from "react-bootstrap";

import PhotoAlbum from "../components/Gallery/PhotoAlbum";
import BackBtn from "../components/shared/BackBtn";
import IsLoggedIn from "../components/shared/IsLoggedIn";
import Loader from "../components/shared/Loader";

import navTabs from "../assets/navTabs";
import confirmationDialog from "../assets/utils/confirmationDialog";

const PhotoAlbumPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const photoAlbum = useSelector(selectOnePhotoAlbum);
  const status = useSelector(selectStatus);

  const isDisabled = status === "pending";

  const handleDelete = () => {
    confirmationDialog(() => {
      dispatch(removePhotoAlbumThunk(id));
      navigate(navTabs.gallery.path);
    }, "Are you sure you want to delete?");
  };

  useEffect(() => {
    dispatch(getOnePhotoAlbumThunk(id));
  }, [dispatch, id]);

  if (status === "pending") {
    return <Loader />;
  }

  return (
    <>
      <div className="d-flex flex-column flex-lg-row justify-content-lg-between align-items-center mb-4">
        <h4 className="text-secondary fw-bold mb-3 mb-lg-0">
          {photoAlbum ? photoAlbum.title : "No Album Found"}
        </h4>
        <div className="d-flex flex-row-reverse">
          {photoAlbum && (
            <IsLoggedIn>
              <ButtonGroup className="ms-3">
                <Link
                  className="btn btn-primary"
                  to={navTabs.gallery.editPhotoAlbumPath(photoAlbum.id)}
                >
                  Edit
                </Link>
                <Button
                  type="button"
                  variant="danger"
                  disabled={isDisabled}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </IsLoggedIn>
          )}
          <BackBtn path={navTabs.gallery.path}>Back To Gallery</BackBtn>
        </div>
      </div>
      {photoAlbum && <PhotoAlbum photoAlbum={photoAlbum} />}
    </>
  );
};

export default PhotoAlbumPage;

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  getOnePhotoAlbumThunk,
  removePhotoAlbumThunk,
} from "../redux/gallery/operationsGallery";
import {
  selectError,
  selectOnePhotoAlbum,
  selectStatus,
} from "../redux/gallery/selectorGallery";

import { useAlert } from "../assets/customHooks/useAlert";
import Alert from "../components/shared/Alert";

import PhotoAlbum from "../components/Gallery/PhotoAlbum";
import BackBtn from "../components/shared/BackBtn";
import IsLoggedIn from "../components/shared/IsLoggedIn";
import Loader from "../components/shared/Loader";

import navTabs from "../assets/navTabs";
import confirmationDialog from "../assets/utils/confirmationDialog";

const PhotoAlbumPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { alertState, showAlert } = useAlert();
  const { id } = useParams();
  const dispatch = useDispatch();
  const error = useSelector(selectError);
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

  useEffect(() => {
    switch (status) {
      case "rejected":
        showAlert(error, "danger");
        break;

      case "album loaded":
        setIsLoaded(true);
        break;

      case "picture removed":
        showAlert("Picture deleted", "success");
        break;

      default:
        break;
    }
  }, [error, showAlert, status]);

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <>
      <Alert state={alertState} />
      <div className="d-flex flex-column flex-lg-row justify-content-lg-between align-items-center mb-4">
        <h4 className="text-secondary fw-bold mb-3 mb-lg-0">
          {photoAlbum.title}
        </h4>
        <div className="text-end">
          <BackBtn path={navTabs.gallery.path}>Back To Gallery</BackBtn>
          <IsLoggedIn>
            <div className="btn-group ms-3">
              <Link
                className="btn btn-primary"
                to={navTabs.gallery.editPhotoAlbumPath(photoAlbum.id)}
              >
                Edit
              </Link>
              <button
                className="btn btn-danger"
                disabled={isDisabled}
                type="button"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </IsLoggedIn>
        </div>
      </div>
      <PhotoAlbum photoAlbum={photoAlbum} />
    </>
  );
};

export default PhotoAlbumPage;

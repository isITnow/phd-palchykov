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
import Section from "../components/shared/Section";

const PhotoAlbumPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const error = useSelector(selectError);
  const photoAlbum = useSelector(selectOnePhotoAlbum);
  const status = useSelector(selectStatus);
  const { alert, showAlert } = useAlert();

  const isDisabled = status === "pending";

  const handleDelete = () => {
    dispatch(removePhotoAlbumThunk(id));
    navigate("/gallery");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <Section>
      <Alert state={alert} />
      <div className="d-flex flex-column flex-lg-row justify-content-lg-between align-items-center mb-4">
        <h4 className="text-secondary fw-bold mb-3 mb-lg-0">
          {photoAlbum.title}
        </h4>
        <div className="text-end">
          <BackBtn path="/gallery">Back To Gallery</BackBtn>
          <IsLoggedIn>
            <div className="btn-group ms-3">
              <Link
                to={`/gallery/photo_albums/${photoAlbum.id}/edit`}
                className="btn btn-primary"
              >
                Edit
              </Link>
              <button
                type="button"
                className="btn btn-danger"
                disabled={isDisabled}
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </IsLoggedIn>
        </div>
      </div>
      <PhotoAlbum photoAlbum={photoAlbum} />
    </Section>
  );
};

export default PhotoAlbumPage;

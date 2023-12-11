import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  getOnePhotoAlbumThunk,
  removePhotoAlbumThunk,
} from "../redux/gallery/operationsGallery";
import {
  selectOnePhotoAlbum,
  selectError,
  selectStatus,
} from "../redux/gallery/selectorGallery";

import Alert from "../components/shared/Alert";
import { useAlert } from "../assets/customHooks/useAlert";

import BackBtn from "../components/shared/BackBtn";
import Loader from "../components/shared/Loader";
import PhotoAlbum from "../components/Gallery/PhotoAlbum";
import Section from "../components/shared/Section";

import useSignInStatus from "../assets/customHooks/useSignInStatus";

const PhotoAlbumPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const error = useSelector(selectError);
  const photoAlbum = useSelector(selectOnePhotoAlbum);
  const status = useSelector(selectStatus);
  const { alert, showAlert } = useAlert();
  const isLoggedIn = useSignInStatus();

  const isDisabled = status === "pending";

  const handleClick = () => {
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
          <BackBtn path="/gallery">Back to Gallery</BackBtn>
          {isLoggedIn && (
            <div className="btn-group ms-3">
              <Link
                to={`/gallery/photo_albums/${photoAlbum.id}/edit`}
                className="btn btn-primary"
              >
                edit
              </Link>
              <button
                type="button"
                className="btn btn-danger"
                disabled={isDisabled}
                onClick={() => handleClick()}
              >
                delete
              </button>
            </div>
          )}
        </div>
      </div>
      <PhotoAlbum photoAlbum={photoAlbum} />
    </Section>
  );
};

export default PhotoAlbumPage;

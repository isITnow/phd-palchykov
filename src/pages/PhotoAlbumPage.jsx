import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  getOnePhotoAlbumThunk,
  // removePhotoAlbumThunk,
} from "../redux/gallery/operationsGallery";
import {
  selectOnePhotoAlbum,
  selectError,
  selectStatus,
} from "../redux/gallery/selectorGallery";

import Alert from "../components/shared/Alert";
import { useAlert } from "../assets/customHooks/useAlert";

import Loader from "../components/shared/Loader";
import PhotoAlbum from "../components/Gallery/PhotoAlbum";
import Section from "../components/shared/Section";

// import useSignInStatus from "../assets/customHooks/useSignInStatus";

const PhotoAlbumPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const error = useSelector(selectError);
  const photoAlbum = useSelector(selectOnePhotoAlbum);
  const status = useSelector(selectStatus);
  const { alert, showAlert } = useAlert();
  // const isLoggedIn = useSignInStatus();

  // const isReady = isLoaded && photoAlbum;

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

      // case "removed":
      //   navigate("/posts");
      //   break;

      // case "comment added":
      //   showAlert("Comment published successfully", "success");
      //   break;

      // case "comment removed":
      //   showAlert("Comment deleted", "success");
      //   break;
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
      <PhotoAlbum photoAlbum={photoAlbum} />
    </Section>
  );
};

export default PhotoAlbumPage;

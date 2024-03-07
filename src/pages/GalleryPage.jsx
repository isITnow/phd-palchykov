import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getPhotoAlbumsThunk } from "../redux/gallery/operationsGallery";
import {
  selectError,
  selectPhotoAlbums,
  selectStatus,
} from "../redux/gallery/selectorGallery";

import { useAlert } from "../assets/customHooks/useAlert";
import Alert from "../components/shared/Alert";

import PhotoAlbumsList from "../components/Gallery/PhotoAlbumsList";
import IsLoggedIn from "../components/shared/IsLoggedIn";
import Loader from "../components/shared/Loader";

import navTabs from "../assets/navTabs";

const GalleryPage = () => {
  const { alert, showAlert } = useAlert();
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const photoAlbums = useSelector(selectPhotoAlbums);
  const status = useSelector(selectStatus);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getPhotoAlbumsThunk(signal));

    return () => {
      // Abort the request when the component unmounts or when a dependency changes
      controller.abort();
    };
  }, [dispatch]);

  useEffect(() => {
    if (status === "rejected") {
      showAlert(`${error}. Please contact your administrator!`, "danger");
      return;
    }
    if (status === "removed") {
      showAlert("Photo album deleted", "success");
      return;
    }
  }, [error, showAlert, status]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <>
      <Alert state={alert} />
      <PhotoAlbumsList photoAlbums={photoAlbums} />
      <IsLoggedIn>
        <div className="mt-3 text-end">
          <Link
            className="btn btn-primary"
            to={navTabs.gallery.createPhotoAlbumPath}
          >
            Add Photo Album
          </Link>
        </div>
      </IsLoggedIn>
    </>
  );
};

export default GalleryPage;

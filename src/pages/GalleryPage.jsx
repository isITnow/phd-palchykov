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
import Section from "../components/shared/Section";

import navTabs from "../assets/navTabs";

const GalleryPage = () => {
  const dispatch = useDispatch();
  const { alert, showAlert } = useAlert();
  const error = useSelector(selectError);
  const status = useSelector(selectStatus);
  const photoAlbums = useSelector(selectPhotoAlbums);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <Section>
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
    </Section>
  );
};

export default GalleryPage;

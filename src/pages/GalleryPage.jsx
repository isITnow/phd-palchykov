import { useEffect } from "react";
// import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getPhotoAlbumsThunk } from "../redux/gallery/operationsGallery";
import {
  selectError,
  selectPhotoAlbums,
  selectStatus,
} from "../redux/gallery/selectorGallery";

import Alert from "../components/shared/Alert";
import { useAlert } from "../assets/customHooks/useAlert";

import Loader from "../components/shared/Loader";
import PhotoAlbumsList from "../components/Gallery/PhotoAlbumsList";
import Section from "../components/shared/Section";
import PhotoAlbumForm from "../components/Gallery/PhotoAlbumForm";

import useSignInStatus from "../assets/customHooks/useSignInStatus";

const GalleryPage = () => {
  const isLoggedIn = useSignInStatus();
  const dispatch = useDispatch();
  const { alert, showAlert } = useAlert();

  const error = useSelector(selectError);
  const status = useSelector(selectStatus);
  const photoAlbums = useSelector(selectPhotoAlbums);

  useEffect(() => {
    dispatch(getPhotoAlbumsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (status === "rejected") {
      showAlert(`${error}. Please contact your administrator!`, "danger");
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
      {isLoggedIn && <PhotoAlbumForm />}
    </Section>
  );
};

export default GalleryPage;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPhotoAlbumsThunk } from "../redux/gallery/operationsGallery";
import {
  selectPhotoAlbums,
  selectStatus,
} from "../redux/gallery/selectorGallery";

import PhotoAlbumsList from "../components/Gallery/PhotoAlbumsList";
import IsLoggedIn from "../components/shared/IsLoggedIn";
import Loader from "../components/shared/Loader";

import navTabs from "../assets/navTabs";

const GalleryPage = () => {
  const dispatch = useDispatch();
  const photoAlbums = useSelector(selectPhotoAlbums);
  const status = useSelector(selectStatus);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getPhotoAlbumsThunk(signal));

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <>
      <PhotoAlbumsList photoAlbums={photoAlbums} />
      <IsLoggedIn>
        <div className="d-flex flex-row-reverse mt-3">
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

import { useEffect } from "react";
import { Link } from "react-router-dom";

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
// import PhotoAlbumsList from "../components/Gallery/PhotoAlbumsList";
import Section from "../components/shared/Section";
import PhotoAlbumForm from "../components/Gallery/PhotoAlbumForm";

import useSignInStatus from "../assets/customHooks/useSignInStatus";

const GalleryPage = () => {
  return (
    <Section>
      {/* <PhotoAlbumsList /> */}
      <PhotoAlbumForm />
    </Section>
  );
};

export default GalleryPage;

import { useEffect } from "react";

import { useSelector } from "react-redux";
import {
  selectError,
  selectOnePhotoAlbum,
  selectStatus,
} from "../redux/gallery/selectorGallery";

import { useAlert } from "../assets/customHooks/useAlert";
import Alert from "../components/shared/Alert";

import FormRequirements from "../components/FormComponents/FormRequirements";
import FormTitle from "../components/FormComponents/FormTitle";
import PhotoAlbumForm from "../components/Gallery/PhotoAlbumForm";
import Section from "../components/shared/Section";

const requirementsList = [
  "Album title",
  "Cover image",
  "Photos (multiple select)",
];

const PhotoAlbumOperationsPage = ({ edit }) => {
  const { alert, showAlert } = useAlert();
  const error = useSelector(selectError);
  const photoAlbum = useSelector(selectOnePhotoAlbum);
  const status = useSelector(selectStatus);

  const title = edit ? "Edit Photo album" : "Create Photo album";

  useEffect(() => {
    if (status === "rejected") {
      showAlert(error, "danger");
      return;
    }

    if (status === "fulfilled") {
      const text = edit
        ? "Photo album updated successfully"
        : "Photo album created successfully";
      showAlert(text, "success");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <Section>
      <Alert state={alert} />
      <FormTitle>{title}</FormTitle>
      <FormRequirements requirementsList={requirementsList} />
      <PhotoAlbumForm photoAlbum={edit ? photoAlbum : null} status={status} />
    </Section>
  );
};

export default PhotoAlbumOperationsPage;

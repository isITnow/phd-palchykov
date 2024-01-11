import { Form, Formik } from "formik";
import FormWarning from "../FormComponents/FormWarning";

import { useDispatch } from "react-redux";
import {
  addPhotoAlbumThunk,
  updatePhotoAlbumThunk,
} from "../../redux/gallery/operationsGallery";

import { validation } from "../../assets/utils/validationSchema";
import CustomInput from "../FormComponents/CustomInput";
import BackBtn from "../shared/BackBtn";
import SubmitBtn from "../shared/SubmitBtn";

// Allows to get unique message from array of messages
const getValidationMessage = (errors) => {
  const values = Object.values(errors).filter((value) => value);
  const validationMessage = Array.from(new Set(values)).join(", ");
  return validationMessage;
};

const PhotoAlbumForm = ({ photoAlbum, status }) => {
  const dispatch = useDispatch();
  const isNewAlbum = !photoAlbum;

  const handleSubmit = async (values, actions) => {
    const { title, cover, photos } = values;

    const formData = new FormData();
    formData.append("photo_album[title]", title.trim());

    if (cover) {
      formData.append("photo_album[cover_image]", cover);
    }

    if (photos.length) {
      photos.forEach((photo) => {
        formData.append("photo_album[pictures][]", photo);
      });
    }

    if (isNewAlbum) {
      dispatch(addPhotoAlbumThunk(formData));
      actions.resetForm();
    } else {
      dispatch(
        updatePhotoAlbumThunk({ id: photoAlbum.id, photoAlbum: formData })
      );
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Formik
      initialValues={{
        title: isNewAlbum ? "" : photoAlbum.title,
        cover: "",
        photos: [],
      }}
      validationSchema={validation.photoAlbumSchema}
      onSubmit={handleSubmit}
    >
      {(props) => {
        const isDisabled = props.isSubmitting || status === "pending";
        const submitBtnText = isNewAlbum
          ? "Create Photo Album"
          : "Update Photo Album";
        const backPath = isNewAlbum
          ? "/gallery"
          : `/gallery/photo_albums/${photoAlbum.id}`;
        return (
          <Form>
            <CustomInput
              label="Title"
              name="title"
              type="text"
              bsclass="mb-3"
              autoFocus
            />
            <div className="col-md-6 mb-3">
              <label
                htmlFor="cover"
                className="form-label px-3 text-secondary fw-bold"
              >
                Cover Image
              </label>
              <input
                className="form-control"
                id="cover"
                type="file"
                onChange={(e) => {
                  props.setFieldValue("cover", e.target.files[0]);
                }}
              />
              {props.errors.cover && (
                <FormWarning>{props.errors.cover}</FormWarning>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label
                htmlFor="photo"
                className="form-label px-3 text-secondary fw-bold"
              >
                Photos
              </label>
              <input
                className="form-control"
                id="photo"
                type="file"
                multiple
                onChange={(e) => {
                  props.setFieldValue("photos", [...e.target.files]);
                }}
              />
              {props.errors.photos && (
                <FormWarning>
                  {getValidationMessage(props.errors.photos)}
                </FormWarning>
              )}
            </div>
            <div className="text-end mt-3">
              <div className="btn-group">
                <BackBtn path={backPath}>Cancel</BackBtn>
                <SubmitBtn text={submitBtnText} disabled={isDisabled} />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PhotoAlbumForm;

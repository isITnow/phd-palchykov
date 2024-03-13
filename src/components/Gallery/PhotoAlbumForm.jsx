import { useDispatch } from "react-redux";
import {
  addPhotoAlbumThunk,
  updatePhotoAlbumThunk,
} from "../../redux/gallery/operationsGallery";

import { Form, Formik } from "formik";
import {
  ButtonGroup,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";

import CustomInput from "../FormComponents/CustomInput";
import FormWarning from "../FormComponents/FormWarning";
import BackBtn from "../shared/BackBtn";
import RequiredBadge from "../shared/RequiredBadge";
import SubmitBtn from "../shared/SubmitBtn";

import navTabs from "../../assets/navTabs";
import { validation } from "../../assets/utils/validationSchema";

//* Creates unique error message from array of error messages
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
        cover: "",
        photos: [],
        title: isNewAlbum ? "" : photoAlbum.title,
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
          ? navTabs.gallery.path
          : navTabs.gallery.photoAlbumPath(photoAlbum.id);
        return (
          <Form>
            <CustomInput
              bsclass="mb-3"
              label="Title"
              name="title"
              required
              type="text"
            />
            <Col md="6" className="mb-3">
              <FormGroup controlId="coverImage">
                <FormLabel className="px-3 text-secondary fw-bold">
                  Cover Image
                  {isNewAlbum && <RequiredBadge />}
                </FormLabel>
                <FormControl
                  type="file"
                  onChange={(e) => {
                    props.setFieldValue("cover", e.target.files[0]);
                  }}
                />
                {props.errors.cover && (
                  <FormWarning>{props.errors.cover}</FormWarning>
                )}
              </FormGroup>
            </Col>
            <Col md="6" className="mb-3">
              <FormGroup controlId="photo">
                <FormLabel className="px-3 text-secondary fw-bold">
                  Photos
                </FormLabel>
                <FormControl
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
              </FormGroup>
            </Col>
            <div className="d-flex flex-row-reverse mt-3">
              <ButtonGroup>
                <BackBtn path={backPath}>Cancel</BackBtn>
                <SubmitBtn text={submitBtnText} disabled={isDisabled} />
              </ButtonGroup>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PhotoAlbumForm;

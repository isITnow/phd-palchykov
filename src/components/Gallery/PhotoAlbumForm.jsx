import { Form, Formik } from "formik";

import { useDispatch } from "react-redux";
import { addPhotoAlbumThunk } from "../../redux/gallery/operationsGallery";

// import { validation } from "../../assets/utils/validationSchema";
import CustomInput from "../FormComponents/CustomInput";
import BackBtn from "../shared/BackBtn";
import SubmitBtn from "../shared/SubmitBtn";

const PhotoAlbumForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    const { title, cover, photos } = values;
    console.log("cover: ", cover);

    const formData = new FormData();
    formData.append("photo_album[title]", title.trim());
    formData.append("photo_album[cover_image]", cover);
    [...photos].forEach((photo) => {
      formData.append("photo_album[pictures][]", photo);
    });

    dispatch(addPhotoAlbumThunk(formData));

    // window.scrollTo({
    //   top: 0,
    //   behavior: "smooth",
    // });
  };

  return (
    <Formik
      initialValues={{
        title: "",
        cover: "",
        photos: [],
      }}
      // validationSchema={validation.colleagueSchema}
      onSubmit={handleSubmit}
    >
      {(props) => {
        const isDisabled = false;
        const submitBtnText = "Create Photo album";
        return (
          <Form>
            <CustomInput
              label="Title"
              name="title"
              type="text"
              bsclass="mb-3"
              autoFocus
            />
            <label
              htmlFor="cover"
              className="form-label px-3 text-secondary fw-bold"
            >
              Cover image
            </label>
            <input
              className="form-control mb-3"
              id="cover"
              type="file"
              onChange={(e) => {
                props.setFieldValue("cover", e.target.files[0]);
              }}
            />
            <label
              htmlFor="photo"
              className="form-label px-3 text-secondary fw-bold"
            >
              Photos
            </label>
            <input
              className="form-control mb-3"
              id="photo"
              type="file"
              multiple
              onChange={(e) => {
                props.setFieldValue("photos", e.target.files);
              }}
            />
            <div className="text-end mt-3">
              <div className="btn-group">
                <BackBtn path="/colleagues">Cancel</BackBtn>
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

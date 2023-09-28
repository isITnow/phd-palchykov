import { Form, Formik } from "formik";

import { useDispatch } from "react-redux";
import {
  addColleagueThunk,
  updateColleagueThunk,
} from "../../redux/colleagues/operationsColleagues";

import BackBtn from "../shared/BackBtn";
import CustomInput from "../FormComponents/CustomInput";
import SubmitBtn from "../shared/SubmitBtn";

import { validation } from "../../assets/utils/validationSchema";

const ColleagueForm = ({ colleague, status }) => {
  const dispatch = useDispatch();

  const isNewItem = !colleague;

  const handleSubmit = async (values, actions) => {
    const { name, position, phone, email, photo } = values;

    const formData = new FormData();
    formData.append("colleague[name]", name.trim());
    formData.append("colleague[position]", position.trim());
    formData.append("colleague[phone]", phone.trim());
    formData.append("colleague[email]", email.trim().toLowerCase());

    if (photo) {
      formData.append("colleague[photo]", photo);
    }

    if (isNewItem) {
      dispatch(addColleagueThunk(formData));
      actions.resetForm();
    } else {
      dispatch(updateColleagueThunk({ id: colleague.id, colleague: formData }));
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Formik
      initialValues={
        isNewItem
          ? {
              name: "",
              position: "",
              email: "",
              phone: "",
              photo: "",
            }
          : colleague
      }
      validationSchema={validation.colleagueSchema}
      onSubmit={handleSubmit}
    >
      {(props) => {
        const isDisabled = props.isSubmitting || status === "pending";
        const submitBtnText = isNewItem
          ? "Create Colleague"
          : "Update Colleague";
        return (
          <Form>
            <CustomInput
              label="Name"
              name="name"
              type="text"
              bsclass="mb-3"
              autoFocus
            />
            <CustomInput
              label="Position"
              name="position"
              type="text"
              bsclass="mb-3"
            />
            <CustomInput
              label="Email"
              name="email"
              type="email"
              bsclass="mb-3"
            />
            <CustomInput
              label="Phone"
              name="phone"
              type="text"
              bsclass="mb-3"
            />
            <label
              htmlFor="photo"
              className="form-label px-3 text-secondary fw-bold"
            >
              Photo
            </label>
            <input
              className="form-control mb-3"
              id="photo"
              type="file"
              onChange={(e) => {
                props.setFieldValue("photo", e.target.files[0]);
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

export default ColleagueForm;

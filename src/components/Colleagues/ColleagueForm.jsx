import { Form, Formik } from "formik";
import FormWarning from "../FormComponents/FormWarning";

import { useDispatch } from "react-redux";
import {
  addColleagueThunk,
  updateColleagueThunk,
} from "../../redux/colleagues/operationsColleagues";

import CustomInput from "../FormComponents/CustomInput";
import BackBtn from "../shared/BackBtn";
import RequiredBadge from "../shared/RequiredBadge";
import SubmitBtn from "../shared/SubmitBtn";

import navTabs from "../../assets/navTabs";
import { validation } from "../../assets/utils/validationSchema";

const ColleagueForm = ({ colleague, status }) => {
  const dispatch = useDispatch();

  const isNewItem = !colleague;

  const handleSubmit = async (values, actions) => {
    const { name, position, phone, email, photo } = values;

    const formData = new FormData();
    formData.append("colleague[name]", name.trim());
    formData.append("colleague[position]", position.trim());

    if (phone) {
      formData.append("colleague[phone]", phone.trim());
    }

    if (email) {
      formData.append("colleague[email]", email.trim().toLowerCase());
    }

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
              email: "",
              name: "",
              phone: "",
              photo: "",
              position: "",
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
              // autoFocus
              bsclass="mb-3"
              label="Name"
              name="name"
              required
              type="text"
            />
            <CustomInput
              bsclass="mb-3"
              label="Position"
              name="position"
              required
              type="text"
            />
            <CustomInput
              bsclass="mb-3"
              label="Email"
              name="email"
              required
              type="email"
            />
            <CustomInput
              bsclass="mb-3"
              label="Phone"
              name="phone"
              placeholder="+380775554433"
              type="text"
            />
            <div className="col-md-6 mb-3">
              <label
                className="form-label px-3 text-secondary fw-bold"
                htmlFor="photo"
              >
                Photo
                {isNewItem && <RequiredBadge />}
              </label>
              <input
                className="form-control"
                id="photo"
                type="file"
                onChange={(e) => {
                  props.setFieldValue("photo", e.target.files[0]);
                }}
              />
              {props.errors.photo && (
                <FormWarning>{props.errors.photo}</FormWarning>
              )}
            </div>
            <div className="text-end mt-3">
              <div className="btn-group">
                <BackBtn path={navTabs.colleagues.path}>Cancel</BackBtn>
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

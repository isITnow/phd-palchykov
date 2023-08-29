import { Form, Formik } from "formik";
// import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  addColleagueThunk,
  updateColleagueThunk,
} from "../../redux/colleagues/operationsColleagues";
import { selectColleagues } from "../../redux/colleagues/selectorColleagues";

import CustomInput from "../FormComponents/CustomInput";

import { validation } from "../../assets/utils/validationSchema";

const ColleagueForm = ({ colleague }) => {
  const dispatch = useDispatch();
  const { status } = useSelector(selectColleagues);

  const isNewItem = !colleague;
  // const navigate = useNavigate();

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

    isNewItem
      ? dispatch(addColleagueThunk(formData))
      : dispatch(
          updateColleagueThunk({ id: colleague.id, colleague: formData })
        );

    if (status === "fulfilled" && isNewItem) {
      actions.resetForm();
    }
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
      {(props) => (
        <Form>
          <CustomInput label="Name" name="name" type="text" autoFocus />
          <CustomInput label="Position" name="position" type="text" />
          <CustomInput label="Email" name="email" type="email" />
          <CustomInput label="Phone" name="phone" type="text" />
          <input
            className="form-control mb-3"
            type="file"
            onChange={(e) => {
              props.setFieldValue("photo", e.target.files[0]);
            }}
          />
          <button
            disabled={status === "pending"}
            type="submit"
            className="btn btn-primary mt-3"
          >
            {isNewItem ? "Create colleague" : "Update colleague"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ColleagueForm;

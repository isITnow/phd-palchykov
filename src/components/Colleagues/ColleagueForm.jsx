import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../assets/utils/useAlert";

import { useDispatch, useSelector } from "react-redux";
import { addColleagueThunk } from "../../redux/colleagues/operationsColleagues";
import { selectColleagues } from "../../redux/colleagues/selectorColleagues";

import Alert from "../Alert";
import CustomInput from "../FormComponents/CustomInput";

import { validation } from "../../assets/utils/validationSchema";

const ColleagueForm = ({ colleague }) => {
  const dispatch = useDispatch();
  const { status, error } = useSelector(selectColleagues);

  const isNewItem = !colleague;
  const navigate = useNavigate();
  const { alert, showAlert } = useAlert();

  const handleSubmit = async (values, actions) => {
    const { name, position, phone, email, photo } = values;

    const formData = new FormData();
    formData.append("colleague[name]", name);
    formData.append("colleague[position]", position);
    formData.append("colleague[phone]", phone);
    formData.append("colleague[email]", email);

    if (photo) {
      formData.append("colleague[photo]", photo);
    }

    dispatch(addColleagueThunk(formData));

    console.log("form error: ", error);
    console.log("form status: ", status);

    if (!isNewItem) {
      if (status === "fulfilled") {
        navigate("/colleagues");
        return;
      }
      if (status === "rejected") {
        showAlert(error, "danger");
        // return
      }
    }

    if (status === "fulfilled") {
      actions.resetForm();
      showAlert("Card created successfully", "success");
    }
    if (status === "rejected") {
      showAlert(error, "danger");
    }
  };

  return (
    <>
      {alert.visible && <Alert state={alert} />}
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
    </>
  );
};

export default ColleagueForm;

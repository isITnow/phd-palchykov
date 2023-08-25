import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../assets/utils/useAlert";

import Alert from "../Alert";
import CustomInput from "../FormComponents/CustomInput";

import { colleaguesAPI } from "../../services/colleaguesAPI";
import { validation } from "../../assets/utils/validationSchema";

const ColleagueForm = ({ colleague }) => {
  const isNewItem = !colleague;
  const navigate = useNavigate();
  const { alert, showAlert } = useAlert();

  const handleSubmit = async (values, actions) => {
    const { name, position, phone, email, photo } = values;
    let message = "";

    const formData = new FormData();
    formData.append("colleague[name]", name);
    formData.append("colleague[position]", position);
    formData.append("colleague[phone]", phone);
    formData.append("colleague[email]", email);

    if (photo) {
      formData.append("colleague[photo]", photo);
    }

    try {
      const response = isNewItem
        ? await colleaguesAPI.postColleague(formData)
        : await colleaguesAPI.editColleague(colleague.id, formData);

      if (response.status === 201) {
        actions.resetForm();
        message = "Colleague created successfully";
        showAlert(message, "success");
      } else if (response.status === 202) {
        message = "Colleague updated successfully";
        showAlert(message, "success");
        return navigate("/colleagues");
      } else {
        message = "Failed to save record. Contact your administrator!";
        showAlert(message, "danger");
      }
    } catch (error) {
      message = "Error occurred. Contact your administrator!";
      showAlert(message, "danger");

      console.log("Error occurred while saving the record:", error);
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
              disabled={props.isSubmitting}
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

import { Form, Formik } from "formik";

import { useDispatch } from "react-redux";
import { loginThunk } from "../../redux/auth/operationsAuth";

import CustomInput from "../FormComponents/CustomInput";
import { validation } from "../../assets/utils/validationSchema";

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    const { email, password } = values;

    const formData = new FormData();
    formData.append("email", email.trim().toLowerCase());
    formData.append("password", password.trim());

    dispatch(loginThunk(formData));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validation.loginSchema}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form>
          <CustomInput label="Email" name="email" type="email" autoFocus />
          <CustomInput label="Password" name="password" type="password" />
          <div className="text-end">
            <button
              disabled={props.isSubmitting}
              type="submit"
              className="btn btn-primary mt-3"
            >
              Log In
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;

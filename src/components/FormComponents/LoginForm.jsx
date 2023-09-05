import { Form, Formik } from "formik";

import { useDispatch } from "react-redux";
import { loginThunk } from "../../redux/auth/operationsAuth";

import CustomInput from "../FormComponents/CustomInput";

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    const { email, password } = values;
    console.log("values: ", values);

    const formData = new FormData();
    formData.append("email", email.trim());
    formData.append("password", password.trim());

    dispatch(loginThunk(formData));
  };

  return (
    <Formik
      initialValues={{
        email: "rom@example.com",
        password: "password",
      }}
      // validationSchema={}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form>
          <CustomInput label="Email" name="email" type="email" autoFocus />
          <CustomInput label="Password" name="password" type="password" />
          <button
            disabled={props.isSubmitting}
            type="submit"
            className="btn btn-primary mt-3"
          >
            submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;

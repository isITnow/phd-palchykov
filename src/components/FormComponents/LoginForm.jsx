import { Form, Formik } from "formik";

import { useDispatch } from "react-redux";
import { loginThunk } from "../../redux/auth/operationsAuth";

import CustomInput from "../FormComponents/CustomInput";
import SubmitBtn from "../shared/SubmitBtn";
import { validation } from "../../assets/utils/validationSchema";

const LoginForm = ({ status }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    const { email, password } = values;

    const formData = new FormData();
    formData.append("user[email]", email.trim().toLowerCase());
    formData.append("user[password]", password.trim());

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
      {(props) => {
        const isDisabled = props.isSubmitting || status === "pending";
        return (
          <Form>
            <CustomInput
              label="Email"
              name="email"
              type="email"
              bsclass="mb-3"
              autoFocus
            />
            <CustomInput
              label="Password"
              name="password"
              type="password"
              bsclass="mb-3"
            />
            <div className="text-end">
              <SubmitBtn text="Log In" disabled={isDisabled} />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;

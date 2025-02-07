import { Form, Formik } from "formik";

import CustomInput from "../FormComponents/CustomInput";
import SubmitBtn from "../shared/SubmitBtn";

import { validation } from "../../assets/utils/validationSchema";
import useAuthForm from "./hooks/useAuthForm";

const AuthForm = ({ closeModal }) => {
  const { handleSubmit, isPending } = useAuthForm(closeModal);

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
        const isDisabled = props.isSubmitting || isPending;
        return (
          <Form>
            <CustomInput
              label="Email"
              name="email"
              type="email"
              bsclass="mb-3"
              autoComplete="on"
              autoFocus
            />
            <CustomInput
              label="Password"
              name="password"
              type="password"
              bsclass="mb-3"
            />
            <div className="d-flex flex-row-reverse">
              <SubmitBtn text="Log In" disabled={isDisabled} />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AuthForm;

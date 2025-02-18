import { Form, Formik } from 'formik';

import CustomInput from '@/components/FormComponents/CustomInput';
import SubmitBtn from '@/components/shared/SubmitBtn';

import { validation } from '@/utils/validationSchema';
import useAuthForm from '@/components/Auth/hooks/useAuthForm';

const AuthForm = ({ closeModal }) => {
  const { handleSubmit, isPending } = useAuthForm(closeModal);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
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
              classnames="mb-3"
              autoComplete="on"
              autoFocus
            />
            <CustomInput
              label="Password"
              name="password"
              type="password"
              classnames="mb-3"
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

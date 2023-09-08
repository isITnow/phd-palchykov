import { Form, Formik } from "formik";

import { useDispatch } from "react-redux";
import { addPostThunk } from "../../redux/posts/operationsPosts";

import CustomTextArea from "../FormComponents/CustomTextArea";
import { validation } from "../../assets/utils/validationSchema";

const PostForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    const { body } = values;

    const formData = new FormData();
    formData.append("post[body]", body.trim());

    dispatch(addPostThunk(formData));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        body: "",
      }}
      validationSchema={validation.postSchema}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form>
          <CustomTextArea label="Post text" name="body" type="text" autoFocus />
          <button
            disabled={props.isSubmitting}
            type="submit"
            className="btn btn-primary"
          >
            submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default PostForm;

import { Form, Formik } from "formik";

import { useDispatch } from "react-redux";
import {
  addPostThunk,
  updatePostThunk,
} from "../../redux/posts/operationsPosts";

import CustomTextArea from "../FormComponents/CustomTextArea";
import { validation } from "../../assets/utils/validationSchema";

const PostForm = ({ post }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    const { body } = values;

    const formData = new FormData();
    formData.append("post[body]", body.trim());

    if (post) {
      dispatch(updatePostThunk({ id: post.id, post: formData }));
    } else {
      dispatch(addPostThunk(formData));
      actions.resetForm();
    }
  };

  return (
    <Formik
      initialValues={{
        body: post ? post.body : "",
      }}
      validationSchema={validation.postSchema}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form>
          <CustomTextArea
            label="Post text"
            name="body"
            type="text"
            rows="3"
            autoFocus
          />
          <button
            disabled={props.isSubmitting}
            type="submit"
            className="btn btn-primary"
          >
            {post ? "update" : "submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default PostForm;

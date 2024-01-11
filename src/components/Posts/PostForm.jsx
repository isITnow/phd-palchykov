import { Form, Formik } from "formik";

import { useDispatch } from "react-redux";
import {
  addPostThunk,
  updatePostThunk,
} from "../../redux/posts/operationsPosts";

import CustomTextArea from "../FormComponents/CustomTextArea";
import SubmitBtn from "../shared/SubmitBtn";
import { validation } from "../../assets/utils/validationSchema";

const PostForm = ({ post, status }) => {
  const dispatch = useDispatch();
  const isNewItem = !post;

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
        body: isNewItem ? "" : post.body,
      }}
      validationSchema={validation.postSchema}
      onSubmit={handleSubmit}
    >
      {(props) => {
        const isDisabled = props.isSubmitting || status === "pending";
        const submitBtnText = isNewItem ? "Add Post" : "Update Post";

        return (
          <Form>
            <CustomTextArea
              label="Post Text"
              name="body"
              type="text"
              rows="3"
            />
            <div className="text-end">
              <SubmitBtn text={submitBtnText} disabled={isDisabled} />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PostForm;

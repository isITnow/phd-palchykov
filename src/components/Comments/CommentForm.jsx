import { Form, Formik } from "formik";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addCommentThunk } from "../../redux/comments/operationsComments";
import { selectUserName } from "../../redux/auth/selectorAuth";

import CustomInput from "../FormComponents/CustomInput";
import CustomTextArea from "../FormComponents/CustomTextArea";
import { validation } from "../../assets/utils/validationSchema";

const CommentForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentUserName = useSelector(selectUserName) || null;

  const handleSubmit = async (values, actions) => {
    const { body, author } = values;

    const formData = new FormData();
    formData.append("comment[author]", author.trim());
    formData.append("comment[body]", body.trim());

    dispatch(addCommentThunk({ post_id: id, comment: formData }));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        author: currentUserName || "",
        body: "",
      }}
      validationSchema={validation.commentSchema}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form>
          <CustomInput label="Name" name="author" type="text" />
          <CustomTextArea label="Comment" name="body" type="text" rows="3" />
          <div className="text-end">
            <button
              disabled={props.isSubmitting}
              type="submit"
              className="btn btn-primary"
            >
              Add comment
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CommentForm;

import { Form, Formik } from "formik";
import FormWarning from "../FormComponents/FormWarning";

import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { selectUserName } from "../../redux/auth/selectorAuth";
import { addCommentThunk } from "../../redux/comments/operationsComments";

import CustomInput from "../FormComponents/CustomInput";
import CustomTextArea from "../FormComponents/CustomTextArea";
import SubmitBtn from "../shared/SubmitBtn";

import { validation } from "../../assets/utils/validationSchema";

const CommentForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentUserName = useSelector(selectUserName) || null;

  const handleSubmit = async (values, actions) => {
    const { body, author, commentImage } = values;

    const formData = new FormData();
    formData.append("comment[author]", author.trim());
    formData.append("comment[body]", body.trim());

    if (commentImage) {
      formData.append("comment[comment_image]", commentImage);
    }

    dispatch(addCommentThunk({ post_id: id, comment: formData }));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        author: currentUserName || "",
        body: "",
        commentImage: "",
      }}
      validationSchema={validation.commentSchema}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form>
          <CustomInput label="Name" name="author" type="text" bsclass="mb-3" />
          <CustomTextArea label="Comment" name="body" type="text" rows="3" />
          <div className="col-md-6 mb-3">
            <label
              htmlFor="image"
              className="form-label px-3 text-secondary fw-bold"
            >
              Image
            </label>
            <input
              className="form-control"
              id="commentImage"
              type="file"
              onChange={(e) => {
                props.setFieldValue("commentImage", e.target.files[0]);
              }}
            />
            {props.errors.commentImage && (
              <FormWarning>{props.errors.commentImage}</FormWarning>
            )}
          </div>
          <div className="text-end">
            <SubmitBtn disabled={props.isSubmitting} text="Add Comment" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CommentForm;

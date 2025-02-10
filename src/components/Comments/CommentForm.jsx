import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addCommentThunk } from '../../redux/comments/operationsComments';

import { Form, Formik } from 'formik';
import { Col, FormControl, FormGroup, FormLabel } from 'react-bootstrap';

import CustomInput from '../FormComponents/CustomInput';
import CustomTextArea from '../FormComponents/CustomTextArea';
import FormWarning from '../FormComponents/FormWarning';
import SubmitBtn from '../shared/SubmitBtn';

import { validation } from '../../assets/utils/validationSchema';
import { useUser } from '../../context/UserContext';

const CommentForm = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const { id } = useParams();

  const currentUserName = user?.username || null;

  const handleSubmit = async (values, actions) => {
    const { body, author, commentImage } = values;

    const formData = new FormData();
    formData.append('comment[author]', author.trim());
    formData.append('comment[body]', body.trim());

    if (commentImage) {
      formData.append('comment[comment_image]', commentImage);
    }

    dispatch(addCommentThunk({ post_id: id, comment: formData }));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        author: currentUserName || '',
        body: '',
        commentImage: '',
      }}
      validationSchema={validation.commentSchema}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form>
          <CustomInput label="Name" name="author" type="text" bsclass="mb-3" />
          <CustomTextArea
            label="Comment"
            name="body"
            required
            rows="3"
            type="text"
          />
          <Col md="6" className="mb-3">
            <FormGroup controlId="image">
              <FormLabel className="px-3 text-secondary fw-bold">
                Image
              </FormLabel>
              <FormControl
                type="file"
                onChange={(e) => {
                  props.setFieldValue('commentImage', e.target.files[0]);
                }}
              />
              {props.errors.commentImage && (
                <FormWarning>{props.errors.commentImage}</FormWarning>
              )}
            </FormGroup>
          </Col>
          <div className="d-flex flex-row-reverse">
            <SubmitBtn disabled={props.isSubmitting} text="Add Comment" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CommentForm;

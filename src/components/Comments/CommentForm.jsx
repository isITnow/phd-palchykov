import { Form, Formik } from 'formik';
import { Col, FormControl, FormGroup, FormLabel } from 'react-bootstrap';

import CustomInput from '../FormComponents/CustomInput';
import CustomTextArea from '../FormComponents/CustomTextArea';
import FormWarning from '../FormComponents/FormWarning';
import SubmitBtn from '../shared/SubmitBtn';

import { validation } from '../../assets/utils/validationSchema';
import useComments from './hooks/useComments';

const CommentForm = () => {
  const { handleSubmit, username, isPending } = useComments();

  return (
    <Formik
      enableReinitialize
      initialValues={{
        author: username || '',
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
            <SubmitBtn disabled={isPending} text="Add Comment" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CommentForm;

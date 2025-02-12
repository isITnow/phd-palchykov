import { Form, Formik } from 'formik';
import {
  ButtonGroup,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';

import BackBtn from '../../components/shared/BackBtn';
import CustomInput from '../../components/FormComponents/CustomInput';
import CustomTextArea from '../../components/FormComponents/CustomTextArea';
import FormCard from '../../components/FormComponents/FormCard';
import SubmitBtn from '../../components/shared/SubmitBtn';

import { validation } from '../../assets/utils/validationSchema';
import navTabs from '../../assets/navTabs';
import useEditIllustration from './hooks/useEditIllustration';

const EditIllustrationForm = ({ illustration, researchId }) => {
  const { handleSubmit, isPending } = useEditIllustration({
    illustration,
    researchId,
  });
  return (
    <FormCard
      title="Edit Illustration"
      body={
        <Formik
          initialValues={{
            description: illustration.description,
            schema: '',
            sequence_number: illustration.sequence_number,
          }}
          validationSchema={validation.editIllustrationSchema}
          onSubmit={handleSubmit}
        >
          {(props) => {
            const submitBtnText = 'Update Illustration';
            return (
              <Form>
                <Col lg="3">
                  <CustomInput
                    bsclass="mb-3"
                    label="Sequence Num"
                    name="sequence_number"
                    required
                    type="number"
                  />
                </Col>
                <CustomTextArea
                  label="Description"
                  name="description"
                  required
                  rows="5"
                  type="text-area"
                />
                <FormGroup controlId="illustrationImage">
                  <FormLabel className="px-3 text-secondary fw-bold">
                    Illustration Image
                  </FormLabel>
                  <FormControl
                    className="mb-3"
                    type="file"
                    onChange={(e) => {
                      props.setFieldValue('schema', e.target.files[0]);
                    }}
                  />
                </FormGroup>
                <div className="d-flex flex-row-reverse mt-3">
                  <ButtonGroup>
                    <BackBtn path={navTabs.researches.path}>Cancel</BackBtn>
                    <SubmitBtn text={submitBtnText} disabled={isPending} />
                  </ButtonGroup>
                </div>
              </Form>
            );
          }}
        </Formik>
      }
    />
  );
};

export default EditIllustrationForm;

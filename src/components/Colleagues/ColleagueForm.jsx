import { Form, Formik } from 'formik';
import {
  ButtonGroup,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';

import BackBtn from '../shared/BackBtn';
import CustomInput from '../FormComponents/CustomInput';
import FormWarning from '../FormComponents/FormWarning';
import RequiredBadge from '../shared/RequiredBadge';
import SubmitBtn from '../shared/SubmitBtn';

import { validation } from '../../assets/utils/validationSchema';
import navTabs from '../../assets/navTabs';
import useColleaguesForm from './hooks/useColleaguesForm';

const ColleagueForm = ({ colleague }) => {
  const isNewItem = !colleague;
  const colleagueId = colleague?.id;
  const submitBtnText = isNewItem ? 'Create Colleague' : 'Update Colleague';

  const { handleSubmit, isPending } = useColleaguesForm(colleagueId);

  return (
    <Formik
      enableReinitialize
      initialValues={
        isNewItem
          ? {
              email: '',
              name: '',
              phone: '',
              photo: '',
              position: '',
            }
          : colleague
      }
      validationSchema={validation.colleagueSchema}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form>
          <CustomInput
            bsclass="mb-3"
            label="Name"
            name="name"
            required
            type="text"
          />
          <CustomInput
            bsclass="mb-3"
            label="Position"
            name="position"
            required
            type="text"
          />
          <CustomInput bsclass="mb-3" label="Email" name="email" type="email" />
          <CustomInput
            bsclass="mb-3"
            label="Phone"
            name="phone"
            placeholder="+380775554433"
            type="tel"
          />
          <Col md="6" className="mb-3">
            <FormGroup controlId="photo">
              <FormLabel className="px-3 text-secondary fw-bold">
                Photo
                {isNewItem && <RequiredBadge />}
              </FormLabel>
              <FormControl
                type="file"
                onChange={(e) => {
                  props.setFieldValue('photo', e.target.files[0]);
                }}
              />
              {props.errors.photo && (
                <FormWarning>{props.errors.photo}</FormWarning>
              )}
            </FormGroup>
          </Col>
          <div className="d-flex flex-row-reverse mt-3">
            <ButtonGroup>
              <BackBtn path={navTabs.colleagues.path}>Cancel</BackBtn>
              <SubmitBtn text={submitBtnText} disabled={isPending} />
            </ButtonGroup>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ColleagueForm;

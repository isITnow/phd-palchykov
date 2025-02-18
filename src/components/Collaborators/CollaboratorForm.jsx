import { Form, Formik } from 'formik';
import {
  ButtonGroup,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';

import BackBtn from '@/components/shared/BackBtn';
import CustomInput from '@/components/FormComponents/CustomInput';
import CustomSelect from '@/components/FormComponents/CustomSelect';
import FormWarning from '@/components/FormComponents/FormWarning';
import RequiredBadge from '@/components/shared/RequiredBadge';
import SubmitBtn from '@/components/shared/SubmitBtn';

import { collaboratorsCategories } from '@/pages/collaborators/helpers/constants';
import { validation } from '@/utils/validationSchema';
import navTabs from '@/utils/navTabs';
import useCollaboratorsForm from '@/components/Collaborators/hooks/useCollaboratorsForm';

const categories = [
  { label: 'Ukrainian', value: collaboratorsCategories.LOCAL },
  { label: 'International', value: collaboratorsCategories.INTERNATIONAL },
  { label: 'Alumni', value: collaboratorsCategories.ALUMNI },
];

const CollaboratorForm = ({ collaborator }) => {
  const isNewItem = !collaborator;
  const collaboratorId = collaborator?.id;
  const submitBtnText = isNewItem
    ? 'Create Collaborator'
    : 'Update Collaborator';

  const { handleSubmit, isPending } = useCollaboratorsForm(collaboratorId);

  return (
    <Formik
      enableReinitialize
      initialValues={
        isNewItem
          ? {
              category: '',
              link: '',
              name: '',
              photo: '',
              position: '',
            }
          : collaborator
      }
      validationSchema={validation.collaboratorSchema}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form>
          <CustomInput
            classnames="mb-3"
            label="Name"
            name="name"
            required
            type="text"
          />
          <CustomInput
            classnames="mb-3"
            label="Position"
            name="position"
            required
            type="text"
          />
          <CustomSelect
            classnames="mb-3"
            items={categories}
            label="Collaboration category"
            name="category"
            required
          />
          <CustomInput classnames="mb-3" label="Link" name="link" type="text" />
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
              <BackBtn path={navTabs.collaborators.path}>Cancel</BackBtn>
              <SubmitBtn text={submitBtnText} disabled={isPending} />
            </ButtonGroup>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CollaboratorForm;

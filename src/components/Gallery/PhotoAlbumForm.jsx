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
import FormWarning from '@/components/FormComponents/FormWarning';
import RequiredBadge from '@/components/shared/RequiredBadge';
import SubmitBtn from '@/components/shared/SubmitBtn';

import { validation } from '@/utils/validationSchema';
import navTabs from '@/utils/navTabs';
import usePhotoAlbumForm from '@/components/Gallery/hooks/usePhotoAlbumForm';

//* Creates unique error message from array of error messages
const getValidationMessage = (errors) => {
  const values = Object.values(errors).filter((value) => value);
  const validationMessage = Array.from(new Set(values)).join(', ');
  return validationMessage;
};

const PhotoAlbumForm = ({ photoAlbum }) => {
  const { handleSubmit, isPending } = usePhotoAlbumForm(photoAlbum?.id);

  const isNewAlbum = !photoAlbum;
  const submitBtnText = isNewAlbum
    ? 'Create Photo Album'
    : 'Update Photo Album';
  const backPath = isNewAlbum
    ? navTabs.gallery.path
    : navTabs.gallery.photoAlbumPath(photoAlbum.id);

  return (
    <Formik
      initialValues={{
        cover: '',
        photos: [],
        title: isNewAlbum ? '' : photoAlbum.title,
      }}
      validationSchema={validation.photoAlbumSchema}
      onSubmit={handleSubmit}
    >
      {(props) => {
        return (
          <Form>
            <CustomInput
              bsclass="mb-3"
              label="Title"
              name="title"
              required
              type="text"
            />
            <Col md="6" className="mb-3">
              <FormGroup controlId="coverImage">
                <FormLabel className="px-3 text-secondary fw-bold">
                  Cover Image
                  {isNewAlbum && <RequiredBadge />}
                </FormLabel>
                <FormControl
                  type="file"
                  onChange={(e) => {
                    props.setFieldValue('cover', e.target.files[0]);
                  }}
                />
                {props.errors.cover && (
                  <FormWarning>{props.errors.cover}</FormWarning>
                )}
              </FormGroup>
            </Col>
            <Col md="6" className="mb-3">
              <FormGroup controlId="photo">
                <FormLabel className="px-3 text-secondary fw-bold">
                  Photos
                </FormLabel>
                <FormControl
                  type="file"
                  multiple
                  onChange={(e) => {
                    props.setFieldValue('photos', [...e.target.files]);
                  }}
                />
                {props.errors.photos && (
                  <FormWarning>
                    {getValidationMessage(props.errors.photos)}
                  </FormWarning>
                )}
              </FormGroup>
            </Col>
            <div className="d-flex flex-row-reverse mt-3">
              <ButtonGroup>
                <BackBtn path={backPath}>Cancel</BackBtn>
                <SubmitBtn text={submitBtnText} disabled={isPending} />
              </ButtonGroup>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PhotoAlbumForm;

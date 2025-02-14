import { FieldArray, Form, Formik } from 'formik';
import {
  Button,
  ButtonGroup,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from 'react-bootstrap';

import BackBtn from '@/components/shared/BackBtn';
import Badge from '@/components/shared/Badge';
import CustomInput from '@/components/FormComponents/CustomInput';
import CustomSelect from '@/components/FormComponents/CustomSelect';
import CustomTextArea from '@/components/FormComponents/CustomTextArea';
import FormWarning from '@/components/FormComponents/FormWarning';
import RequiredBadge from '@/components/shared/RequiredBadge';
import SubmitBtn from '@/components/shared/SubmitBtn';

import { validation } from '@/utils/validationSchema';
import navTabs from '@/utils/navTabs';
import usePublicationForm from './hooks/usePublicationForm';

const PublicationForm = ({ publication }) => {
  const isNewItem = !publication;
  const publicationId = publication?.id;
  const { handleSubmit, isPending, periodYears, periodId } =
    usePublicationForm(publicationId);

  return (
    <Formik
      enableReinitialize
      initialValues={
        isNewItem
          ? {
              abstract: '',
              authors: [''],
              cover: '',
              sequence_number: 0,
              source_url: '',
              source: '',
              title: '',
              year: '',
            }
          : publication
      }
      validationSchema={validation.publicationSchema}
      onSubmit={handleSubmit}
    >
      {(props) => {
        const submitBtnText = isNewItem
          ? 'Create Publication'
          : 'Update Publication';
        return (
          <Form>
            <div className="row">
              <div className="col-6 col-md-8">
                <CustomSelect
                  items={periodYears}
                  label="Publication Year"
                  name="year"
                  required
                />
              </div>
              <div className="col-6 col-md-4">
                <CustomInput
                  bsclass="mb-3"
                  label="Sequence Num"
                  name="sequence_number"
                  required
                  type="number"
                />
              </div>
            </div>
            <CustomTextArea
              bsclass="mb-3"
              label="Publication Title"
              name="title"
              required
              rows="2"
              type="text"
            />
            <CustomInput
              bsclass="mb-3"
              label="Source"
              name="source"
              required
              type="text"
            />
            <CustomInput
              bsclass="mb-3"
              label="Source URL"
              name="source_url"
              required
              type="text"
            />
            <Col md="6" className="mb-3">
              <FormGroup controlId="coverImage">
                <FormLabel className="px-3 text-secondary fw-bold">
                  Cover Image
                  {isNewItem && <RequiredBadge />}
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
              <FormGroup controlId="abstractImage">
                <FormLabel className="px-3 text-secondary fw-bold">
                  Abstract Image
                  {isNewItem && <RequiredBadge />}
                </FormLabel>
                <FormControl
                  type="file"
                  onChange={(e) => {
                    props.setFieldValue('abstract', e.target.files[0]);
                  }}
                />
                {props.errors.abstract && (
                  <FormWarning>{props.errors.abstract}</FormWarning>
                )}
              </FormGroup>
            </Col>
            <div>
              <FieldArray name="authors">
                {(fieldArrayProps) => {
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { authors } = values;
                  const authorsListClass =
                    authors.length > 1
                      ? 'row-cols-1 row-cols-md-2'
                      : 'row-cols-1';
                  return (
                    <>
                      {authors && authors.length > 0 ? (
                        <Row as={'ul'} className={authorsListClass}>
                          {authors.map((author, index) => (
                            <Col as={'li'} className="mb-3" key={index}>
                              <div className="p-2 border border-1 rounded">
                                {authors.length > 1 && (
                                  <Badge index={index} text={'author'} />
                                )}
                                <CustomInput
                                  bsclass="mb-3"
                                  label="Author"
                                  name={`authors.${index}`}
                                  required
                                  type="text"
                                />
                                <div className="d-flex flex-row-reverse">
                                  <ButtonGroup>
                                    <Button
                                      size="sm"
                                      type="button"
                                      variant="outline-danger"
                                      onClick={() => remove(index)} // remove a friend from the list
                                    >
                                      Remove Author
                                    </Button>
                                    <Button
                                      size="sm"
                                      type="button"
                                      variant="outline-primary"
                                      onClick={() => push('')}
                                    >
                                      Add Author
                                    </Button>
                                  </ButtonGroup>
                                </div>
                              </div>
                            </Col>
                          ))}
                        </Row>
                      ) : (
                        <div className="d-flex flex-row-reverse">
                          <Button
                            size="sm"
                            type="button"
                            variant="outline-primary"
                            onClick={() => push('')}
                          >
                            Add Authors
                          </Button>
                        </div>
                      )}
                    </>
                  );
                }}
              </FieldArray>
            </div>
            <div className="d-flex flex-row-reverse mt-3">
              <ButtonGroup>
                <BackBtn path={navTabs.publications.path(periodId)}>
                  Cancel
                </BackBtn>
                <SubmitBtn text={submitBtnText} disabled={isPending} />
              </ButtonGroup>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PublicationForm;

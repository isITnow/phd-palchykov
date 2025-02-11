import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  addPublicationThunk,
  updatePublicationThunk,
} from '../../redux/publications/operationsPublications';

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

import CustomInput from '../FormComponents/CustomInput';
import CustomSelect from '../FormComponents/CustomSelect';
import CustomTextArea from '../FormComponents/CustomTextArea';
import FormWarning from '../FormComponents/FormWarning';
import BackBtn from '../shared/BackBtn';
import Badge from '../shared/Badge';
import RequiredBadge from '../shared/RequiredBadge';
import SubmitBtn from '../shared/SubmitBtn';

import navTabs from '../../assets/navTabs';
import getCurrentPeriod from '../../assets/utils/getCurrentEntity';
import getYearsArray from '../../assets/utils/getYearsArray';
import { validation } from '../../assets/utils/validationSchema';
import useSelectPeriods from '../../hooks/useSelectPeriods';

const PublicationForm = ({ publication, status }) => {
  const dispatch = useDispatch();
  const { period_id } = useParams();
  const periods = useSelectPeriods();

  const currentPeriodId = parseInt(period_id);
  const currentPeriod = getCurrentPeriod(periods, currentPeriodId);
  const periodYears = getYearsArray(currentPeriod).length
    ? getYearsArray(currentPeriod)
    : ['no data'];

  const isNewItem = !publication;

  const handleSubmit = async (values, actions) => {
    const {
      abstract,
      authors,
      cover,
      sequence_number,
      source_url,
      source,
      title,
      year,
    } = values;

    const formData = new FormData();
    formData.append('publication[sequence_number]', sequence_number);
    formData.append('publication[source_url]', source_url.trim());
    formData.append('publication[source]', source.trim());
    formData.append('publication[title]', title.trim());
    formData.append('publication[title]', title.trim());
    formData.append('publication[year]', year);
    if (authors.length) {
      authors.forEach((item) => {
        formData.append('publication[authors][]', item.trim());
      });
    }
    if (cover) {
      formData.append('publication[cover]', cover);
    }
    if (abstract) {
      formData.append('publication[abstract]', abstract);
    }

    if (isNewItem) {
      dispatch(addPublicationThunk({ period_id, publication: formData }));
      actions.resetForm();
    } else {
      dispatch(
        updatePublicationThunk({
          period_id,
          publication_id: publication.id,
          publication: formData,
        })
      );
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Formik
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
        const isDisabled = props.isSubmitting || status === 'pending';
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
                <BackBtn path={navTabs.publications.path(period_id)}>
                  Cancel
                </BackBtn>
                <SubmitBtn text={submitBtnText} disabled={isDisabled} />
              </ButtonGroup>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PublicationForm;

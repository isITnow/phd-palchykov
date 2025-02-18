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

import CustomInput from '@/components/FormComponents/CustomInput';
import CustomTextArea from '@/components/FormComponents/CustomTextArea';
import FormWarning from '@/components/FormComponents/FormWarning';
import BackBtn from '@/components/shared/BackBtn';
import Badge from '@/components/shared/Badge';
import SubmitBtn from '@/components/shared/SubmitBtn';

import useNewsForm from '@/components/News/hooks/useNewsForm';
import navTabs from '@/utils/navTabs';
import { currentDate } from '@/utils/dateHelper';
import { validation } from '@/utils/validationSchema';

const NewsForm = ({ newsItem }) => {
  const isNewItem = !newsItem;
  const newsId = newsItem?.id;
  const { handleSubmit, isPending } = useNewsForm(newsId);

  return (
    <Formik
      enableReinitialize
      initialValues={
        isNewItem
          ? {
              body: '',
              date: '',
              image: '',
              links: [],
              title: '',
            }
          : { ...newsItem, body: newsItem.body || '' }
      }
      validationSchemas={validation.newsSchema}
      onSubmit={handleSubmit}
    >
      {(props) => {
        const isDisabled = isPending;
        const submitBtnText = isNewItem ? 'Create News' : 'Update News';
        return (
          <Form>
            <CustomInput
              classnames="mb-3"
              label="News Title"
              name="title"
              required
              type="text"
            />
            <CustomTextArea
              label="Description"
              name="body"
              rows="5"
              type="text-area"
            />
            <CustomInput
              classnames="mb-3"
              label="Date"
              name="date"
              placeholder={currentDate()}
              required
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
                    props.setFieldValue('image', e.target.files[0]);
                  }}
                />
                {props.errors.image && (
                  <FormWarning>{props.errors.image}</FormWarning>
                )}
              </FormGroup>
            </Col>
            <div>
              <FieldArray name="links">
                {(fieldArrayProps) => {
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { links } = values;
                  const linksListClass =
                    links.length > 1
                      ? 'row-cols-1 row-cols-md-2'
                      : 'row-cols-1';
                  return (
                    <>
                      {links && links.length > 0 ? (
                        <Row as={'ul'} className={linksListClass}>
                          {links.map((link, index) => (
                            <Col as={'li'} className="mb-3" key={index}>
                              <div className="p-2 border border-2 rounded">
                                {links.length > 1 && (
                                  <Badge index={index} text={'link'} />
                                )}
                                <CustomInput
                                  classnames="mb-3"
                                  label="Link"
                                  name={`links.${index}`}
                                  type="text"
                                />
                                <div className="d-flex flex-row-reverse">
                                  <ButtonGroup>
                                    <Button
                                      size="sm"
                                      type="button"
                                      variant="outline-danger"
                                      onClick={() => remove(index)}
                                    >
                                      Remove Link
                                    </Button>
                                    <Button
                                      size="sm"
                                      type="button"
                                      variant="outline-primary"
                                      onClick={() => push('')}
                                    >
                                      Add Link
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
                            Add Links
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
                <BackBtn path={navTabs.news.path}>Cancel</BackBtn>
                <SubmitBtn text={submitBtnText} disabled={isDisabled} />
              </ButtonGroup>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default NewsForm;

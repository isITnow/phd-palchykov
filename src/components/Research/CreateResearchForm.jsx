import { FieldArray, Form, Formik } from 'formik';
import {
  Button,
  ButtonGroup,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';

import BackBtn from '@/components/shared/BackBtn';
import Badge from '@/components/shared/Badge';
import CustomInput from '@/components/FormComponents/CustomInput';
import CustomTextArea from '@/components/FormComponents/CustomTextArea';
import RequiredBadge from '@/components/shared/RequiredBadge';
import SubmitBtn from '@/components/shared/SubmitBtn';

import { validation } from '@/utils/validationSchema';
import navTabs from '@/utils/navTabs';
import useCreateResearch from '@/components/Research/hooks/useCreateResearch';

const CreateResearchForm = () => {
  const { handleSubmit, isPending } = useCreateResearch();

  return (
    <Formik
      initialValues={{
        title: '',
        illustrationList: [
          {
            description: '',
            schema: '',
            sequence_number: 0,
          },
        ],
        sourceList: [
          {
            source: '',
            source_url: '',
          },
        ],
      }}
      validationSchema={validation.researchSchema}
      onSubmit={handleSubmit}
    >
      {(props) => {
        return (
          <Form>
            <CustomInput
              classnames="mb-3"
              label="Research Title"
              name="title"
              required
              type="text"
            />
            <div>
              <FieldArray name="illustrationList">
                {({ push, remove, form }) => {
                  const { values } = form;
                  const { illustrationList } = values;
                  return (
                    <>
                      {illustrationList && illustrationList.length > 0 ? (
                        <ListGroup>
                          {illustrationList.map((item, index) => (
                            <ListGroupItem
                              className="border-1 mb-2"
                              key={index}
                            >
                              {illustrationList.length > 1 && (
                                <Badge index={index} text={'illustration'} />
                              )}
                              <CustomTextArea
                                label="Description"
                                name={`illustrationList.${index}.description`}
                                required
                                rows="5"
                                type="text-area"
                              />
                              <Col md={6} className="mb-3">
                                <FormGroup controlId="illustrationImage">
                                  <FormLabel className="px-3 text-secondary fw-bold">
                                    Illustration Image
                                    <RequiredBadge />
                                  </FormLabel>
                                  <FormControl
                                    type="file"
                                    onChange={(e) => {
                                      props.setFieldValue(
                                        `illustrationList.${index}.schema`,
                                        e.target.files[0]
                                      );
                                    }}
                                  />
                                  {/* //TODO: schema validation error message */}
                                  {/* {props.illustrationList && (
                                    <FormWarning>
                                      {props.errors.illustrationList}
                                    </FormWarning>
                                  )} */}
                                </FormGroup>
                              </Col>
                              <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-end">
                                <CustomInput
                                  label="Sequence Num"
                                  name={`illustrationList.${index}.sequence_number`}
                                  required
                                  type="number"
                                />
                                <ButtonGroup className="mt-3 mt-md-0">
                                  <Button
                                    size="sm"
                                    type="button"
                                    variant="outline-danger"
                                    onClick={() => remove(index)}
                                  >
                                    Remove Illustration
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline-primary"
                                    type="button"
                                    onClick={() =>
                                      push({
                                        description: '',
                                        schema: '',
                                        sequence_number: 0,
                                      })
                                    }
                                  >
                                    Add Illustration
                                  </Button>
                                </ButtonGroup>
                              </div>
                            </ListGroupItem>
                          ))}
                        </ListGroup>
                      ) : (
                        <div className="d-flex flex-row-reverse">
                          <Button
                            size="sm"
                            type="button"
                            variant="outline-primary"
                            onClick={() =>
                              push({
                                description: '',
                                schema: '',
                                sequence_number: 0,
                              })
                            }
                          >
                            Add Illustrations
                          </Button>
                        </div>
                      )}
                    </>
                  );
                }}
              </FieldArray>
            </div>
            <div className="mt-3">
              <FieldArray name="sourceList">
                {({ push, insert, remove, form }) => {
                  const { values } = form;
                  const { sourceList } = values;
                  const sourceListClass =
                    sourceList.length > 1
                      ? 'row-cols-1 row-cols-md-2'
                      : 'row-cols-1';
                  return (
                    <>
                      {sourceList && sourceList.length > 0 ? (
                        <Row as={'ul'} className={sourceListClass}>
                          {sourceList.map((item, index) => (
                            <Col className="mb-3" key={index}>
                              <div className="p-2 border border-1 rounded">
                                {sourceList.length > 1 && (
                                  <Badge index={index} text={'resource'} />
                                )}
                                <CustomInput
                                  classnames="mb-3"
                                  label="Source"
                                  name={`sourceList.${index}.source`}
                                  required
                                  type="text"
                                />
                                <CustomInput
                                  classnames="mb-3"
                                  label="Source URL"
                                  name={`sourceList.${index}.source_url`}
                                  required
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
                                      Remove Source
                                    </Button>
                                    <Button
                                      size="sm"
                                      type="button"
                                      variant="outline-primary"
                                      onClick={() =>
                                        insert(index, {
                                          source: '',
                                          source_url: '',
                                        })
                                      }
                                    >
                                      Add Source
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
                            type="button"
                            variant="outline-primary"
                            onClick={() =>
                              push({
                                source: '',
                                source_url: '',
                              })
                            }
                          >
                            Add Sources
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
                <BackBtn path={navTabs.researches.path}>Cancel</BackBtn>
                <SubmitBtn text="Create Research Card" disabled={isPending} />
              </ButtonGroup>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateResearchForm;

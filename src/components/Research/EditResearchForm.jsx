import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import { FieldArray, Form, Formik } from 'formik';

import BackBtn from '@/components/shared/BackBtn';
import Badge from '@/components/shared/Badge';
import CustomInput from '@/components/FormComponents/CustomInput';
import FormCard from '@/components/FormComponents/FormCard';
import SubmitBtn from '@/components/shared/SubmitBtn';

import { validation } from '@/utils/validationSchema';
import navTabs from '@/utils/navTabs';
import useEditResearch from '@/components/Research/hooks/useEditResearch';

const EditResearchForm = ({ research }) => {
  const { handleSubmit, isPending } = useEditResearch(research);

  return (
    <FormCard
      title="Edit Research"
      body={
        <Formik
          enableReinitialize
          initialValues={{
            title: research.title,
            sourceList: research.source_list,
          }}
          validationSchema={validation.editResearchSchema}
          onSubmit={handleSubmit}
        >
          {() => {
            return (
              <Form>
                <CustomInput
                  bsclass="mb-3"
                  label="Research Title"
                  name="title"
                  required
                  type="text"
                />
                <div className="mt-3">
                  <FieldArray name="sourceList">
                    {({ push, remove, form }) => {
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
                                <Col as={'li'} className="mb-3" key={index}>
                                  <div className="p-2 border border-1 rounded">
                                    {sourceList.length > 1 && (
                                      <Badge index={index} text={'resource'} />
                                    )}
                                    <CustomInput
                                      bsclass="mb-3"
                                      label="Source"
                                      name={`sourceList.${index}.source`}
                                      required
                                      type="text"
                                    />
                                    <CustomInput
                                      bsclass="mb-3"
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
                                            push(index, {
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
                    <SubmitBtn text="Update Research" disabled={isPending} />
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

export default EditResearchForm;

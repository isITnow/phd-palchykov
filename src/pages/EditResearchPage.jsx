import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateResearchThunk } from "../redux/researches/operationsResearches";
import { selectResearches } from "../redux/researches/selectorResearches";

import { FieldArray, Form, Formik } from "formik";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";

import CustomInput from "../components/FormComponents/CustomInput";
import FormCard from "../components/FormComponents/FormCard";
import BackBtn from "../components/shared/BackBtn";
import Badge from "../components/shared/Badge";
import NoItemToEdit from "../components/shared/NoItemToEdit";
import SubmitBtn from "../components/shared/SubmitBtn";

import navTabs from "../assets/navTabs";
import { validation } from "../assets/utils/validationSchema";

const EditResearchPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { researches, status } = useSelector(selectResearches);

  const research = researches.find((research) => research.id === parseInt(id));
  const researchParsed = research && JSON.parse(research.payload);

  const handleSubmit = (values, actions) => {
    const { title, sourceList } = values;

    const researchFormData = new FormData();
    const payload = {
      title,
      sourceList,
    };
    researchFormData.append("research[payload]", JSON.stringify(payload));
    dispatch(
      updateResearchThunk({
        id: research.id,
        research: researchFormData,
      })
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    actions.setSubmitting(false);
  };

  if (!research) {
    return <NoItemToEdit backPath={navTabs.researches.path} item="Research" />;
  }

  return (
    <Col lg="8" className="mx-auto">
      <FormCard
        title="Edit Research"
        body={
          <Formik
            initialValues={{
              title: researchParsed.title,
              sourceList: researchParsed.sourceList,
            }}
            validationSchema={validation.editResearchSchema}
            onSubmit={handleSubmit}
          >
            {(props) => {
              const isDisabled = props.isSubmitting || status === "pending";
              const submitBtnText = "Update Research";
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
                            ? "row-cols-1 row-cols-md-2"
                            : "row-cols-1";
                        return (
                          <>
                            {sourceList && sourceList.length > 0 ? (
                              <Row as={"ul"} className={sourceListClass}>
                                {sourceList.map((item, index) => (
                                  <Col as={"li"} className="mb-3" key={index}>
                                    <div className="p-2 border border-1 rounded">
                                      {sourceList.length > 1 && (
                                        <Badge
                                          index={index}
                                          text={"resource"}
                                        />
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
                                                source: "",
                                                source_url: "",
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
                                      source: "",
                                      source_url: "",
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
                      <SubmitBtn text={submitBtnText} disabled={isDisabled} />
                    </ButtonGroup>
                  </div>
                </Form>
              );
            }}
          </Formik>
        }
      />
    </Col>
  );
};

export default EditResearchPage;

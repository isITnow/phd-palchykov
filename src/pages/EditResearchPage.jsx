import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateResearchThunk } from "../redux/researches/operationsResearches";
import { selectResearches } from "../redux/researches/selectorResearches";

import { FieldArray, Form, Formik } from "formik";

import { useAlert } from "../assets/customHooks/useAlert";
import Alert from "../components/shared/Alert";

import { Col } from "react-bootstrap";
import CustomInput from "../components/FormComponents/CustomInput";
import FormCard from "../components/FormComponents/FormCard";
import BackBtn from "../components/shared/BackBtn";
import Badge from "../components/shared/Badge";
import NoItemToEdit from "../components/shared/NoItemToEdit";
import Section from "../components/shared/Section";
import SubmitBtn from "../components/shared/SubmitBtn";

import navTabs from "../assets/navTabs";
import { validation } from "../assets/utils/validationSchema";

const EditResearchPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { researches, status, error } = useSelector(selectResearches);

  const { alert, showAlert } = useAlert();

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

  useEffect(() => {
    if (status === "rejected") {
      showAlert(error, "danger");
      return;
    }
    if (status === "updated") {
      showAlert("Research updated", "success");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (!research) {
    return <NoItemToEdit backPath={navTabs.researches.path} item="Research" />;
  }

  return (
    <Section>
      <Col lg="8" className="mx-auto">
        <Alert state={alert} />
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
                      label="Research title"
                      name="title"
                      type="text"
                      bsclass="mb-3"
                      // autoFocus
                    />
                    <div className="mt-3">
                      <FieldArray name="sourceList">
                        {({ push, insert, remove, form }) => {
                          const { values } = form;
                          const { sourceList } = values;
                          const sourceListClass =
                            sourceList.length > 1
                              ? "row row-cols-1 row-cols-md-2"
                              : "row row-cols-1";
                          return (
                            <>
                              {sourceList && sourceList.length > 0 ? (
                                <ul className={sourceListClass}>
                                  {sourceList.map((item, index) => (
                                    <li className="col mb-3" key={index}>
                                      <div className="p-2 border border-2 rounded">
                                        {sourceList.length > 1 && (
                                          <Badge
                                            index={index}
                                            text={"resource"}
                                          />
                                        )}
                                        <CustomInput
                                          type="text"
                                          label="Source"
                                          name={`sourceList.${index}.source`}
                                          bsclass="mb-3"
                                        />
                                        <CustomInput
                                          type="text"
                                          label="Source URL"
                                          name={`sourceList.${index}.source_url`}
                                          bsclass="mb-3"
                                        />
                                        <div className="text-end">
                                          <div
                                            className="btn-group"
                                            role="group"
                                          >
                                            <button
                                              type="button"
                                              className="btn btn-sm btn-outline-primary"
                                              onClick={() => remove(index)}
                                            >
                                              Remove Source
                                            </button>
                                            <button
                                              type="button"
                                              className="btn btn-sm btn-outline-primary"
                                              onClick={() =>
                                                insert(index, {
                                                  source: "",
                                                  source_url: "",
                                                })
                                              }
                                            >
                                              Add Source
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <div className="text-end">
                                  <button
                                    type="button"
                                    className="btn  btn-outline-primary"
                                    onClick={() =>
                                      push({
                                        source: "",
                                        source_url: "",
                                      })
                                    }
                                  >
                                    Add Sources
                                  </button>
                                </div>
                              )}
                            </>
                          );
                        }}
                      </FieldArray>
                    </div>
                    <div className="text-end mt-3">
                      <div className="btn-group">
                        <BackBtn path={navTabs.researches.path}>Cancel</BackBtn>
                        <SubmitBtn text={submitBtnText} disabled={isDisabled} />
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          }
        />
      </Col>
    </Section>
  );
};

export default EditResearchPage;

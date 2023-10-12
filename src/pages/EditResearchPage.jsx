import { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectResearches } from "../redux/researches/selectorResearches";
import { updateResearchThunk } from "../redux/researches/operationsResearches";

import { FieldArray, Form, Formik } from "formik";

import Alert from "../components/shared/Alert";
import { useAlert } from "../assets/customHooks/useAlert";

import Badge from "../components/shared/Badge";
import BackBtn from "../components/shared/BackBtn";
import CustomInput from "../components/FormComponents/CustomInput";
import FormTitle from "../components/FormComponents/FormTitle";
import Section from "../components/shared/Section";
import SubmitBtn from "../components/shared/SubmitBtn";

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
      showAlert("Research updated successfully", "success");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (!research) {
    return (
      <Section>
        <FormTitle>No Research to edit</FormTitle>
        <div className="d-flex justify-content-center">
          <BackBtn path="/researches">Cancel</BackBtn>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <Alert state={alert} />
      <FormTitle>Edit Research</FormTitle>
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
                autoFocus
              />
              <div className="mt-3">
                <FieldArray name="sourceList">
                  {({ push, insert, remove, form }) => {
                    const { values } = form;
                    const { sourceList } = values;
                    return (
                      <>
                        {sourceList && sourceList.length > 0 ? (
                          <ul className="list-group">
                            {sourceList.map((item, index) => (
                              <li
                                className="list-group-item border-2 mb-2"
                                key={index}
                              >
                                {sourceList.length > 1 && (
                                  <Badge index={index} text={"resource"} />
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
                                  <div className="btn-group" role="group">
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-outline-primary"
                                      onClick={() => remove(index)}
                                    >
                                      remove the source
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
                                      add a source
                                    </button>
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
                              Add a source
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
                  <BackBtn path="/researches">Cancel</BackBtn>
                  <SubmitBtn text={submitBtnText} disabled={isDisabled} />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Section>
  );
};

export default EditResearchPage;

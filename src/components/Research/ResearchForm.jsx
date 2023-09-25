import { FieldArray, Form, Formik } from "formik";

import { useDispatch } from "react-redux";
import { addResearchThunk } from "../../redux/researches/operationsResearches";

import { validation } from "../../assets/utils/validationSchema";

import Badge from "../shared/Badge";
import BackBtn from "../shared/BackBtn";
import CustomInput from "../FormComponents/CustomInput";
import CustomTextArea from "../FormComponents/CustomTextArea";
import SubmitBtn from "../shared/SubmitBtn";

const ResearchForm = ({ status }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const { title, illustrationList, sourceList } = values;

    let illustrationsData = [];
    illustrationList.forEach(({ schema, description }) => {
      const formData = new FormData();
      formData.append("illustration[description]", description.trim());
      formData.append("illustration[schema]", schema);
      illustrationsData.push(formData);
    });

    const researchFormData = new FormData();
    const payload = {
      title,
      sourceList,
    };
    researchFormData.append("research[payload]", JSON.stringify(payload));

    dispatch(
      addResearchThunk({ illustrationsData, research: researchFormData })
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        title: "",
        illustrationList: [
          {
            description: "",
            schema: "",
          },
        ],
        sourceList: [
          {
            source: "",
            source_url: "",
          },
        ],
      }}
      validationSchema={validation.researchSchema}
      onSubmit={handleSubmit}
    >
      {(props) => {
        const isDisabled = props.isSubmitting || status === "pending";
        return (
          <Form>
            <CustomInput
              label="Research title"
              name="title"
              type="text"
              autoFocus
            />
            <div>
              <FieldArray name="illustrationList">
                {({ push, remove, insert, form }) => {
                  const { values } = form;
                  const { illustrationList } = values;
                  return (
                    <div>
                      {illustrationList && illustrationList.length > 0 ? (
                        illustrationList.map((item, index) => (
                          <div className="" key={index}>
                            {illustrationList.length > 1 && (
                              <Badge index={index} text={"illustration"} />
                            )}
                            <CustomTextArea
                              label="Description"
                              type="text-area"
                              rows="5"
                              name={`illustrationList.${index}.description`}
                            />
                            <label
                              htmlFor="formFile"
                              className="form-label px-3 text-secondary fw-bold"
                            >
                              Illustration image
                            </label>
                            <input
                              className="form-control mb-3"
                              id="formFile"
                              type="file"
                              onChange={(e) => {
                                props.setFieldValue(
                                  `illustrationList.${index}.schema`,
                                  e.target.files[0]
                                );
                              }}
                            />
                            <div className="text-end mb-3">
                              <div className="btn-group" role="group">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => remove(index)}
                                >
                                  remove the illustration
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() =>
                                    insert(index, {
                                      description: "",
                                      schema: "",
                                    })
                                  }
                                >
                                  add an illustration
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-end">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() =>
                              push({
                                source: "",
                                source_url: "",
                              })
                            }
                          >
                            Add an illustration
                          </button>
                        </div>
                      )}
                    </div>
                  );
                }}
              </FieldArray>
            </div>
            <div className="mt-3">
              <FieldArray name="sourceList">
                {({ push, remove, form }) => {
                  const { values } = form;
                  const { sourceList } = values;
                  return (
                    <div>
                      {sourceList && sourceList.length > 0 ? (
                        sourceList.map((item, index) => (
                          <div className="" key={index}>
                            {sourceList.length > 1 && (
                              <Badge index={index} text={"resource"} />
                            )}
                            <CustomInput
                              type="text"
                              label="Source"
                              name={`sourceList.${index}.source`}
                            />
                            <CustomInput
                              type="text"
                              label="Source URL"
                              name={`sourceList.${index}.source_url`}
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
                                    push({
                                      source: "",
                                      source_url: "",
                                    })
                                  }
                                >
                                  add a new source
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
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
                    </div>
                  );
                }}
              </FieldArray>
            </div>
            <div className="text-end mt-3">
              <div className="btn-group">
                <BackBtn path="/research">Cancel</BackBtn>
                <SubmitBtn text="Create research card" disabled={isDisabled} />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ResearchForm;

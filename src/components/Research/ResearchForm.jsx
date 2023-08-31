import { FieldArray, Form, Formik } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { addResearchThunk } from "../../redux/researches/operationsResearches";
import { selectResearches } from "../../redux/researches/selectorResearches";

import { validation } from "../../assets/utils/validationSchema";

import CustomInput from "../FormComponents/CustomInput";
import CustomTextArea from "../FormComponents/CustomTextArea";
import Badge from "../shared/Badge";

const ResearchForm = () => {
  const dispatch = useDispatch();
  const { status } = useSelector(selectResearches);
  console.log("status: ", status);

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

    // if (status === "fulfilled") {
    //   console.log("HERE!");
    //   actions.resetForm();
    // }
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
      // validationSchema={validation.researchSchema}
      onSubmit={handleSubmit}
    >
      {(props) => (
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
                          <label htmlFor="formFile" className="form-label">
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
                          <div className="btn-group mb-3" role="group">
                            <button
                              type="button"
                              className="btn btn-outline-primary"
                              onClick={() => remove(index)} // remove a friend from the list
                            >
                              remove illustration
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-primary"
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
                      ))
                    ) : (
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() =>
                          push({
                            source: "",
                            source_url: "",
                          })
                        }
                      >
                        Add an illustration
                      </button>
                    )}
                  </div>
                );
              }}
            </FieldArray>
          </div>
          <div>
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
                          <div className="btn-group mb-3" role="group">
                            <button
                              type="button"
                              className="btn btn-outline-primary"
                              onClick={() => remove(index)} // remove a friend from the list
                            >
                              remove source
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-primary"
                              onClick={() =>
                                push({
                                  source: "",
                                  source_url: "",
                                })
                              } // insert an empty string at a position
                            >
                              add a new source
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() =>
                          push({
                            source: "",
                            source_url: "",
                          })
                        }
                      >
                        Add a source
                      </button>
                    )}
                  </div>
                );
              }}
            </FieldArray>
          </div>
          <button
            disabled={props.isSubmitting}
            type="submit"
            className="btn btn-primary mt-3"
          >
            Create research card
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ResearchForm;

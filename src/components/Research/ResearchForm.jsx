import { FieldArray, Form, Formik } from "formik";

import { useDispatch } from "react-redux";
import { addResearchThunk } from "../../redux/researches/operationsResearches";

import { validation } from "../../assets/utils/validationSchema";

import CustomInput from "../FormComponents/CustomInput";
import CustomTextArea from "../FormComponents/CustomTextArea";

const ResearchForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    // console.log("values: ", values);
    const { title, description, schema, sourceList } = values;

    const formData = new FormData();
    formData.append("illustration[description]", description.trim());
    formData.append("illustration[schema]", schema);

    const researchFormData = new FormData();
    const payload = {
      title,
      sourceList,
    };
    researchFormData.append("research[payload]", JSON.stringify(payload));

    dispatch(
      addResearchThunk({ illustration: formData, research: researchFormData })
    );
  };

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        schema: "",
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
      {(props) => (
        <Form>
          <CustomInput
            label="Research title"
            name="title"
            type="text"
            autoFocus
          />
          <CustomTextArea
            label="Description"
            name="description"
            type="text-area"
            rows="5"
          />
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Illustration image
            </label>
            <input
              className="form-control mb-3"
              id="formFile"
              type="file"
              onChange={(e) => {
                props.setFieldValue("schema", e.target.files[0]);
              }}
            />
          </div>
          <div>
            <FieldArray name="sourceList">
              {({ push, remove, form }) => {
                const { values } = form;
                const { sourceList } = values;
                return (
                  <div className="border-bottom border-3">
                    {sourceList && sourceList.length > 0 ? (
                      sourceList.map((item, index) => (
                        <div key={index}>
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
            // disabled={props.isSubmitting}
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

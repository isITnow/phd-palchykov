import { useParams } from "react-router-dom";
import { FieldArray, Form, Formik } from "formik";

import { useDispatch, useSelector } from "react-redux";
import {
  addPublicationThunk,
  updatePublicationThunk,
} from "../../redux/publications/operationsPublications";
import { selectPublications } from "../../redux/publications/selectorPublications";

import Badge from "../shared/Badge";
import CustomInput from "../FormComponents/CustomInput";

import { validation } from "../../assets/utils/validationSchema";

const PublicationForm = ({ publication }) => {
  const dispatch = useDispatch();
  const { status } = useSelector(selectPublications);
  const { period_id } = useParams();
  const isNewItem = !publication;

  const handleSubmit = async (values, actions) => {
    const { title, source_url, source, cover, abstract, authors } = values;

    const formData = new FormData();
    formData.append("publication[title]", title.trim());
    formData.append("publication[source]", source.trim());
    formData.append("publication[source_url]", source_url.trim());
    if (authors.length) {
      authors.forEach((element) => {
        formData.append("publication[authors][]", element.trim());
      });
    }
    if (cover) {
      formData.append("publication[cover]", cover);
    }
    if (abstract) {
      formData.append("publication[abstract]", abstract);
    }

    isNewItem
      ? dispatch(addPublicationThunk({ period_id, publication: formData }))
      : dispatch(
          updatePublicationThunk({
            period_id,
            publication_id: publication.id,
            publication: formData,
          })
        );

    if (status === "fulfilled" && isNewItem) {
      actions.resetForm();
    }
  };

  return (
    <Formik
      initialValues={
        isNewItem
          ? {
              title: "",
              source_url: "",
              source: "",
              cover: "",
              abstract: "",
              authors: [""],
            }
          : publication
      }
      validationSchema={validation.publicationSchema}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form>
          <CustomInput
            label="Publication title"
            name="title"
            type="text"
            autoFocus
          />
          <CustomInput label="Source" name="source" type="text" />
          <CustomInput label="Source URL" name="source_url" type="text" />
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Cover image
            </label>
            <input
              className="form-control mb-3"
              id="formFile"
              type="file"
              onChange={(e) => {
                props.setFieldValue("cover", e.target.files[0]);
              }}
            />
            <label htmlFor="formFile" className="form-label">
              Abstract
            </label>
            <input
              className="form-control"
              type="file"
              onChange={(e) => {
                props.setFieldValue("abstract", e.target.files[0]);
              }}
            />
          </div>
          <div>
            <FieldArray name="authors">
              {(fieldArrayProps) => {
                const { push, remove, insert, form } = fieldArrayProps;
                const { values } = form;
                const { authors } = values;
                return (
                  <div>
                    {authors && authors.length > 0 ? (
                      authors.map((author, index) => (
                        <div key={index}>
                          {authors.length > 1 && (
                            <Badge index={index} text={"author"} />
                          )}
                          <CustomInput
                            type="text"
                            label="Author"
                            name={`authors.${index}`}
                          />
                          <div className="btn-group mb-3" role="group">
                            <button
                              type="button"
                              className="btn btn-outline-primary"
                              onClick={() => remove(index)} // remove a friend from the list
                            >
                              remove author
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-primary"
                              onClick={() => insert(index, "")} // insert an empty string at a position
                            >
                              add an author
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => push("")}
                      >
                        Add an author
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
            {isNewItem ? "Create publication" : "Update publication"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default PublicationForm;

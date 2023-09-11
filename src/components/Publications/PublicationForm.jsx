import { useParams } from "react-router-dom";
import { FieldArray, Form, Formik } from "formik";

import { useDispatch, useSelector } from "react-redux";
import {
  addPublicationThunk,
  updatePublicationThunk,
} from "../../redux/publications/operationsPublications";
import { selectPeriods } from "../../redux/publicationPeriods/selectorPublicationPeriods";

import Badge from "../shared/Badge";
import CustomInput from "../FormComponents/CustomInput";
import CustomSelect from "../FormComponents/CustomSelect";

import { validation } from "../../assets/utils/validationSchema";
import getCurrentPeriod from "../../assets/utils/getCurrentEntity";
import getYearsArray from "../../assets/utils/getYearsArray";

const PublicationForm = ({ publication }) => {
  const dispatch = useDispatch();
  const { period_id } = useParams();
  const currentPeriodId = parseInt(period_id);
  const { periods } = useSelector(selectPeriods);
  const currentPeriod = getCurrentPeriod(periods, currentPeriodId);
  const periodYears = getYearsArray(currentPeriod);

  const isNewItem = !publication;

  const handleSubmit = async (values, actions) => {
    const { title, year, source_url, source, cover, abstract, authors } =
      values;

    const formData = new FormData();
    formData.append("publication[title]", title.trim());
    formData.append("publication[year]", year);
    formData.append("publication[title]", title.trim());
    formData.append("publication[source]", source.trim());
    formData.append("publication[source_url]", source_url.trim());
    if (authors.length) {
      authors.forEach((item) => {
        formData.append("publication[authors][]", item.trim());
      });
    }
    if (cover) {
      formData.append("publication[cover]", cover);
    }
    if (abstract) {
      formData.append("publication[abstract]", abstract);
    }

    if (isNewItem) {
      dispatch(addPublicationThunk({ period_id, publication: formData }));
      actions.resetForm();
    } else {
      dispatch(
        updatePublicationThunk({
          period_id,
          publication_id: publication.id,
          publication: formData,
        })
      );
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Formik
      initialValues={
        isNewItem
          ? {
              title: "",
              year: "",
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
          <CustomSelect
            label="Publication year"
            name="year"
            years={periodYears}
          />
          <CustomInput
            label="Publication title"
            name="title"
            type="text"
            autoFocus
          />
          <CustomInput label="Source" name="source" type="text" />
          <CustomInput label="Source URL" name="source_url" type="text" />
          <div className="w-50 mb-3">
            <label
              htmlFor="formFile"
              className="form-label px-3 text-secondary fw-bold"
            >
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
            <label
              htmlFor="formFile"
              className="form-label px-3 text-secondary fw-bold"
            >
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
                          <div className="text-end mb-3">
                            <div className="btn-group" role="group">
                              <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={() => remove(index)} // remove a friend from the list
                              >
                                remove the author
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
                        </div>
                      ))
                    ) : (
                      <div className="text-end">
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => push("")}
                        >
                          Add an author
                        </button>
                      </div>
                    )}
                  </div>
                );
              }}
            </FieldArray>
          </div>
          <div className="text-end mb-3">
            <button
              disabled={props.isSubmitting}
              type="submit"
              className="btn btn-primary"
            >
              {isNewItem ? "Create publication" : "Update publication"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PublicationForm;

import { FieldArray, Form, Formik } from "formik";
import { useParams } from "react-router-dom";
import FormWarning from "../FormComponents/FormWarning";

import { useDispatch, useSelector } from "react-redux";
import { selectPeriods } from "../../redux/publicationPeriods/selectorPublicationPeriods";
import {
  addPublicationThunk,
  updatePublicationThunk,
} from "../../redux/publications/operationsPublications";

import CustomInput from "../FormComponents/CustomInput";
import CustomSelect from "../FormComponents/CustomSelect";
import CustomTextArea from "../FormComponents/CustomTextArea";
import BackBtn from "../shared/BackBtn";
import Badge from "../shared/Badge";
import SubmitBtn from "../shared/SubmitBtn";

import navTabs from "../../assets/navTabs";
import getCurrentPeriod from "../../assets/utils/getCurrentEntity";
import getYearsArray from "../../assets/utils/getYearsArray";
import { validation } from "../../assets/utils/validationSchema";

const PublicationForm = ({ publication, status }) => {
  const dispatch = useDispatch();
  const { period_id } = useParams();
  const { periods } = useSelector(selectPeriods);

  const currentPeriodId = parseInt(period_id);
  const currentPeriod = getCurrentPeriod(periods, currentPeriodId);
  const periodYears = getYearsArray(currentPeriod).length
    ? getYearsArray(currentPeriod)
    : ["no data"];

  const isNewItem = !publication;

  const handleSubmit = async (values, actions) => {
    const {
      abstract,
      authors,
      cover,
      sequence_number,
      source_url,
      source,
      title,
      year,
    } = values;

    const formData = new FormData();
    formData.append("publication[sequence_number]", sequence_number);
    formData.append("publication[source_url]", source_url.trim());
    formData.append("publication[source]", source.trim());
    formData.append("publication[title]", title.trim());
    formData.append("publication[title]", title.trim());
    formData.append("publication[year]", year);
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
              abstract: "",
              authors: [""],
              cover: "",
              sequence_number: 0,
              source_url: "",
              source: "",
              title: "",
              year: "",
            }
          : publication
      }
      validationSchema={validation.publicationSchema}
      onSubmit={handleSubmit}
    >
      {(props) => {
        const isDisabled = props.isSubmitting || status === "pending";
        const submitBtnText = isNewItem
          ? "Create Publication"
          : "Update Publication";
        return (
          <Form>
            <div className="row">
              <div className="col-6 col-md-8">
                <CustomSelect
                  items={periodYears}
                  label="Publication Year"
                  name="year"
                />
              </div>
              <div className="col-6 col-md-4">
                <CustomInput
                  bsclass="mb-3"
                  label="Sequence Num"
                  name="sequence_number"
                  type="number"
                />
              </div>
            </div>
            <CustomTextArea
              bsclass="mb-3"
              label="Publication Title"
              name="title"
              rows="2"
              type="text"
              // autoFocus
            />
            <CustomInput
              bsclass="mb-3"
              label="Source"
              name="source"
              type="text"
            />
            <CustomInput
              bsclass="mb-3"
              label="Source URL"
              name="source_url"
              type="text"
            />
            <div className="col-md-6 mb-3">
              <label
                className="form-label px-3 text-secondary fw-bold"
                htmlFor="formFile"
              >
                Cover Image
              </label>
              <input
                className="form-control"
                id="formFile"
                type="file"
                onChange={(e) => {
                  props.setFieldValue("cover", e.target.files[0]);
                }}
              />
              {props.errors.cover && (
                <FormWarning>{props.errors.cover}</FormWarning>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label
                className="form-label px-3 text-secondary fw-bold"
                htmlFor="formFile"
              >
                Abstract Image
              </label>
              <input
                className="form-control"
                type="file"
                onChange={(e) => {
                  props.setFieldValue("abstract", e.target.files[0]);
                }}
              />
              {props.errors.abstract && (
                <FormWarning>{props.errors.abstract}</FormWarning>
              )}
            </div>
            <div>
              <FieldArray name="authors">
                {(fieldArrayProps) => {
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { authors } = values;
                  const authorsListClass =
                    authors.length > 1
                      ? "row row-cols-1 row-cols-md-2"
                      : "row row-cols-1";
                  return (
                    <>
                      {authors && authors.length > 0 ? (
                        <ul className={authorsListClass}>
                          {authors.map((author, index) => (
                            <li className="col mb-3" key={index}>
                              <div className="p-2 border border-2 rounded">
                                {authors.length > 1 && (
                                  <Badge index={index} text={"author"} />
                                )}
                                <CustomInput
                                  bsclass="mb-3"
                                  label="Author"
                                  name={`authors.${index}`}
                                  type="text"
                                />
                                <div className="text-end">
                                  <div className="btn-group" role="group">
                                    <button
                                      className="btn btn-sm btn-outline-primary"
                                      type="button"
                                      onClick={() => remove(index)} // remove a friend from the list
                                    >
                                      Remove Author
                                    </button>
                                    <button
                                      className="btn btn-sm btn-outline-primary"
                                      type="button"
                                      onClick={() => push("")}
                                    >
                                      Add Author
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
                            className="btn btn-sm btn-outline-primary"
                            type="button"
                            onClick={() => push("")}
                          >
                            Add Authors
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
                <BackBtn path={navTabs.publications.path(period_id)}>
                  Cancel
                </BackBtn>
                <SubmitBtn text={submitBtnText} disabled={isDisabled} />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PublicationForm;

import { FieldArray, Form, Formik } from "formik";
import FormWarning from "../FormComponents/FormWarning";

import { useDispatch } from "react-redux";
import { addNewsThunk, updateNewsThunk } from "../../redux/news/operationsNews";

import CustomInput from "../FormComponents/CustomInput";
import CustomTextArea from "../FormComponents/CustomTextArea";
import BackBtn from "../shared/BackBtn";
import Badge from "../shared/Badge";
import SubmitBtn from "../shared/SubmitBtn";

import { validation } from "../../assets/utils/validationSchema";

const NewsForm = ({ newsItem, status }) => {
  const dispatch = useDispatch();
  const isNewItem = !newsItem;

  const handleSubmit = async (values, actions) => {
    const { title, body, date, image, links } = values;

    const formData = new FormData();
    formData.append("news[title]", title.trim());
    formData.append("news[date]", date.trim());

    if (body) {
      formData.append("news[body]", body.trim());
    }

    if (links.length) {
      links.forEach((element) => {
        formData.append("news[links][]", element.trim());
      });
    }

    if (image) {
      formData.append("news[image]", image);
    }

    if (isNewItem) {
      dispatch(addNewsThunk(formData));
      actions.resetForm();
    } else {
      dispatch(updateNewsThunk({ id: newsItem.id, news: formData }));
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
              body: "",
              date: "",
              links: [],
              image: "",
            }
          : newsItem
      }
      validationSchema={validation.newsSchema}
      onSubmit={handleSubmit}
    >
      {(props) => {
        const isDisabled = props.isSubmitting || status === "pending";
        const submitBtnText = isNewItem ? "Create News" : "Update News";
        return (
          <Form>
            <CustomInput
              label="News Title"
              name="title"
              type="text"
              bsclass="mb-3"
              autoFocus
            />
            <CustomTextArea
              label="Description"
              name="body"
              type="text-area"
              rows="5"
            />
            <CustomInput label="Date" name="date" type="text" bsclass="mb-3" />
            <div className="col-md-6 mb-3">
              <label
                htmlFor="image"
                className="form-label px-3 text-secondary fw-bold"
              >
                Image
              </label>
              <input
                className="form-control"
                id="image"
                type="file"
                onChange={(e) => {
                  props.setFieldValue("image", e.target.files[0]);
                }}
              />
              {props.errors.image && (
                <FormWarning>{props.errors.image}</FormWarning>
              )}
            </div>
            <div>
              <FieldArray name="links">
                {(fieldArrayProps) => {
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { links } = values;
                  const linksListClass =
                    links.length > 1
                      ? "row row-cols-1 row-cols-md-2"
                      : "row row-cols-1";
                  return (
                    <>
                      {links && links.length > 0 ? (
                        <ul className={linksListClass}>
                          {links.map((link, index) => (
                            <li className="col mb-3" key={index}>
                              <div className="p-2 border border-2 rounded">
                                {links.length > 1 && (
                                  <Badge index={index} text={"link"} />
                                )}
                                <CustomInput
                                  type="text"
                                  label="Link"
                                  name={`links.${index}`}
                                  bsclass="mb-3"
                                />
                                <div className="text-end">
                                  <div className="btn-group" role="group">
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-outline-primary"
                                      onClick={() => remove(index)}
                                    >
                                      remove the link
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-outline-primary"
                                      onClick={() => push("")}
                                    >
                                      add a link
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
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => push("")}
                          >
                            Add a link
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
                <BackBtn path="/news">Cancel</BackBtn>
                <SubmitBtn text={submitBtnText} disabled={isDisabled} />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default NewsForm;

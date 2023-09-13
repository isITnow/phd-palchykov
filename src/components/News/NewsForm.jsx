import { FieldArray, Form, Formik } from "formik";

import { useDispatch } from "react-redux";
import { addNewsThunk, updateNewsThunk } from "../../redux/news/operationsNews";

import Badge from "../shared/Badge";
import BackBtn from "../shared/BackBtn";
import CustomInput from "../FormComponents/CustomInput";
import CustomTextArea from "../FormComponents/CustomTextArea";

import { validation } from "../../assets/utils/validationSchema";

const NewsForm = ({ newsItem }) => {
  const dispatch = useDispatch();
  const isNewItem = !newsItem;

  const handleSubmit = async (values, actions) => {
    const { title, body, date, image, links } = values;

    const formData = new FormData();
    formData.append("news[title]", title.trim());
    formData.append("news[body]", body.trim());
    formData.append("news[date]", date.trim());
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
      {(props) => (
        <Form>
          <CustomInput label="News title" name="title" type="text" autoFocus />
          <CustomTextArea
            label="Description"
            name="body"
            type="text-area"
            rows="5"
          />
          <CustomInput label="Date" name="date" type="text" />
          <input
            className="form-control mb-3"
            type="file"
            onChange={(e) => {
              props.setFieldValue("image", e.target.files[0]);
            }}
          />
          <div>
            <FieldArray name="links">
              {(fieldArrayProps) => {
                const { push, remove, insert, form } = fieldArrayProps;
                const { values } = form;
                const { links } = values;
                return (
                  <div>
                    {links && links.length > 0 ? (
                      links.map((link, index) => (
                        <div key={index}>
                          {links.length > 1 && (
                            <Badge index={index} text={"link"} />
                          )}
                          <CustomInput
                            type="text"
                            label="Link"
                            name={`links.${index}`}
                          />
                          <div className="text-end">
                            <div className="btn-group mb-3" role="group">
                              <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={() => remove(index)} // remove a friend from the list
                              >
                                remove link
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={() => insert(index, "")} // insert an empty string at a position
                              >
                                add a new link
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
                          Add a link
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
              <BackBtn path="/news">Cancel</BackBtn>
              <button
                disabled={props.isSubmitting}
                type="submit"
                className="btn btn-primary"
              >
                {isNewItem ? "Create news" : "Update news"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NewsForm;

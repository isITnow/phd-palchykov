import { FieldArray, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../assets/utils/useAlert";

import Alert from "../Alert";
import CustomInput from "../FormComponents/CustomInput";
import CustomTextArea from "../FormComponents/CustomTextArea";

import { newsAPI } from "../../services/newsAPI";
import { validation } from "../../assets/utils/validationSchema";

const NewsForm = ({ newsItem }) => {
  const isNewItem = !newsItem;
  const navigate = useNavigate();
  const { alert, showAlert } = useAlert();

  const handleSubmit = async (values, actions) => {
    const { title, body, date, image, links } = values;
    let message = "";

    const formData = new FormData();
    formData.append("news[title]", title);
    formData.append("news[body]", body);
    formData.append("news[date]", date);
    if (links.length) {
      links.forEach((element) => {
        formData.append("news[links][]", element);
      });
    }
    if (image) {
      formData.append("news[image]", image);
    }

    try {
      const response = isNewItem
        ? await newsAPI.postNews(formData)
        : await newsAPI.editNews(newsItem.id, formData);

      if (response.status === 201) {
        actions.resetForm();
        message = "News created successfully";
        showAlert(message, "success");
      } else if (response.status === 202) {
        message = "News updated successfully";
        showAlert(message, "success");
        return navigate("/news");
      } else {
        message = "Failed to save record. Contact your administrator!";
        showAlert(message, "danger");
      }
    } catch (error) {
      message = "Error occurred. Contact your administrator!";
      showAlert(message, "danger");

      console.log("Error occurred while saving the record:", error);
    }
  };

  return (
    <>
      {alert.visible && <Alert state={alert} />}
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
            <CustomInput label="News title" name="title" type="text" />
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
                            <CustomInput
                              type="text"
                              label="Link"
                              name={`links.${index}`}
                            />
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
                        ))
                      ) : (
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => push("")}
                        >
                          Add a link
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
              {isNewItem ? "Create news" : "Update news"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default NewsForm;

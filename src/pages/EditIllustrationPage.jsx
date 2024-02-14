import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateIllustrationThunk } from "../redux/illustrations/operationsIllustrations";
import { selectResearches } from "../redux/researches/selectorResearches";

import { Form, Formik } from "formik";

import { useAlert } from "../assets/customHooks/useAlert";
import Alert from "../components/shared/Alert";

import { Col } from "react-bootstrap";
import CustomInput from "../components/FormComponents/CustomInput";
import CustomTextArea from "../components/FormComponents/CustomTextArea";
import FormCard from "../components/FormComponents/FormCard";
import BackBtn from "../components/shared/BackBtn";
import NoItemToEdit from "../components/shared/NoItemToEdit";
import Section from "../components/shared/Section";
import SubmitBtn from "../components/shared/SubmitBtn";

import navTabs from "../assets/navTabs";
import { validation } from "../assets/utils/validationSchema";

const EditIllustrationPage = () => {
  const dispatch = useDispatch();
  const { research_id, id } = useParams();
  const { researches, status, error } = useSelector(selectResearches);
  const { alert, showAlert } = useAlert();

  const research = researches.find(
    (research) => research.id === parseInt(research_id)
  );

  const illustration = research?.illustrations.find(
    (illustration) => illustration.id === parseInt(id)
  );

  const handleSubmit = (values, actions) => {
    const { description, sequence_number, schema } = values;

    const illustrationFormData = new FormData();
    illustrationFormData.append(
      "illustration[description]",
      description.trim()
    );
    illustrationFormData.append(
      "illustration[sequence_number]",
      sequence_number
    );
    if (schema) {
      illustrationFormData.append("illustration[schema]", schema);
    }

    dispatch(
      updateIllustrationThunk({
        research_id,
        illustration_id: illustration.id,
        illustration: illustrationFormData,
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
      showAlert("Illustration updated", "success");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (!research || !illustration) {
    return (
      <NoItemToEdit backPath={navTabs.researches.path} item="Illustration" />
    );
  }

  return (
    <Section>
      <Col lg="8" className="mx-auto">
        <Alert state={alert} />
        <FormCard
          title="Edit Illustration"
          body={
            <Formik
              initialValues={{
                description: illustration.description,
                schema: "",
                sequence_number: illustration.sequence_number,
              }}
              validationSchema={validation.editIllustrationSchema}
              onSubmit={handleSubmit}
            >
              {(props) => {
                const isDisabled = props.isSubmitting || status === "pending";
                const submitBtnText = "Update Illustration";
                return (
                  <Form>
                    <CustomInput
                      label="Sequence Num"
                      type="number"
                      name="sequence_number"
                      bsclass="mb-3"
                    />
                    <CustomTextArea
                      label="Description"
                      type="text-area"
                      rows="5"
                      name="description"
                    />
                    <label
                      htmlFor="formFile"
                      className="form-label px-3 text-secondary fw-bold"
                    >
                      Illustration Image
                    </label>
                    <input
                      className="form-control mb-3"
                      id="formFile"
                      type="file"
                      onChange={(e) => {
                        props.setFieldValue("schema", e.target.files[0]);
                      }}
                    />
                    <div className="text-end mt-3">
                      <div className="btn-group">
                        <BackBtn path={navTabs.researches.path}>Cancel</BackBtn>
                        <SubmitBtn text={submitBtnText} disabled={isDisabled} />
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          }
        />
      </Col>
    </Section>
  );
};

export default EditIllustrationPage;

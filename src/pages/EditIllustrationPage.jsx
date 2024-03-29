import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateIllustrationThunk } from "../redux/illustrations/operationsIllustrations";
import { selectResearches } from "../redux/researches/selectorResearches";

import { Form, Formik } from "formik";
import {
  ButtonGroup,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";

import CustomInput from "../components/FormComponents/CustomInput";
import CustomTextArea from "../components/FormComponents/CustomTextArea";
import FormCard from "../components/FormComponents/FormCard";
import BackBtn from "../components/shared/BackBtn";
import NoItemToEdit from "../components/shared/NoItemToEdit";
import SubmitBtn from "../components/shared/SubmitBtn";

import navTabs from "../assets/navTabs";
import { validation } from "../assets/utils/validationSchema";

const EditIllustrationPage = () => {
  const dispatch = useDispatch();
  const { research_id, id } = useParams();
  const { researches, status } = useSelector(selectResearches);

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
        illustration_id: illustration.id,
        illustration: illustrationFormData,
        research_id,
      })
    );

    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });

    actions.setSubmitting(false);
  };

  if (!research || !illustration) {
    return (
      <NoItemToEdit backPath={navTabs.researches.path} item="Illustration" />
    );
  }

  return (
    <Col lg="8" className="mx-auto">
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
                  <Col lg="3">
                    <CustomInput
                      bsclass="mb-3"
                      label="Sequence Num"
                      name="sequence_number"
                      required
                      type="number"
                    />
                  </Col>
                  <CustomTextArea
                    label="Description"
                    name="description"
                    required
                    rows="5"
                    type="text-area"
                  />
                  <FormGroup controlId="illustrationImage">
                    <FormLabel className="px-3 text-secondary fw-bold">
                      Illustration Image
                    </FormLabel>
                    <FormControl
                      className="mb-3"
                      type="file"
                      onChange={(e) => {
                        props.setFieldValue("schema", e.target.files[0]);
                      }}
                    />
                  </FormGroup>
                  <div className="d-flex flex-row-reverse mt-3">
                    <ButtonGroup>
                      <BackBtn path={navTabs.researches.path}>Cancel</BackBtn>
                      <SubmitBtn text={submitBtnText} disabled={isDisabled} />
                    </ButtonGroup>
                  </div>
                </Form>
              );
            }}
          </Formik>
        }
      />
    </Col>
  );
};

export default EditIllustrationPage;

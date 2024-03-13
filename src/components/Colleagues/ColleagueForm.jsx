import { Form, Formik } from "formik";
import {
  ButtonGroup,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  addColleagueThunk,
  updateColleagueThunk,
} from "../../redux/colleagues/operationsColleagues";

import CustomInput from "../FormComponents/CustomInput";
import FormWarning from "../FormComponents/FormWarning";
import BackBtn from "../shared/BackBtn";
import RequiredBadge from "../shared/RequiredBadge";
import SubmitBtn from "../shared/SubmitBtn";

import navTabs from "../../assets/navTabs";
import { validation } from "../../assets/utils/validationSchema";

const ColleagueForm = ({ colleague, status }) => {
  const dispatch = useDispatch();

  const isNewItem = !colleague;

  const handleSubmit = async (values, actions) => {
    const { name, position, phone, email, photo } = values;

    const formData = new FormData();
    formData.append("colleague[name]", name.trim());
    formData.append("colleague[position]", position.trim());

    if (phone) {
      formData.append("colleague[phone]", phone.trim());
    }

    if (email) {
      formData.append("colleague[email]", email.trim().toLowerCase());
    }

    if (photo) {
      formData.append("colleague[photo]", photo);
    }

    if (isNewItem) {
      dispatch(addColleagueThunk(formData));
      actions.resetForm();
    } else {
      dispatch(updateColleagueThunk({ id: colleague.id, colleague: formData }));
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
              email: "",
              name: "",
              phone: "",
              photo: "",
              position: "",
            }
          : colleague
      }
      validationSchema={validation.colleagueSchema}
      onSubmit={handleSubmit}
    >
      {(props) => {
        const isDisabled = props.isSubmitting || status === "pending";
        const submitBtnText = isNewItem
          ? "Create Colleague"
          : "Update Colleague";
        return (
          <Form>
            <CustomInput
              bsclass="mb-3"
              label="Name"
              name="name"
              required
              type="text"
            />
            <CustomInput
              bsclass="mb-3"
              label="Position"
              name="position"
              required
              type="text"
            />
            <CustomInput
              bsclass="mb-3"
              label="Email"
              name="email"
              required
              type="email"
            />
            <CustomInput
              bsclass="mb-3"
              label="Phone"
              name="phone"
              placeholder="+380775554433"
              type="tel"
            />
            <Col md="6" className="mb-3">
              <FormGroup controlId="photo">
                <FormLabel className="px-3 text-secondary fw-bold">
                  Photo
                  {isNewItem && <RequiredBadge />}
                </FormLabel>
                <FormControl
                  type="file"
                  onChange={(e) => {
                    props.setFieldValue("photo", e.target.files[0]);
                  }}
                />
                {props.errors.photo && (
                  <FormWarning>{props.errors.photo}</FormWarning>
                )}
              </FormGroup>
            </Col>
            <div className="d-flex flex-row-reverse mt-3">
              <ButtonGroup>
                <BackBtn path={navTabs.colleagues.path}>Cancel</BackBtn>
                <SubmitBtn text={submitBtnText} disabled={isDisabled} />
              </ButtonGroup>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ColleagueForm;

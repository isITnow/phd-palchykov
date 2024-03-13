import { useField } from "formik";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";

import RequiredBadge from "../shared/RequiredBadge";
import FormWarning from "./FormWarning";

const CustomInput = ({ label, required, ...props }) => {
  const [field, meta] = useField(props.name);

  return (
    <FormGroup className={props.bsclass} controlId={label}>
      <FormLabel className="px-3 text-secondary fw-bold">
        {label}
        {required && <RequiredBadge />}
      </FormLabel>
      <FormControl {...field} {...props} />
      {meta.touched && meta.error && <FormWarning>{meta.error}</FormWarning>}
    </FormGroup>
  );
};

export default CustomInput;

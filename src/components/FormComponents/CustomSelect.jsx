import { useField } from "formik";
import { FormGroup, FormLabel, FormSelect } from "react-bootstrap";

import RequiredBadge from "../shared/RequiredBadge";
import FormWarning from "./FormWarning";

const CustomSelect = ({ label, items, required, ...props }) => {
  const [field, meta] = useField(props.name);

  return (
    <FormGroup className="mb-3" controlId={label}>
      <FormLabel className="px-3 text-secondary fw-bold">
        {label}
        {required && <RequiredBadge />}
      </FormLabel>
      <FormSelect {...field} {...props}>
        <option defaultValue={"Select"}>Select a value</option>
        {items.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </FormSelect>
      {meta.touched && meta.error && <FormWarning>{meta.error}</FormWarning>}
    </FormGroup>
  );
};

export default CustomSelect;

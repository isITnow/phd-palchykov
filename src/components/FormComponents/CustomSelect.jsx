import { useField } from "formik";
import FormWarning from "./FormWarning";
import RequiredBadge from "../shared/RequiredBadge";

const CustomSelect = ({ label, items, required, ...props }) => {
  const [field, meta] = useField(props.name);
  return (
    <div className="mb-3">
      <label className="form-label px-3 text-secondary fw-bold">
        {label}
        {required && <RequiredBadge />}
      </label>
      <select {...field} {...props} className="form-select">
        <option defaultValue={"Select"}>Select a value</option>
        {items.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      {meta.touched && meta.error && <FormWarning>{meta.error}</FormWarning>}
    </div>
  );
};

export default CustomSelect;

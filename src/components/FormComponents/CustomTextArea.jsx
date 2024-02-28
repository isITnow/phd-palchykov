import { useField } from "formik";
import RequiredBadge from "../shared/RequiredBadge";
import FormWarning from "./FormWarning";

const CustomTextArea = ({ label, required, ...props }) => {
  const [field, meta] = useField(props.name);
  return (
    <div className="mb-3">
      <label className="form-label px-3 text-secondary fw-bold">
        {label}
        {required && <RequiredBadge />}
      </label>
      <textarea {...field} {...props} className="form-control" />
      {meta.touched && meta.error && <FormWarning>{meta.error}</FormWarning>}
    </div>
  );
};

export default CustomTextArea;

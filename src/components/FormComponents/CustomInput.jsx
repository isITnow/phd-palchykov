import { useField } from "formik";
import FormWarning from "./FormWarning";

const CustomInput = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);
  return (
    <div className={props.bsclass}>
      <label className="form-label px-3 text-secondary fw-bold">{label}</label>
      <input {...field} {...props} className="form-control" />
      {meta.touched && meta.error && <FormWarning>{meta.error}</FormWarning>}
    </div>
  );
};

export default CustomInput;

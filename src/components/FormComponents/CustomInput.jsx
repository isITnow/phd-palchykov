import { useField } from "formik";

const CustomInput = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);
  return (
    <div className="mb-3">
      <label className="form-label px-3 text-secondary fw-bold">{label}</label>
      <input {...field} {...props} className="form-control" />
      {meta.touched && meta.error && (
        <div className="form-text text-danger px-3">{meta.error}</div>
      )}
    </div>
  );
};

export default CustomInput;

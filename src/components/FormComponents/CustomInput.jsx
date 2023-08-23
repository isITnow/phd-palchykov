import { useField } from "formik";

const CustomInput = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input {...field} {...props} className="form-control" />
      {meta.touched && meta.error && (
        <div className="form-text text-danger">{meta.error}</div>
      )}
    </div>
  );
};

export default CustomInput;

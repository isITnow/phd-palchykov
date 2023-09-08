import { useField } from "formik";

const CustomTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);
  return (
    <div className="mb-3">
      <label className="form-label px-3 text-secondary fw-bold">{label}</label>
      <textarea {...field} {...props} className="form-control" />
      {meta.touched && meta.error && (
        <div className="form-text text-danger">{meta.error}</div>
      )}
    </div>
  );
};

export default CustomTextArea;

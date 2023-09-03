import { useField } from "formik";

const CustomSelect = ({ label, years, ...props }) => {
  const [field, meta] = useField(props.name);
  return (
    <div className="w-25 mb-3">
      <label className="form-label">{label}</label>
      <select {...field} {...props} className="form-select">
        <option defaultValue={"Select"}>Select an year</option>
        {years.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>
      {meta.touched && meta.error && (
        <div className="form-text text-danger">{meta.error}</div>
      )}
    </div>
  );
};

export default CustomSelect;

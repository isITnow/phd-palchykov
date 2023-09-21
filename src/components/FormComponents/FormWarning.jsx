const FormWarning = ({ children }) => {
  return (
    <div className="form-text alert px-3 py-1 bg-warning bg-gradient">
      <span className="text-danger fw-bold">{children}</span>
    </div>
  );
};

export default FormWarning;

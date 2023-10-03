const FormWarning = ({ children }) => {
  return (
    <div className="form-text alert px-3 py-1 bg-danger bg-gradient">
      <span className="text-light fw-bold">{children}</span>
    </div>
  );
};

export default FormWarning;

const Alert = ({ state }) => {
  const { text, type } = state;
  return (
    <div className={`alert alert-${type}`} role="alert">
      {text}
    </div>
  );
};

export default Alert;

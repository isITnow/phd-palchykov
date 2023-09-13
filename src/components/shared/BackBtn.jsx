import { useNavigate } from "react-router-dom";

const BackBtn = ({ path, children }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="btn btn-outline-secondary"
      onClick={() => navigate(path)}
    >
      {children}
    </button>
  );
};

export default BackBtn;

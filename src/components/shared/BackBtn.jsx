import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BackBtn = ({ path, children }) => {
  const navigate = useNavigate();

  return (
    <Button
      type="button"
      variant="outline-secondary"
      onClick={() => navigate(path)}
    >
      {children}
    </Button>
  );
};

export default BackBtn;

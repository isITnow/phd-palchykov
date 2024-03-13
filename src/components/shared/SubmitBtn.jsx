import { Button } from "react-bootstrap";
import SpinnerThreeDots from "./SpinnerThreeDots";

const SubmitBtn = ({ text, disabled }) => {
  return (
    <Button disabled={disabled} type="submit" variant="primary">
      {disabled ? <SpinnerThreeDots /> : text}
    </Button>
  );
};

export default SubmitBtn;

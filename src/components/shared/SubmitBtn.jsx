import SpinnerThreeDots from "./SpinnerThreeDots";

const SubmitBtn = ({ text, disabled }) => {
  return (
    <button disabled={disabled} type="submit" className="btn btn-primary">
      {disabled ? <SpinnerThreeDots /> : text}
    </button>
  );
};

export default SubmitBtn;

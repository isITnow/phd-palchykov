import { FallingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <FallingLines
        color="#0275d8"
        width="9rem"
        visible={true}
        ariaLabel="falling-lines-loading"
      />
    </div>
  );
};

export default Loader;

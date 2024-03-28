import { TailSpin } from "react-loader-spinner";

const ImageLoadingSpinner = () => {
  return (
    <TailSpin
      visible={true}
      // height="80"
      width="9rem"
      color="#6c757d"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default ImageLoadingSpinner;

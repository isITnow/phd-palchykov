import { useEffect, useState } from "react";

import { FallingLines } from "react-loader-spinner";

const Loader = () => {
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

  useEffect(() => {
    let timer;

    timer = setTimeout(() => {
      setIsWaitingForResponse(true);
    }, 15000);

    return () => {
      clearTimeout(timer);
      setIsWaitingForResponse(false);
    };
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <FallingLines
        color="#0275d8"
        width="9rem"
        visible={true}
        ariaLabel="falling-lines-loading"
      />
      {isWaitingForResponse && (
        <h3 className="text-center text-muted">
          Waiting for server response. Thank you for your patience.
        </h3>
      )}
    </div>
  );
};

export default Loader;

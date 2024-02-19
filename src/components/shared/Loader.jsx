import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FallingLines } from "react-loader-spinner";

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

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
        <AnimatePresence>
          <motion.h3
            key="child"
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="text-center text-muted"
          >
            Waiting for server response. Thank you for your patience.
          </motion.h3>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Loader;

import { AnimatePresence, motion } from "framer-motion";
import motionOptions from "../../assets/motionOptions";

const Alert = ({ state }) => {
  const { text, type, isVisible } = state;
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.p
          key="child"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={motionOptions.fadeInOut}
          className={`text-center text-light fw-bold alert bg-gradient bg-${type}`}
          role="alert"
        >
          {text}
        </motion.p>
      )}
    </AnimatePresence>
  );
};

export default Alert;

import { motion, AnimatePresence } from "framer-motion";

const fadeInOut = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

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
          variants={fadeInOut}
          className={`text-center fw-bold alert alert-${type}`}
          role="alert"
        >
          {text}
        </motion.p>
      )}
    </AnimatePresence>
  );
};

export default Alert;

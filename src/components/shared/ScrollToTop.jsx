import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa";

import motionOptions from "../../assets/motionOptions";

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {showTopBtn && (
        <motion.button
          animate="animate"
          exit="exit"
          initial="initial"
          key="child"
          type="button"
          variants={motionOptions.fadeInOut}
          style={{
            bottom: "45px",
            left: "20px",
            zIndex: "10",
          }}
          className="bg-dark 
                      bg-gradient 
                      border
                      border-2
                      btn 
                      d-flex 
                      justify-content-center 
                      p-3
                      rounded-circle
                      position-fixed"
          onClick={goToTop}
        >
          <FaAngleUp className="text-light" size="18" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
export default ScrollToTop;

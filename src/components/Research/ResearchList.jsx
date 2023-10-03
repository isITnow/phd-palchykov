import { motion } from "framer-motion";
import Research from "./Research";

import s from "./research.module.css";

const listItem = {
  initial: { opacity: 0, y: -15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay: 0.4 },
  exit: { opacity: 0, y: -15 },
};

const ResearchList = ({ researches }) => {
  let researchList = null;
  if (researches.length) {
    researchList = researches.map((item) => {
      return { ...item, ...JSON.parse(item.payload) };
    });
  }

  const handleClickScroll = (index) => {
    const element = document.getElementById(index);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (researchList) {
    return (
      <>
        <ul>
          {researchList.map(({ id, title }, index) => (
            <li
              className={`text-secondary ${s.hoverEffect}`}
              key={id}
              onClick={() => handleClickScroll(index + 1)}
            >{`# ${title}`}</li>
          ))}
        </ul>
        <ul>
          {researchList.map((research, index) => (
            <motion.li
              className="mb-5 border-2 border-bottom border-secondary pb-3"
              key={research.id}
              initial="initial"
              animate="animate"
              transition="transition"
              exit="exit"
              variants={listItem}
            >
              <Research research={research} index={index + 1} />
            </motion.li>
          ))}
        </ul>
      </>
    );
  }
};

export default ResearchList;

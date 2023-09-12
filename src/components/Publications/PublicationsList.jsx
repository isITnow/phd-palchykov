import { motion } from "framer-motion";
import Publication from "./Publication";

const listItem = {
  initial: { opacity: 0, y: -15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
  exit: { opacity: 0, y: -15 },
};

const PublicationsList = ({ publications }) => {
  return (
    <ul className="row row-cols-1 row-cols-md-2 g-2 mb-0">
      {publications.map((publication) => (
        <motion.li
          className="col"
          key={publication.id}
          initial="initial"
          animate="animate"
          transition="transition"
          exit="exit"
          variants={listItem}
        >
          <Publication publication={publication} />
        </motion.li>
      ))}
    </ul>
  );
};

export default PublicationsList;

import { motion } from "framer-motion";
import listItemMotionOptions from "../../assets/utils/motionOptions";
import Publication from "./Publication";

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
          variants={listItemMotionOptions}
        >
          <Publication publication={publication} />
        </motion.li>
      ))}
    </ul>
  );
};

export default PublicationsList;

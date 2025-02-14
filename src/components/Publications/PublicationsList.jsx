import { motion } from 'framer-motion';

import motionOptions from '@/utils/motionOptions';
import Publication from '@/components/Publications/Publication';

const PublicationsList = ({ publications }) => (
  <ul className="row row-cols-1 row-cols-md-2 g-2 mb-0">
    {publications.map((publication) => (
      <motion.li
        className="col"
        key={publication.id}
        initial="initial"
        animate="animate"
        transition="transition"
        exit="exit"
        variants={motionOptions.listItemMotion}
      >
        <Publication publication={publication} />
      </motion.li>
    ))}
  </ul>
);

export default PublicationsList;

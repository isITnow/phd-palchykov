import { motion, AnimatePresence } from "framer-motion";
import Comment from "./Comment";

const listItem = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const CommentsList = ({ comments }) => {
  return (
    <ul className="list-group mt-3">
      <AnimatePresence>
        {comments.map((comment) => {
          return (
            <motion.li
              className="list-group-item"
              key={comment.id}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={listItem}
            >
              <Comment comment={comment} />
            </motion.li>
          );
        })}
      </AnimatePresence>
    </ul>
  );
};

export default CommentsList;

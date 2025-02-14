import Post from '@/components/Posts/Post';
import { motion, AnimatePresence } from 'framer-motion';

const listItem = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const PostsList = ({ posts }) => (
  <ul>
    <AnimatePresence>
      {posts?.map((post) => (
        <motion.li
          className="mb-3"
          key={post.id}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={listItem}
        >
          <Post post={post} />
        </motion.li>
      ))}
    </AnimatePresence>
  </ul>
);

export default PostsList;

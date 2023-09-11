import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  getOnePostThunk,
  removePostThunk,
  updatePostThunk,
} from "../redux/posts/operationsPosts";
import { selectPosts } from "../redux/posts/selectorPosts";

import Loader from "../components/shared/Loader";
import Post from "../components/Posts/Post";
import PostForm from "../components/Posts/PostForm";
import Section from "../components/shared/Section";

const fadeInOut = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const PostPage = () => {
  const { id } = useParams();
  const [showForm, setShowForm] = useState(true);
  const dispatch = useDispatch();
  const { posts, status } = useSelector(selectPosts);
  console.log("posts: ", posts);

  useEffect(() => {
    dispatch(getOnePostThunk(id));
  }, [dispatch, id]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <Section>
      {posts.length && <Post post={posts[0]} single />}
      <div className="my-3 text-end">
        <div className="btn-group">
          {true && (
            <div
              className="btn btn-primary"
              onClick={() => setShowForm((prevState) => !prevState)}
            >
              edit
            </div>
          )}
          <div className="btn btn-danger">delete</div>
        </div>
      </div>
      <AnimatePresence>
        {showForm && (
          <motion.div
            key="child"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeInOut}
            role="alert"
          >
            <PostForm post={posts[0]} />
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
};

export default PostPage;

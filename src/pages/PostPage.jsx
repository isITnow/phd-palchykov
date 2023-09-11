import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  getOnePostThunk,
  removePostThunk,
} from "../redux/posts/operationsPosts";
import {
  selectComments,
  selectError,
  selectOnePost,
  selectStatus,
} from "../redux/posts/selectorPosts";

import Alert from "../components/shared/Alert";
import { useAlert } from "../assets/utils/useAlert";

import Loader from "../components/shared/Loader";
import Post from "../components/Posts/Post";
import PostForm from "../components/Posts/PostForm";
import Section from "../components/shared/Section";

import setPageTitle from "../assets/utils/setPageTitle";
import useSignInStatus from "../assets/utils/useSignInStatus";
import CommentsList from "../components/Comments/CommentsList";
import CommentForm from "../components/Comments/CommentForm";

const fadeInOut = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const PostPage = () => {
  setPageTitle("Post");

  const { id } = useParams();
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector(selectError);
  const comments = useSelector(selectComments);
  const post = useSelector(selectOnePost);
  const status = useSelector(selectStatus);

  const { alert, showAlert } = useAlert();
  const isLoggedIn = useSignInStatus();

  useEffect(() => {
    dispatch(getOnePostThunk(id));
  }, [dispatch, id]);

  useEffect(() => {
    switch (status) {
      case "rejected":
        showAlert(`${error}. Please contact your administrator!`, "danger");
        break;

      case "fulfilled":
        showAlert("Post updated successfully", "success");
        setShowForm(false);
        break;

      case "removed":
        setShowForm(false);
        navigate("/posts");
        break;

      case "comment added":
        showAlert("Comment published successfully", "success");
        break;

      case "comment removed":
        setShowForm(false);
        showAlert("Comment deleted", "success");
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleDelete = () => {
    window.alert("Are you sure you want to delete post?");
    dispatch(removePostThunk(id));
  };

  const handleGoBack = () => {
    navigate("/posts");
  };

  if (!post) {
    return <Loader />;
  }

  return (
    <Section>
      <Alert state={alert} />
      {post && <Post post={post} single />}
      {/* BUTTONS */}
      <div className="mt-3 text-end">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={handleGoBack}
        >
          go back
        </button>
        {isLoggedIn && (
          <div className="btn-group ms-3">
            {showForm ? (
              <AnimatePresence>
                <motion.button
                  type="button"
                  key="child"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={fadeInOut}
                  className="btn btn-outline-secondary"
                  onClick={() => setShowForm(false)}
                >
                  cancel update
                </motion.button>
              </AnimatePresence>
            ) : (
              <AnimatePresence>
                <motion.button
                  type="button"
                  key="child"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={fadeInOut}
                  className="btn btn-primary"
                  onClick={() => setShowForm(true)}
                >
                  edit
                </motion.button>
              </AnimatePresence>
            )}
            <div className="btn btn-danger" onClick={handleDelete}>
              delete
            </div>
          </div>
        )}
      </div>
      {/* POST FORM */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            key="child"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeInOut}
            className="mt-3"
          >
            <PostForm post={post} />
          </motion.div>
        )}
      </AnimatePresence>
      {/* COMMENT FORM */}
      <CommentForm />
      {/* COMMENTS LIST */}
      {comments.length > 0 && <CommentsList comments={comments} />}
    </Section>
  );
};

export default PostPage;

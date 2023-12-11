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
import { useAlert } from "../assets/customHooks/useAlert";

import BackBtn from "../components/shared/BackBtn";
import CommentsList from "../components/Comments/CommentsList";
import CommentsListTitle from "../components/Comments/CommentsListTitle";
import CommentForm from "../components/Comments/CommentForm";
import Loader from "../components/shared/Loader";
import Post from "../components/Posts/Post";
import PostForm from "../components/Posts/PostForm";
import Section from "../components/shared/Section";

import useSignInStatus from "../assets/customHooks/useSignInStatus";

const fadeInOut = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const PostPage = () => {
  const { id } = useParams();
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector(selectError);
  const comments = useSelector(selectComments);
  const anyComments = !!comments?.length;
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
        showAlert(error, "danger");
        break;

      case "fulfilled":
        showAlert("Post updated", "success");
        setShowForm(false);
        break;

      case "removed":
        setShowForm(false);
        navigate("/posts");
        break;

      case "comment added":
        showAlert("Comment published", "success");
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
    // window.alert("Are you sure you want to delete post?");
    dispatch(removePostThunk(id));
  };

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <Section>
      <Alert state={alert} />
      {post && (
        <>
          <Post post={post} single />
          {/* BUTTONS */}
          <div className="mt-3 text-end">
            <BackBtn path="/posts">Go back</BackBtn>
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
                <PostForm post={post} status={status} />
              </motion.div>
            )}
          </AnimatePresence>
          {/* COMMENTS */}
          <CommentForm />
          <div className="mt-3">
            <div className="mb-3">
              <CommentsListTitle
                text={anyComments ? "Comments" : "No comments"}
              />
            </div>
            {anyComments && <CommentsList comments={comments} />}
          </div>
        </>
      )}
    </Section>
  );
};

export default PostPage;

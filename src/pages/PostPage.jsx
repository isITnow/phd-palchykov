import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

import { useAlert } from "../assets/customHooks/useAlert";
import Alert from "../components/shared/Alert";

import CommentForm from "../components/Comments/CommentForm";
import CommentsList from "../components/Comments/CommentsList";
import CommentsListTitle from "../components/Comments/CommentsListTitle";
import Post from "../components/Posts/Post";
import PostForm from "../components/Posts/PostForm";
import BackBtn from "../components/shared/BackBtn";
import IsLoggedIn from "../components/shared/IsLoggedIn";
import Loader from "../components/shared/Loader";
import Section from "../components/shared/Section";

import navTabs from "../assets/navTabs";

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
        navigate(navTabs.posts.path);
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
            <BackBtn path={navTabs.posts.path}>Go Back</BackBtn>
            <IsLoggedIn>
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
                      Cancel Update
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
                      Edit
                    </motion.button>
                  </AnimatePresence>
                )}
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </IsLoggedIn>
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
                text={anyComments ? "Comments" : "No Comments"}
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

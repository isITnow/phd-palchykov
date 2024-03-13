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

import { AnimatePresence, motion } from "framer-motion";

import { Col } from "react-bootstrap";
import CommentForm from "../components/Comments/CommentForm";
import CommentsList from "../components/Comments/CommentsList";
import CommentsListTitle from "../components/Comments/CommentsListTitle";
import Post from "../components/Posts/Post";
import PostForm from "../components/Posts/PostForm";
import BackBtn from "../components/shared/BackBtn";
import IsLoggedIn from "../components/shared/IsLoggedIn";
import Loader from "../components/shared/Loader";

import motionOptions from "../assets/motionOptions";
import navTabs from "../assets/navTabs";
import confirmationDialog from "../assets/utils/confirmationDialog";

const PostPage = () => {
  const [showForm, setShowForm] = useState(false);
  const { id } = useParams();
  const comments = useSelector(selectComments);
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const navigate = useNavigate();
  const post = useSelector(selectOnePost);
  const status = useSelector(selectStatus);

  const anyComments = !!comments?.length;

  useEffect(() => {
    dispatch(getOnePostThunk(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (status === "deleted") {
    }
    switch (status) {
      case "updated":
        setShowForm(false);
        break;

      case "deleted":
        setShowForm(false);
        navigate(navTabs.posts.path);
        break;

      case "comment deleted":
        setShowForm(false);
        break;
      default:
        break;
    }
  }, [error, navigate, status]);

  const handleDelete = () => {
    confirmationDialog(
      () => dispatch(removePostThunk(id)),
      "Are you sure you want to delete?"
    );
  };

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <Col lg="8" className="mx-auto">
      {post && (
        <>
          <Post post={post} single />
          {/* BUTTONS */}
          <div className="d-flex flex-row-reverse mt-3">
            <IsLoggedIn>
              <div className="btn-group ms-3">
                {showForm ? (
                  <AnimatePresence>
                    <motion.button
                      animate="animate"
                      className="btn btn-outline-secondary"
                      exit="exit"
                      initial="initial"
                      key="child"
                      type="button"
                      variants={motionOptions.fadeInOut}
                      onClick={() => setShowForm(false)}
                    >
                      Cancel Update
                    </motion.button>
                  </AnimatePresence>
                ) : (
                  <AnimatePresence>
                    <motion.button
                      animate="animate"
                      className="btn btn-primary"
                      exit="exit"
                      initial="initial"
                      key="child"
                      type="button"
                      variants={motionOptions.fadeInOut}
                      onClick={() => setShowForm(true)}
                    >
                      Edit
                    </motion.button>
                  </AnimatePresence>
                )}
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </IsLoggedIn>
            <BackBtn path={navTabs.posts.path}>Go Back</BackBtn>
          </div>
          {/* POST FORM */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                animate="animate"
                className="mt-3"
                exit="exit"
                initial="initial"
                key="child"
                variants={motionOptions.fadeInOut}
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
    </Col>
  );
};

export default PostPage;

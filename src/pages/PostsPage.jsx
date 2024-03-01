import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getPostsThunk } from "../redux/posts/operationsPosts";
import {
  selectError,
  selectPostsList,
  selectStatus,
} from "../redux/posts/selectorPosts";

import { useAlert } from "../assets/customHooks/useAlert";
import Alert from "../components/shared/Alert";

import { Col } from "react-bootstrap";
import PostForm from "../components/Posts/PostForm";
import PostsList from "../components/Posts/PostsList";
import Loader from "../components/shared/Loader";

import useSignInStatus from "../assets/customHooks/useSignInStatus";

const PostsPage = () => {
  const dispatch = useDispatch(getPostsThunk());
  const posts = useSelector(selectPostsList);
  const error = useSelector(selectError);
  const status = useSelector(selectStatus);
  const { alert, showAlert } = useAlert();
  const isLoggedIn = useSignInStatus();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getPostsThunk(signal));

    return () => {
      // Abort the request when the component unmounts or when a dependency changes
      controller.abort();
    };
  }, [dispatch]);

  useEffect(() => {
    switch (status) {
      case "rejected":
        showAlert(`${error}. Please contact your administrator!`, "danger");
        break;

      case "fulfilled":
        showAlert("Post created", "success");
        break;

      case "removed":
        showAlert("Post deleted", "success");
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <Col lg="8" className="mx-auto">
      <Alert state={alert} />
      {isLoggedIn ? (
        <div className="mb-4">
          <PostForm />
        </div>
      ) : (
        <div className="mb-4">
          <h3 className="text-center text-primary fw-bold">
            Welcome to my personal Blog
          </h3>
          <h4 className="text-center text-secondary fw-bold">
            Feel free to leave your comments
          </h4>
        </div>
      )}
      <PostsList posts={posts} />
    </Col>
  );
};

export default PostsPage;

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getPostsThunk } from "../redux/posts/operationsPosts";
import {
  selectPostsList,
  selectError,
  selectStatus,
} from "../redux/posts/selectorPosts";

import Alert from "../components/shared/Alert";
import { useAlert } from "../assets/customHooks/useAlert";

import Loader from "../components/shared/Loader";
import PostsList from "../components/Posts/PostsList";
import PostForm from "../components/Posts/PostForm";
import Section from "../components/shared/Section";

import useSignInStatus from "../assets/customHooks/useSignInStatus";

const PostsPage = () => {
  const dispatch = useDispatch(getPostsThunk());
  const posts = useSelector(selectPostsList);
  const error = useSelector(selectError);
  const status = useSelector(selectStatus);
  const { alert, showAlert } = useAlert();
  const isLoggedIn = useSignInStatus();

  useEffect(() => {
    dispatch(getPostsThunk());
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
    <Section>
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
    </Section>
  );
};

export default PostsPage;

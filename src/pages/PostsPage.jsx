import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsThunk } from "../redux/posts/operationsPosts";
import { selectPostsList, selectStatus } from "../redux/posts/selectorPosts";

import useSignInStatus from "../assets/customHooks/useSignInStatus";

import { Col } from "react-bootstrap";
import PostForm from "../components/Posts/PostForm";
import PostsList from "../components/Posts/PostsList";
import Loader from "../components/shared/Loader";

const PostsPage = () => {
  const dispatch = useDispatch(getPostsThunk());
  const isLoggedIn = useSignInStatus();
  const posts = useSelector(selectPostsList);
  const status = useSelector(selectStatus);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getPostsThunk(signal));

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <Col lg="8" className="mx-auto">
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

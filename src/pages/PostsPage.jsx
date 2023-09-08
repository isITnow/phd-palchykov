import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getPostsThunk } from "../redux/posts/operationsPosts";
import { selectPosts } from "../redux/posts/selectorPosts";

import Alert from "../components/shared/Alert";
import { useAlert } from "../assets/utils/useAlert";

import Loader from "../components/shared/Loader";
import PostsList from "../components/Posts/PostsList";
import PostForm from "../components/Posts/PostForm";
import Section from "../components/shared/Section";

import setPageTitle from "../assets/utils/setPageTitle";
import useSignInStatus from "../assets/utils/useSignInStatus";

const PostsPage = () => {
  setPageTitle("Blog");
  const dispatch = useDispatch(getPostsThunk());
  const { posts, status, error } = useSelector(selectPosts);
  const { alert, showAlert } = useAlert();
  const isLoggedIn = useSignInStatus();

  useEffect(() => {
    dispatch(getPostsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (status === "rejected") {
      showAlert(`${error}. Please contact your administrator!`, "danger");
      return;
    }
    if (status === "fulfilled") {
      showAlert("Post created successfully", "success");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <Section>
      <Alert state={alert} />
      {isLoggedIn && (
        <div className="mb-4">
          <PostForm />
        </div>
      )}
      <PostsList posts={posts} />
    </Section>
  );
};

export default PostsPage;

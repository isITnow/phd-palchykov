import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getPostsThunk } from "../redux/posts/operationsPosts";
import { selectPosts } from "../redux/posts/selectorPosts";

import Alert from "../components/shared/Alert";
import { useAlert } from "../assets/utils/useAlert";

import Loader from "../components/shared/Loader";

import setPageTitle from "../assets/utils/setPageTitle";
import useSignInStatus from "../assets/utils/useSignInStatus";
import PostsList from "../components/Posts/PostsList";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <section className="py-4">
      {alert.visible && <Alert state={alert} />}
      {isLoggedIn && (
        <div className="mb-3 text-end">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => console.log("Click")}
          >
            new post
          </button>
        </div>
      )}
      <PostsList posts={posts} />
    </section>
  );
};

export default PostsPage;

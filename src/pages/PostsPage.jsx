import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsThunk } from "../redux/posts/operationsPosts";
import { selectPosts } from "../redux/posts/selectorPosts";

const PostsPage = () => {
  const dispatch = useDispatch(getPostsThunk());
  const { posts } = useSelector(selectPosts);
  console.log("posts: ", posts);
  useEffect(() => {
    dispatch(getPostsThunk());
  }, [dispatch]);

  return <div>PostsPage</div>;
};

export default PostsPage;
